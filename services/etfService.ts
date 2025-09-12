import type { Etf, PortfolioScenario, SimulationGoal, SimulationResult } from '../types';

export const ALL_ETFS: Record<string, Etf> = {
  '069500': {
    ticker: '069500',
    name: 'KODEX 200',
    desc: 'KOSPI 200 지수를 추종하는 국내 대표 주식 ETF',
    pros: '낮은 보수, 높은 유동성',
    cons: '국내 시장에만 국한됨',
    yield: 0.018,
    growth: 0.08,
    color: 'blue',
    risk: '중립',
    category: '국내 주식'
  },
  '379800': {
    ticker: '379800',
    name: 'KODEX 미국S&P500TR',
    desc: '미국 S&P 500 지수를 추종하며 배당금이 자동 재투자되는 토탈리턴(TR) ETF',
    pros: '미국 대표 지수 투자, 배당금 자동 재투자',
    cons: '환율 변동 위험',
    yield: 0.013,
    growth: 0.12,
    color: 'green',
    risk: '중립',
    category: '해외 주식'
  },
  '453270': {
    ticker: '453270',
    name: 'TIGER 미국배당다우존스',
    desc: '미국의 고배당 우량주에 투자하는 SCHD의 한국판 ETF',
    pros: '안정적인 배당 성장',
    cons: '성장성은 다소 낮을 수 있음',
    yield: 0.035,
    growth: 0.07,
    color: 'red',
    risk: '중립',
    category: '배당주'
  },
  '302190': {
    ticker: '302190',
    name: 'KODEX 국고채3년',
    desc: '대한민국 국고채 3년물에 투자하는 안정적인 채권 ETF',
    pros: '매우 높은 안정성',
    cons: '낮은 기대 수익률',
    yield: 0.03,
    growth: 0.01,
    color: 'indigo',
    risk: '낮음',
    category: '국내 채권'
  },
  '409180': {
    ticker: '409180',
    name: 'TIGER TDF2050액티브',
    desc: '2050년을 은퇴 시점으로 설정하고 생애주기에 맞춰 자산 비중을 자동으로 조절하는 TDF',
    pros: '자동 자산배분, 장기투자에 적합',
    cons: '액티브 펀드로 상대적으로 높은 보수',
    yield: 0.015,
    growth: 0.1,
    color: 'teal',
    risk: '중립',
    category: '자산배분(TDF/TRF)'
  },
  '462330': {
    ticker: '462330',
    name: 'TIGER 24-10 국고채액티브',
    desc: '2024년 10월 만기 국고채에 투자하여 안정적인 이자 수익을 추구하는 만기매칭형 채권 ETF',
    pros: '만기가 정해져 있어 안정적, 확정금리 효과',
    cons: '만기 이전 매도 시 손실 가능성',
    yield: 0.035,
    growth: 0,
    color: 'gray',
    risk: '낮음',
    category: '단기 금융'
  },
  '371460': {
    ticker: '371460',
    name: 'TIGER 차이나전기차SOLACTIVE',
    desc: '중국 전기차 및 관련 밸류체인 기업에 투자하는 ETF',
    pros: '높은 성장 잠재력을 가진 중국 전기차 시장에 투자',
    cons: '중국 정책 리스크 및 높은 변동성',
    yield: 0.005,
    growth: 0.15,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '394660': {
    ticker: '394660',
    name: 'TIGER KRX BBIG K-뉴딜',
    desc: '배터리, 바이오, 인터넷, 게임 (BBIG) 4차 산업혁명 테마에 투자',
    pros: '국내 성장 주도 산업에 집중 투자',
    cons: '특정 테마에 편중되어 변동성이 클 수 있음',
    yield: 0.008,
    growth: 0.13,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '117460': {
    ticker: '117460',
    name: 'KODEX MSCI Korea',
    desc: 'MSCI 한국 지수를 추종하여 국내 시장 전반에 분산 투자',
    pros: '코스피200보다 넓은 범위의 종목에 투자',
    cons: 'KODEX 200과 유사한 움직임을 보임',
    yield: 0.017,
    growth: 0.08,
    color: 'blue',
    risk: '중립',
    category: '국내 주식'
  },
  '457680': {
    ticker: '457680',
    name: 'TIGER 미국S&P500배당귀족',
    desc: '25년 이상 연속으로 배당금을 증액해온 미국 S&P 500 기업들에 투자',
    pros: '검증된 배당 성장성과 안정성',
    cons: '기술주 비중이 낮아 폭발적인 성장 기대는 어려움',
    yield: 0.025,
    growth: 0.08,
    color: 'red',
    risk: '중립',
    category: '배당주'
  },
  '441680': {
    ticker: '441680',
    name: 'KODEX CD금리액티브(합성)',
    desc: 'CD 91일물 금리를 추종하는 초단기 채권형 ETF. 파킹 통장처럼 활용 가능',
    pros: '매우 높은 유동성과 안정성, 손실 가능성 거의 없음',
    cons: '낮은 기대 수익률',
    yield: 0.036,
    growth: 0.001,
    color: 'gray',
    risk: '낮음',
    category: '단기 금융'
  },
  '381180': {
    ticker: '381180',
    name: 'TIGER 미국필라델피아반도체나스닥',
    desc: '미국 필라델피아 반도체 지수를 추종하여 글로벌 반도체 기업에 투자',
    pros: '글로벌 반도체 산업 성장에 직접 투자',
    cons: '반도체 사이클에 따른 높은 변동성',
    yield: 0.006,
    growth: 0.18,
    color: 'green',
    risk: '높음',
    category: '해외 주식'
  },
  '452380': {
    ticker: '452380',
    name: 'TIGER ACWI',
    desc: '선진국과 신흥국을 모두 포함하는 MSCI ACWI 지수를 추종하여 전세계 주식 시장에 분산 투자',
    pros: '단일 ETF로 전세계 주식 시장에 투자 가능',
    cons: '미국 비중이 높고, 환율 변동 위험에 노출됨',
    yield: 0.016,
    growth: 0.11,
    color: 'green',
    risk: '중립',
    category: '해외 주식'
  },
  '452390': {
    ticker: '452390',
    name: 'ACE 미국채30년액티브(H)',
    desc: '미국 30년 장기 국채에 투자하며 환율 변동을 헤지하는 상품',
    pros: '금리 하락기 높은 자본차익 기대, 주식시장과 음의 상관관계',
    cons: '금리 상승기 큰 손실 위험, 높은 변동성',
    yield: 0.04,
    growth: 0.02,
    color: 'purple',
    risk: '높음',
    category: '해외 채권'
  },
  '459580': {
    ticker: '459580',
    name: 'KODEX 미국달러SOFR금리액티브(합성)',
    desc: '미국 무위험지표금리(SOFR)를 추종하여 달러에 투자하는 효과를 내는 ETF',
    pros: '달러 예금과 유사, 달러 강세 시 환차익 기대',
    cons: '달러 약세 시 환손실 위험',
    yield: 0.053,
    growth: 0.001,
    color: 'purple',
    risk: '낮음',
    category: '해외 채권'
  },
  '373490': {
    ticker: '373490',
    name: 'TIGER Fn반도체TOP10',
    desc: '국내 반도체 산업을 대표하는 상위 10개 기업에 집중 투자',
    pros: '국내 반도체 핵심 기업에 집중 투자',
    cons: '소수 종목 집중으로 인한 변동성',
    yield: 0.01,
    growth: 0.16,
    color: 'lime',
    risk: '높음',
    category: '섹터'
  },
  '469170': {
    ticker: '469170',
    name: 'TIGER 미국배당+7%프리미엄다우존스',
    desc: 'TIGER 미국배당다우존스(SCHD)에 투자하면서 월 7% 수준의 배당을 목표로 커버드콜 전략을 활용',
    pros: '매우 높은 월 분배금',
    cons: '주가 상승이 제한되어 자본 성장성은 낮음',
    yield: 0.07,
    growth: 0.01,
    color: 'pink',
    risk: '중립',
    category: '커버드콜'
  },
  '466940': {
    ticker: '466940',
    name: 'TIGER 미국나스닥100커버드콜(합성)',
    desc: '나스닥 100 지수를 추종하며 커버드콜 전략을 통해 높은 월 분배금을 추구',
    pros: '높은 월 분배금, 시장 횡보 시 유리',
    cons: '상승장에서의 수익률이 제한됨',
    yield: 0.12,
    growth: 0.01,
    color: 'pink',
    risk: '높음',
    category: '커버드콜'
  },
  '445290': {
    ticker: '445290',
    name: 'HANARO K방산',
    desc: 'K-방산 테마의 핵심 기업들에 투자하는 ETF',
    pros: '방산 수출 증가에 따른 성장 수혜 기대',
    cons: '지정학적 리스크 및 수주 변동성에 따라 주가 변동',
    yield: 0.007,
    growth: 0.14,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '091180': {
    ticker: '091180',
    name: 'TIGER 자동차',
    desc: '국내 자동차 산업 관련 기업에 투자',
    pros: '완성차 및 부품업체에 동시 투자',
    cons: '산업 사이클에 민감',
    yield: 0.02,
    growth: 0.09,
    color: 'lime',
    risk: '중립',
    category: '섹터'
  },
  '139220': {
    ticker: '139220',
    name: 'TIGER 헬스케어',
    desc: '국내 헬스케어, 제약, 바이오 기업에 투자',
    pros: '고령화 사회의 구조적 성장에 투자',
    cons: '임상 결과 등에 따른 개별 종목 리스크',
    yield: 0.005,
    growth: 0.11,
    color: 'lime',
    risk: '높음',
    category: '섹터'
  },
  '453650': {
    ticker: '453650',
    name: 'TIGER 미국S&P500+10%프리미엄초단기옵션',
    desc: 'S&P500 지수에 투자하며 초단기 커버드콜 전략으로 연 10% 수준의 배당을 목표',
    pros: '안정적인 지수에 투자하며 높은 배당 추구',
    cons: '주가 상승이 제한됨',
    yield: 0.10,
    growth: 0.02,
    color: 'pink',
    risk: '중립',
    category: '커버드콜'
  },
  '481190': {
    ticker: '481190',
    name: 'TIGER 미국+%프리미엄인컴혼합',
    desc: '미국 배당성장주와 커버드콜 전략을 혼합하여 안정적인 인컴 창출을 목표',
    pros: '안정성과 높은 배당을 동시에 추구',
    cons: '성장성은 다소 제한적일 수 있음',
    yield: 0.07,
    growth: 0.04,
    color: 'pink',
    risk: '중립',
    category: '커버드콜'
  },
  '453630': {
    ticker: '453630',
    name: 'TIGER 미국테크TOP10+10%프리미엄',
    desc: '미국 대표 기술주 10개에 투자하며 연 10% 수준의 배당을 목표로 하는 커버드콜 ETF',
    pros: '미국 빅테크에 투자하며 높은 월배당 추구',
    cons: '기술주 상승장에서의 수익을 온전히 누리지 못함',
    yield: 0.10,
    growth: 0.05,
    color: 'pink',
    risk: '높음',
    category: '커버드콜'
  },
  '435660': {
    ticker: '435660',
    name: 'TIGER 리츠부동산인프라',
    desc: '국내 상장된 리츠 및 인프라 펀드에 분산 투자하여 안정적인 배당 수익 추구',
    pros: '안정적인 배당, 인플레이션 헷지 효과',
    cons: '금리 인상 시기에 취약, 부동산 경기 변동 위험',
    yield: 0.06,
    growth: 0.03,
    color: 'orange',
    risk: '중립',
    category: '부동산/인프라'
  },
  '463460': {
    ticker: '463460',
    name: 'TIGER 미국S&P500유틸리티',
    desc: 'S&P 500 내의 전기, 가스 등 필수소비재 성격의 유틸리티 기업에 투자',
    pros: '안정적인 배당과 경기 방어적 성격',
    cons: '성장성이 낮고 금리 인상에 민감',
    yield: 0.032,
    growth: 0.06,
    color: 'lime',
    risk: '낮음',
    category: '섹터'
  },
  '200030': {
    ticker: '200030',
    name: 'KODEX 삼성그룹밸류',
    desc: '삼성그룹 계열사 중 밸류에이션 매력이 높은 종목에 투자',
    pros: '국내 대표 그룹의 우량주에 투자',
    cons: '삼성그룹의 업황에 따라 성과가 좌우됨',
    yield: 0.022,
    growth: 0.09,
    color: 'yellow',
    risk: '중립',
    category: '테마'
  },
  '453660': {
    ticker: '453660',
    name: 'TIGER 미국S&P500헬스케어',
    desc: 'S&P 500 내의 헬스케어 섹터 기업들에 투자',
    pros: '고령화 및 기술 발전에 따른 구조적 성장 기대',
    cons: '정부 정책 및 신약 개발 실패 리스크',
    yield: 0.012,
    growth: 0.11,
    color: 'lime',
    risk: '중립',
    category: '섹터'
  },
  '434740': {
    ticker: '434740',
    name: 'ACE 포스코그룹포커스',
    desc: '포스코 그룹 및 2차전지 소재 관련 기업에 집중 투자',
    pros: '2차전지 소재 분야 성장의 수혜 기대',
    cons: '특정 그룹 및 산업에 대한 집중 리스크',
    yield: 0.015,
    growth: 0.14,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '091160': {
    ticker: '091160',
    name: 'KODEX 증권',
    desc: '국내 증권업 대표 기업들에 투자하는 ETF',
    pros: '증시 거래대금 증가 및 금리 인상 시기에 수혜 기대',
    cons: '증시 하락 및 거래대금 감소 시 수익성 악화 위험',
    yield: 0.025,
    growth: 0.10,
    color: 'lime',
    risk: '높음',
    category: '섹터'
  },
  '138540': {
    ticker: '138540',
    name: 'TIGER 현대차그룹+펀더멘털',
    desc: '국내 자동차 산업의 핵심인 현대차 그룹 및 관련 펀더멘털 우량주에 투자',
    pros: '현대차 그룹의 성장에 집중 투자, 펀더멘털 기반 종목 선정',
    cons: '특정 그룹에 대한 집중 리스크, 자동차 산업 경기 변동에 민감',
    yield: 0.02,
    growth: 0.10,
    color: 'yellow',
    risk: '중립',
    category: '테마'
  },
  '229200': {
    ticker: '229200',
    name: 'KODEX 코스닥150',
    desc: '코스닥 시장을 대표하는 150개 종목으로 구성된 코스닥 150 지수를 추종',
    pros: '코스닥 시장의 성장 잠재력에 투자, 기술주 및 바이오주 비중 높음',
    cons: '코스피 대비 높은 변동성, 개별 종목 리스크에 노출될 수 있음',
    yield: 0.01,
    growth: 0.14,
    color: 'blue',
    risk: '높음',
    category: '국내 주식'
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