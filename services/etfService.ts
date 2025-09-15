import type { Etf, PortfolioScenario, SimulationGoal, SimulationResult } from '../types';

export const ALL_ETFS: Record<string, Etf> = {
  '117460': {
    ticker: '117460',
    name: 'KODEX 에너지화학',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '138540': {
    ticker: '138540',
    name: 'TIGER 현대차그룹+펀더멘털',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '139220': {
    ticker: '139220',
    name: 'TIGER 200 건설',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '200030': {
    ticker: '200030',
    name: 'KODEX 미국S&P500산업재(합성)',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '229200': {
    ticker: '229200',
    name: 'KODEX 코스닥150',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '302190': {
    ticker: '302190',
    name: 'TIGER 중장기국채',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '371460': {
    ticker: '371460',
    name: 'TIGER 차이나전기차SOLACTIVE',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '373490': {
    ticker: '373490',
    name: 'KODEX K-이노베이션 액티브',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '379800': {
    ticker: '379800',
    name: 'KODEX 미국S&P500',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '381180': {
    ticker: '381180',
    name: 'TIGER 미국필라델피아반도체나스닥',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '394660': {
    ticker: '394660',
    name: 'TIGER 글로벌자율주행&전기차SOLACTIVE',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '409180': {
    ticker: '409180',
    name: 'TIGER 미국나스닥100TR',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '434740': {
    ticker: '434740',
    name: 'TIGER KIS 레버리지',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '435660': {
    ticker: '435660',
    name: 'TIGER Fn코스피TR',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '441680': {
    ticker: '441680',
    name: 'TIGER 미국나스닥100커버드콜(합성)',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '445290': {
    ticker: '445290',
    name: 'KODEX 로봇액티브',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '452380': {
    ticker: '452380',
    name: 'TIGER 200 금융',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '452390': {
    ticker: '452390',
    name: 'KBSTAR 200 금융',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '453270': {
    ticker: '453270',
    name: 'KODEX 혁신기술테마액티브',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '453630': {
    ticker: '453630',
    name: 'KODEX 미국S&P500필수소비재',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '453650': {
    ticker: '453650',
    name: 'KBSTAR 미국S&P500필수소비재',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '453660': {
    ticker: '453660',
    name: 'TIGER 미국S&P500필수소비재',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '457680': {
    ticker: '457680',
    name: 'KODEX 테슬라인컴프리미엄채권혼합액티브',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '459580': {
    ticker: '459580',
    name: 'KBSTAR 미국S&P500커버드콜(합성)',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '462330': {
    ticker: '462330',
    name: 'TIGER 일본니케이225(합성)',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '463460': {
    ticker: '463460',
    name: 'KODEX 일본니케이225(합성)',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '466940': {
    ticker: '466940',
    name: 'SOL 미국S&P500',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '469170': {
    ticker: '469170',
    name: 'SOL 미국AI테크TOP10',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '481190': {
    ticker: '481190',
    name: 'ARIRANG 미국S&P500',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '069500': {
    ticker: '069500',
    name: 'KODEX 200',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '091180': {
    ticker: '091180',
    name: 'KODEX 자동차',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  },
  '091160': {
    ticker: '091160',
    name: 'KODEX 반도체',
    desc: 'AI를 통해 상세 정보를 업데이트해주세요.',
    pros: '정보 필요',
    cons: '정보 필요',
    yield: 0.01,
    growth: 0.05,
    color: 'gray',
    risk: '중립',
    category: '미분류'
  }
};


// Define which ETF categories are considered risk assets
export const riskAssetCategories = [
    '국내 주식',
    '해외 주식',
    '배당주',
    '커버드콜',
    '섹터',
    '테마',
    '부동산/인프라',
    '기타 고배당'
];


type SimulationCoreResult = Omit<SimulationResult, 'scenario' | 'inflationAdjustedTargetAssets' | 'inflationAdjustedMonthlyDividend'>;

export function runSimulation(
    scenario: PortfolioScenario,
    etfData: Record<string, Etf>,
    goal: SimulationGoal,
    initialPrincipal: number,
    investmentPeriod: number, // in years
    inflationRate: number
): SimulationCoreResult {
    const periodMonths = investmentPeriod * 12;

    // Calculate portfolio's weighted average yield and growth
    let weightedYield = 0;
    let weightedGrowth = 0;

    for (const ticker in scenario.weights) {
        if (etfData[ticker]) {
            const weight = scenario.weights[ticker];
            weightedYield += etfData[ticker].yield * weight;
            weightedGrowth += etfData[ticker].growth * weight;
        }
    }
    
    // Annual rates to monthly rates
    const monthlyGrowthRate = Math.pow(1 + weightedGrowth, 1/12) - 1;
    const monthlyYieldRate = weightedYield / 12;
    const monthlyTotalReturnRate = monthlyGrowthRate + monthlyYieldRate;
    
    let monthlyInvestment = 0;
    const finalTarget = goal.value;

    if (goal.type === 'asset' || goal.type === 'dividend') {
        let targetFinalAssets = 0;

        if (goal.type === 'asset') {
            targetFinalAssets = finalTarget;
        } else { // dividend
            if (monthlyYieldRate <= 1e-9) {
                 // Cannot achieve dividend goal if there is no yield.
                 // Assume a 1% yield to get a target asset number, this is a fallback.
                 targetFinalAssets = finalTarget / (0.01 / 12);
            } else {
                 targetFinalAssets = finalTarget / monthlyYieldRate;
            }
        }
        
        const futureValueOfPrincipal = initialPrincipal * Math.pow(1 + monthlyTotalReturnRate, periodMonths);
        
        let fvFactor;
        if (Math.abs(monthlyTotalReturnRate) < 1e-9) { // Rate is effectively zero
            fvFactor = periodMonths;
        } else {
            fvFactor = (Math.pow(1 + monthlyTotalReturnRate, periodMonths) - 1) / monthlyTotalReturnRate;
        }
        
        if (fvFactor > 0) {
            monthlyInvestment = (targetFinalAssets - futureValueOfPrincipal) / fvFactor;
        } else {
            monthlyInvestment = 0;
        }
        
        if (monthlyInvestment < 0) monthlyInvestment = 0;

    } else { // 'investment'
        monthlyInvestment = finalTarget;
    }
    
    const assetGrowth: number[] = [initialPrincipal];
    const dividendGrowth: number[] = [initialPrincipal * monthlyYieldRate];
    let currentAssets = initialPrincipal;

    for (let month = 1; month <= periodMonths; month++) {
        currentAssets += monthlyInvestment;
        const growthAmount = currentAssets * monthlyGrowthRate;
        const dividendAmount = currentAssets * monthlyYieldRate;
        currentAssets += growthAmount + dividendAmount;
        
        assetGrowth.push(currentAssets);
        dividendGrowth.push(currentAssets * monthlyYieldRate);
    }
    
    const targetAssets = assetGrowth[assetGrowth.length - 1];
    
    return {
        targetAssets,
        monthlyInvestment,
        postTaxYield: weightedYield * (1 - 0.154), // Assuming 15.4% tax
        assetGrowth,
        dividendGrowth,
        periodYears: investmentPeriod
    };
}