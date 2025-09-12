import { GoogleGenAI, Type } from "@google/genai";
import type { Etf, PortfolioScenario, RiskProfile, InvestmentTheme } from '../types';
import { riskAssetCategories } from './etfService';

// Fix: Use the recommended model name 'gemini-2.5-flash'
const MODEL_NAME = 'gemini-2.5-flash';

function etfsToString(etfs: Etf[]): string {
    return etfs.map(etf => 
        ` - Ticker: ${etf.ticker}, Name: ${etf.name}, Category: ${etf.category}, Risk: ${etf.risk}, Yield: ${(etf.yield * 100).toFixed(1)}%, Growth: ${(etf.growth * 100).toFixed(1)}%`
    ).join('\n');
}

export async function generateAiPortfolio(
    apiKey: string,
    riskProfile: RiskProfile,
    investmentTheme: InvestmentTheme,
    etfs: Etf[]
): Promise<PortfolioScenario | null> {
    if (!apiKey) {
        throw new Error("API Key is not provided.");
    }
    // Fix: Initialize GoogleGenAI with a named apiKey parameter
    const ai = new GoogleGenAI({ apiKey });

    const riskAssets = etfs.filter(etf => riskAssetCategories.includes(etf.category));
    const safeAssets = etfs.filter(etf => !riskAssetCategories.includes(etf.category));

    const prompt = `You are a professional financial advisor for a Korean retirement pension plan (DC type). Create a single, optimized ETF portfolio based on the user's preferences and the provided ETF list.

### User Preferences
- **Risk Profile**: ${riskProfile}
- **Investment Theme**: ${investmentTheme}

### Portfolio Construction Rules
1.  **ETF Selection**: Select between 3 to 8 ETFs from the provided lists.
2.  **Weighting**: The sum of weights for all selected ETFs must be exactly 1.0. Assign weights as decimals (e.g., 0.2 for 20%). Avoid weights smaller than 0.05 (5%).
3.  **Risk Profile Adherence**:
    -   **conservative**: Total weight of risk assets must be 30% or less.
    -   **balanced**: Total weight of risk assets should be between 40% and 60%.
    -   **aggressive**: Total weight of risk assets should be between 60% and 70%.
4.  **Investment Theme Adherence**:
    -   **ai-recommended**: Create a well-diversified portfolio that best matches the risk profile.
    -   **stable-income**: Focus on high-yield, low-risk ETFs. Prioritize '배당주', '커버드콜', '부동산/인프라', '국내 채권', '해외 채권', '단기 금융' categories.
    -   **balanced-growth**: A mix of growth-oriented ETFs ('해외 주식', '테마', '섹터') and stable, income-generating ETFs.
    -   **max-growth-70**: Prioritize high-growth potential ETFs ('해외 주식', '테마', '섹터') while respecting the risk asset limit (70%).
    -   **tdf-focused**: A TDF ETF ('자산배분(TDF/TRF)' category) must be a core component with a significant weight (at least 30%). Build the rest of the portfolio around it according to the risk profile.
5.  **Output**: Provide a creative name and a concise one-sentence description for the portfolio. Determine the portfolio's overall risk level. The output must be in JSON format.

### Available ETFs

**Risk Assets (Categories: ${riskAssetCategories.join(', ')})**
${etfsToString(riskAssets)}

**Safe Assets (Other Categories)**
${etfsToString(safeAssets)}
`;

    const portfolioSchema = {
        type: Type.OBJECT,
        properties: {
            name: { type: Type.STRING, description: '포트폴리오의 창의적인 한글 이름 (예: 안정적인 현금흐름 파이프라인)' },
            desc: { type: Type.STRING, description: '포트폴리오에 대한 1-2 문장의 간결한 설명' },
            risk: { type: Type.STRING, enum: ['낮음', '중립', '높음'], description: '포트폴리오의 전반적인 위험 수준' },
            portfolio: {
                type: Type.ARRAY,
                description: '선택된 ETF와 그 비중 배열. 비중의 합은 1.0이어야 합니다.',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        ticker: { type: Type.STRING, description: 'ETF 티커' },
                        weight: { type: Type.NUMBER, description: 'ETF 비중 (0에서 1 사이의 소수)' }
                    },
                    required: ['ticker', 'weight']
                }
            }
        },
        required: ['name', 'desc', 'risk', 'portfolio']
    };

    try {
        // Fix: Call generateContent with model, contents, and config object.
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: portfolioSchema,
                temperature: 0.3,
            }
        });

        // Fix: Extract text from response using the .text property
        const jsonString = response.text;
        const result = JSON.parse(jsonString);

        if (!result.portfolio || result.portfolio.length === 0) {
            throw new Error("AI did not return a valid portfolio structure.");
        }

        const weights: { [ticker: string]: number } = {};
        let totalWeight = 0;
        for (const item of result.portfolio) {
            if (typeof item.ticker === 'string' && typeof item.weight === 'number') {
                weights[item.ticker] = item.weight;
                totalWeight += item.weight;
            }
        }
        
        if (totalWeight > 0 && Math.abs(totalWeight - 1.0) > 0.01) {
            console.warn(`AI weights summed to ${totalWeight}, normalizing.`);
            for (const ticker in weights) {
                weights[ticker] /= totalWeight;
            }
        }

        const scenario: PortfolioScenario = {
            id: `ai-${riskProfile}-${investmentTheme}-${Date.now()}`,
            name: result.name,
            desc: result.desc,
            risk: result.risk,
            weights: weights
        };
        return scenario;

    } catch (error) {
        console.error("Error generating AI portfolio:", error);
        if (error instanceof Error && error.message.includes('response was blocked')) {
            throw new Error("AI 응답이 안전 설정에 의해 차단되었습니다. 다른 옵션을 시도해보세요.");
        }
        throw new Error("AI 포트폴리오 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
}

export async function generateEtfInfo(
    apiKey: string,
    ticker: string,
    name: string
): Promise<Partial<Etf> | null> {
     if (!apiKey) {
        throw new Error("API Key is not provided.");
    }
    // Fix: Initialize GoogleGenAI with a named apiKey parameter
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are a financial data analyst. Your task is to provide key information for a specific Korean ETF based on its ticker and name. Use your internal knowledge. Do not browse the web.

**ETF to Analyze:**
- **Ticker**: ${ticker}
- **Name**: ${name}

**Required Information:**
1.  **desc**: A concise, one-sentence description of the ETF in Korean.
2.  **pros**: The main advantages or strengths of this ETF, in Korean.
3.  **cons**: The main disadvantages, risks, or points to consider for this ETF, in Korean.
4.  **yield**: The estimated annual dividend yield as a decimal (e.g., 0.035 for 3.5%).
5.  **growth**: The estimated annual price growth rate as a decimal (e.g., 0.08 for 8%). This should represent long-term capital appreciation potential, separate from yield.
6.  **risk**: The overall risk level, categorized as one of: '낮음', '중립', '높음'.
7.  **category**: The most appropriate investment category for this ETF from the given list.

Please provide the output in JSON format according to the schema.`;

    const etfInfoSchema = {
        type: Type.OBJECT,
        properties: {
            desc: { type: Type.STRING, description: "ETF에 대한 한 줄 설명 (한국어)" },
            pros: { type: Type.STRING, description: "ETF의 주요 장점 (한국어)" },
            cons: { type: Type.STRING, description: "ETF의 주요 단점 또는 유의사항 (한국어)" },
            yield: { type: Type.NUMBER, description: "예상 연간 배당률 (소수점 형태, 예: 3.5% -> 0.035)" },
            growth: { type: Type.NUMBER, description: "예상 연간 성장률 (소수점 형태, 예: 8% -> 0.08)" },
            risk: { type: Type.STRING, enum: ['낮음', '중립', '높음'], description: "종합 위험도" },
            category: { type: Type.STRING, description: "ETF 카테고리" },
        },
        required: ['desc', 'pros', 'cons', 'yield', 'growth', 'risk', 'category']
    };

    try {
        // Fix: Call generateContent with model, contents, and config object.
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: etfInfoSchema,
            }
        });
        
        // Fix: Extract text from response using the .text property
        const jsonString = response.text;
        const result = JSON.parse(jsonString);

        return result as Partial<Etf>;

    } catch (error) {
        console.error("Error generating ETF info:", error);
        if (error instanceof Error && error.message.includes('response was blocked')) {
             throw new Error("AI 응답이 안전 설정에 의해 차단되었습니다.");
        }
        throw new Error("AI ETF 정보 생성에 실패했습니다.");
    }
}
