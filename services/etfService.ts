import type { Etf, PortfolioScenario, SimulationGoal, SimulationResult } from '../types';

export const ALL_ETFS: Record<string, Etf> = {
  '069500': {
    ticker: '069500',
    name: 'KODEX 200',
    desc: '한국 주식 시장을 대표하는 200개 우량 기업으로 구성된 KOSPI 200 지수를 추종하는 ETF입니다.',
    pros: '한국 시장 전체에 대한 분산 투자, 높은 유동성, 낮은 보수.',
    cons: '국내 시장의 성장성 한계, 특정 대기업(삼성전자 등) 비중이 높음.',
    yield: 0.02,
    growth: 0.06,
    color: 'blue',
    risk: '중립',
    category: '국내 주식'
  },
  '091160': {
    ticker: '091160',
    name: 'KODEX 반도체',
    desc: '국내 반도체 산업의 핵심 기업들에 투자하여 한국의 주력 산업 성과를 추종하는 ETF입니다.',
    pros: '한국의 핵심 성장 동력인 반도체 산업에 집중 투자.',
    cons: '글로벌 반도체 경기 사이클에 따른 높은 변동성, 특정 대기업 편중.',
    yield: 0.01,
    growth: 0.12,
    color: 'lime',
    risk: '높음',
    category: '섹터'
  },
  '091180': {
    ticker: '091180',
    name: 'KODEX 자동차',
    desc: '국내 자동차 및 관련 부품 산업의 대표 기업들에 투자하는 섹터 ETF입니다.',
    pros: '국내 대표 자동차 산업의 성장에 투자, 완성차 및 부품주 분산.',
    cons: '글로벌 자동차 경기 및 경쟁 심화에 민감, 노사 관계 리스크.',
    yield: 0.025,
    growth: 0.07,
    color: 'lime',
    risk: '중립',
    category: '섹터'
  },
  '102970': {
    ticker: '102970',
    name: 'KODEX 증권',
    desc: '국내 증권업종 대표 기업들에 투자하여 금융 시장의 성장과 함께 수익을 추구하는 섹터 ETF입니다.',
    pros: '금리 상승기 및 증시 활황기에 수혜를 기대할 수 있으며, 국내 주요 증권사에 분산 투자합니다.',
    cons: '증시 변동성에 매우 민감하며, 시장 침체 시 큰 폭의 하락 가능성이 있습니다.',
    yield: 0.035,
    growth: 0.05,
    color: 'lime',
    risk: '높음',
    category: '섹터'
  },
  '117460': {
    ticker: '117460',
    name: 'KODEX 에너지화학',
    desc: '국내 에너지 및 화학 관련 대기업에 투자하여 해당 산업의 성장을 추종하는 ETF입니다.',
    pros: '에너지 및 화학 산업의 성장에 투자, 국내 대표 기업 포함.',
    cons: '특정 산업에 집중되어 있어 산업 경기 변동에 민감, 유가 변동성에 영향.',
    yield: 0.025,
    growth: 0.04,
    color: 'lime',
    risk: '중립',
    category: '섹터'
  },
  '138540': {
    ticker: '138540',
    name: 'TIGER 현대차그룹+펀더멘털',
    desc: '현대차그룹 계열사 및 관련 기업에 집중 투자하여 자동차 산업의 성과를 추종하는 ETF입니다.',
    pros: '국내 대표 자동차 그룹 성장에 투자, 펀더멘털 기반 종목 선정.',
    cons: '특정 그룹 및 산업에 대한 집중도가 높아 그룹 리스크 존재.',
    yield: 0.03,
    growth: 0.06,
    color: 'blue',
    risk: '중립',
    category: '국내 주식'
  },
  '139220': {
    ticker: '139220',
    name: 'TIGER 200 건설',
    desc: '코스피 200 내 건설업종 대표 기업들에 투자하는 섹터 ETF입니다.',
    pros: '건설 경기 회복 및 정부 정책에 따른 수혜 기대.',
    cons: '부동산 경기 및 금리 변동에 매우 민감하여 변동성이 높음.',
    yield: 0.02,
    growth: 0.03,
    color: 'lime',
    risk: '높음',
    category: '섹터'
  },
  '195980': {
    ticker: '195980',
    name: 'TIGER 신흥국MSCI',
    desc: 'MSCI 신흥국 지수를 추종하여 중국, 대만, 인도 등 신흥 경제국의 기업들에 분산 투자하는 ETF입니다.',
    pros: '신흥국의 높은 성장 잠재력에 투자하며, 선진국 시장과의 분산 효과를 기대할 수 있습니다.',
    cons: '선진국 대비 변동성이 높고, 특정 국가(중국 등)의 정치 및 규제 리스크에 크게 노출됩니다.',
    yield: 0.02,
    growth: 0.08,
    color: 'green',
    risk: '높음',
    category: '해외 주식'
  },
  '200030': {
    ticker: '200030',
    name: 'KODEX 미국S&P500산업재(합성)',
    desc: '미국 S&P500 지수 내 산업재 섹터 기업들에 투자하는 ETF입니다.',
    pros: '미국 경제 성장의 핵심인 산업재 분야에 투자, 인프라 투자 확대 수혜.',
    cons: '경기 순환에 민감하며, 환율 변동 위험에 노출됨.',
    yield: 0.015,
    growth: 0.08,
    color: 'green',
    risk: '중립',
    category: '해외 주식'
  },
  '211560': {
    ticker: '211560',
    name: 'TIGER 배당성장',
    desc: '꾸준히 배당을 늘려온 국내 기업들에 투자하여 안정적인 배당 수익과 장기적인 주가 성장을 동시에 추구하는 ETF입니다.',
    pros: '배당금과 시세차익을 동시에 추구할 수 있으며, 재무적으로 우량한 기업에 주로 투자합니다.',
    cons: '강세장에서는 순수 성장주 대비 수익률이 낮을 수 있으며, 시장 하락 위험에 노출됩니다.',
    yield: 0.038,
    growth: 0.05,
    color: 'red',
    risk: '중립',
    category: '배당주'
  },
  '211900': {
    ticker: '211900',
    name: 'KODEX 코리아배당성장',
    desc: '국내의 배당성장 잠재력이 높은 기업들에 투자하여, 안정적인 인컴 수익과 자본 이득을 동시에 추구하는 ETF입니다.',
    pros: '배당금 재투자를 통해 복리 효과를 극대화할 수 있으며, 장기적으로 안정적인 성과를 기대할 수 있습니다.',
    cons: '고배당주 ETF에 비해 현재 배당수익률은 낮을 수 있으며, 시장 성장기에는 기술주 중심 ETF보다 성과가 저조할 수 있습니다.',
    yield: 0.035,
    growth: 0.06,
    color: 'red',
    risk: '중립',
    category: '배당주'
  },
  '213610': {
    ticker: '213610',
    name: 'KODEX 삼성그룹밸류',
    desc: '삼성그룹 계열사 중 밸류에이션 매력이 높은 기업에 투자하여 장기적인 자본 이득을 추구하는 ETF입니다.',
    pros: '국내 최대 그룹인 삼성의 우량 계열사에 투자, 가치주 투자 전략.',
    cons: '특정 그룹에 대한 집중도가 높아 그룹 리스크 및 총수 리스크 존재.',
    yield: 0.022,
    growth: 0.06,
    color: 'blue',
    risk: '중립',
    category: '국내 주식'
  },
  '229200': {
    ticker: '229200',
    name: 'KODEX 코스닥150',
    desc: '코스닥 시장의 대표적인 150개 기업으로 구성된 코스닥150 지수를 추종하는 ETF입니다.',
    pros: '한국의 혁신 성장 기업에 분산 투자, 높은 성장 잠재력.',
    cons: '코스피 대비 변동성이 매우 높으며, 기술주 중심의 시장 리스크.',
    yield: 0.01,
    growth: 0.07,
    color: 'blue',
    risk: '높음',
    category: '국내 주식'
  },
  '251350': {
    ticker: '251350',
    name: 'KODEX 유럽선진국',
    desc: 'MSCI 유럽 지수를 추종하여 유럽 선진국 시장의 대표 기업들에 분산 투자하는 ETF입니다.',
    pros: '유럽 선진국 경제 전반에 분산 투자할 수 있으며, 글로벌 우량 기업들을 다수 포함합니다.',
    cons: '유로화 환율 변동 위험에 노출되며, 유럽의 정치 및 경제적 리스크의 영향을 받습니다.',
    yield: 0.025,
    growth: 0.06,
    color: 'green',
    risk: '중립',
    category: '해외 주식'
  },
  '273130': {
    ticker: '273130',
    name: 'KODEX 종합채권(AA-이상)액티브',
    desc: '신용등급 AA- 이상의 우량 국채, 공사채, 회사채 등에 액티브하게 투자하여 안정적인 이자 수익을 추구하는 대표적인 채권 ETF입니다.',
    pros: '높은 신용등급으로 안정성이 높으며, 주식 포트폴리오의 위험을 분산시키는 효과가 있습니다.',
    cons: '금리 상승 시 채권 가격이 하락할 위험이 있으며, 주식 대비 기대수익률이 낮습니다.',
    yield: 0.04,
    growth: 0.01,
    color: 'indigo',
    risk: '낮음',
    category: '국내 채권'
  },
  '273140': {
    ticker: '273140',
    name: 'KODEX 단기채권액티브',
    desc: '만기가 짧은 우량 채권에 액티브하게 투자하여 금리 변동 위험을 최소화하고 안정적인 이자 수익을 추구하는 현금성 자산 ETF입니다.',
    pros: '매우 높은 안정성을 가지며 금리 변동에 둔감하고, 일반 예금보다 높은 이자수익을 기대할 수 있습니다.',
    cons: '기대 수익률이 매우 낮아 인플레이션 위험을 방어하기에는 부족할 수 있습니다.',
    yield: 0.035,
    growth: 0.001,
    color: 'gray',
    risk: '낮음',
    category: '단기 금융'
  },
  '302190': {
    ticker: '302190',
    name: 'TIGER 중장기국채',
    desc: '대한민국 정부가 발행하는 중장기 국채에 투자하여 안정적인 이자 수익을 추구하는 ETF입니다.',
    pros: '매우 높은 안정성(신용등급 AAA), 금리 하락 시 자본차익 기대.',
    cons: '금리 상승 시 원금 손실 위험, 낮은 기대수익률.',
    yield: 0.035,
    growth: 0.01,
    color: 'indigo',
    risk: '낮음',
    category: '국내 채권'
  },
  '305720': {
    ticker: '305720',
    name: 'KODEX 2차전지산업',
    desc: '국내 2차전지(배터리) 산업의 핵심 기업(소재, 셀, 장비)에 투자하여 전기차 및 ESS 시장의 성장을 추종하는 ETF입니다.',
    pros: '글로벌 전기차 시장 성장의 핵심 수혜주에 집중 투자하여 높은 성장 잠재력을 가집니다.',
    cons: '특정 산업 집중으로 인한 높은 변동성이 있으며, 공급망 및 원자재 가격 변동 리스크에 노출됩니다.',
    yield: 0.005,
    growth: 0.1,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '329200': {
    ticker: '329200',
    name: 'TIGER 리츠부동산인프라',
    desc: '국내외 리츠(REITs) 및 인프라 관련 기업에 투자하여 부동산 시장에 간접 투자하고 안정적인 배당 수익을 추구하는 ETF입니다.',
    pros: '안정적인 배당금 수익을 기대할 수 있으며, 인플레이션 헷지 효과 및 자산배분 효과가 있습니다.',
    cons: '금리 인상에 민감하게 반응하며, 부동산 경기 침체 시 가치가 하락할 위험이 있습니다.',
    yield: 0.05,
    growth: 0.03,
    color: 'orange',
    risk: '중립',
    category: '부동산/인프라'
  },
  '329750': {
    ticker: '329750',
    name: 'TIGER 미국 달러채권액티브',
    desc: '미국 달러 표시 투자등급 회사채에 액티브하게 투자하여 안정적인 이자수익과 환차익을 동시에 추구하는 ETF입니다.',
    pros: '대표적인 안전자산인 달러 자산에 투자, 원화 약세(환율 상승) 시 환차익 기대.',
    cons: '미국 금리 인상 시 채권 가격 하락 위험, 원화 강세 시 환손실 발생 가능성.',
    yield: 0.045,
    growth: 0.01,
    color: 'purple',
    risk: '낮음',
    category: '해외 채권'
  },
  '364970': {
    ticker: '364970',
    name: 'TIGER 바이오 top 10',
    desc: '국내 바이오 산업을 대표하는 상위 10개 기업에 집중 투자하는 ETF입니다.',
    pros: '고령화 및 신약 개발 기대감으로 장기 성장성이 유망한 바이오 섹터의 핵심 기업에 투자.',
    cons: '개별 기업의 임상 실패 리스크가 크며, 이벤트에 따른 주가 급등락으로 변동성이 매우 높음.',
    yield: 0.001,
    growth: 0.09,
    color: 'lime',
    risk: '높음',
    category: '섹터'
  },
  '371460': {
    ticker: '371460',
    name: 'TIGER 차이나전기차SOLACTIVE',
    desc: '중국 전기차 및 관련 산업의 핵심 기업들에 투자하여 높은 성장을 추구하는 ETF입니다.',
    pros: '세계 최대 전기차 시장인 중국의 성장성에 직접 투자.',
    cons: '높은 정책 리스크 및 변동성, 미중 갈등 및 규제 리스크에 노출.',
    yield: 0.005,
    growth: 0.09,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '373490': {
    ticker: '373490',
    name: 'KODEX 코리아혁신성장액티브',
    desc: '한국의 혁신 성장 기업들을 액티브 방식으로 선정하여 투자하는 ETF입니다.',
    pros: '전문가의 종목 선정으로 시장 초과 수익 추구, 미래 유망 산업 투자.',
    cons: '액티브 운용에 따른 높은 보수, 시장 지수 추종에 실패할 위험.',
    yield: 0.01,
    growth: 0.08,
    color: 'blue',
    risk: '높음',
    category: '국내 주식'
  },
  '379800': {
    ticker: '379800',
    name: 'KODEX 미국S&P500',
    desc: '미국 S&P 500 지수를 추종하여 미국 대표 500개 기업에 분산 투자하는 ETF입니다.',
    pros: '미국 시장 대표 지수 추종, 높은 분산 효과, 낮은 보수.',
    cons: '환율 변동 위험 노출, 시장 전체의 하락 위험.',
    yield: 0.014,
    growth: 0.09,
    color: 'green',
    risk: '중립',
    category: '해외 주식'
  },
  '381180': {
    ticker: '381180',
    name: 'TIGER 미국필라델피아반도체나스닥',
    desc: '미국 필라델피아 반도체 지수를 추종하여 글로벌 반도체 산업 핵심 기업들에 투자하는 ETF입니다.',
    pros: '4차 산업혁명 핵심인 반도체 산업 성장성에 투자, 높은 성장 잠재력.',
    cons: '특정 산업 집중으로 높은 변동성, 기술주 경기 사이클에 민감.',
    yield: 0.005,
    growth: 0.15,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '394660': {
    ticker: '394660',
    name: 'TIGER 글로벌자율주행&전기차SOLACTIVE',
    desc: '글로벌 자율주행 및 전기차 관련 기업에 투자하여 미래 모빌리티 산업 성장에 투자합니다.',
    pros: '미래 성장성이 높은 산업에 투자, 글로벌 기업 분산 효과.',
    cons: '높은 기술적 불확실성 및 경쟁 심화, 고밸류에이션 부담.',
    yield: 0.003,
    growth: 0.12,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '433970': {
    ticker: '433970',
    name: 'KODEX TDF2030액티브',
    desc: '2030년 은퇴 예정자를 위한 TDF로, 은퇴 시점이 가까워짐에 따라 점진적으로 채권 등 안전자산 비중을 늘려 안정성을 높이는 액티브 ETF입니다.',
    pros: '은퇴 시점 임박에 맞춰 안정적인 자산 운용, 자동 리밸런싱으로 투자 편의성 제공.',
    cons: '기대 수익률이 장기 TDF 상품보다 낮을 수 있으며, 이미 상당 부분 채권 비중이 높아 성장 잠재력이 제한적임.',
    yield: 0.025,
    growth: 0.055,
    color: 'teal',
    risk: '낮음',
    category: '자산배분(TDF/TRF)'
  },
  '433980': {
    ticker: '433980',
    name: 'KODEX TDF2040액티브',
    desc: '2040년 은퇴를 목표로 하는 투자자를 위해 주식과 채권 비중을 생애주기에 맞춰 자동으로 조절하는 액티브 TDF ETF입니다.',
    pros: '투자자의 개입 없이 자동으로 자산배분 전략 실행, 전문가의 시장 판단을 통한 초과 수익 기대.',
    cons: '액티브 운용에 따른 보수 부담, 시장 예측 실패 시 지수추종 상품 대비 저조한 성과를 낼 수 있음.',
    yield: 0.018,
    growth: 0.075,
    color: 'teal',
    risk: '중립',
    category: '자산배분(TDF/TRF)'
  },
  '434060': {
    ticker: '434060',
    name: 'KODEX TDF2050액티브',
    desc: '2050년을 은퇴 목표 시점으로 설정하고, 생애주기에 따라 위험자산과 안전자산의 비중을 자동으로 조절하는 액티브 ETF입니다.',
    pros: '장기적인 자산 증식을 목표로 하며, 별도의 리밸런싱 없이 편리하게 은퇴자금 마련 가능.',
    cons: '장기 투자 상품으로 단기 변동성이 클 수 있으며, 액티브 운용 보수가 패시브 상품보다 높음.',
    yield: 0.012,
    growth: 0.085,
    color: 'teal',
    risk: '높음',
    category: '자산배분(TDF/TRF)'
  },
  '434730': {
    ticker: '434730',
    name: 'HANARO 원자력iSelect',
    desc: '국내 원자력 발전 및 관련 산업(SMR 등) 기업에 투자하여 원자력 에너지 시장의 성장에 투자하는 ETF입니다.',
    pros: '친환경 에너지 정책 및 에너지 안보 부각에 따른 수혜 기대, SMR 등 차세대 기술 성장성.',
    cons: '원전 정책 및 규제 리스크, 안전사고에 대한 우려 등 정치적, 사회적 변수에 민감.',
    yield: 0.015,
    growth: 0.08,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '438840': {
    ticker: '438840',
    name: 'TIGER TDF2045액티브',
    desc: '2045년을 은퇴 목표 시점으로 하여, 생애주기에 맞춰 주식과 채권 비중을 자동으로 조절하는 액티브 TDF ETF입니다.',
    pros: '은퇴 시점까지 자동으로 자산배분, 전문가의 액티브 운용으로 초과 수익 추구, 장기 투자에 적합.',
    cons: '액티브 운용으로 인한 상대적으로 높은 보수, 시장 상황에 따라 목표 수익률을 달성하지 못할 수 있음.',
    yield: 0.015,
    growth: 0.08,
    color: 'teal',
    risk: '중립',
    category: '자산배분(TDF/TRF)'
  },
  '445290': {
    ticker: '445290',
    name: 'KODEX 로봇액티브',
    desc: '글로벌 로봇 및 자동화 관련 기업에 액티브 방식으로 투자하여 장기 성장을 추구합니다.',
    pros: '미래 유망 산업인 로봇 시장 성장에 투자, 전문가의 종목 선정.',
    cons: '높은 변동성 및 기술 개발 불확실성, 액티브 운용에 따른 추가 비용.',
    yield: 0.005,
    growth: 0.1,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '446720': {
    ticker: '446720',
    name: 'SOL 미국배당다우존스',
    desc: '미국 다우존스 U.S. Dividend 100 지수를 추종하여, 꾸준히 배당을 지급해 온 우량 기업 100곳에 투자하는 월배당 ETF입니다.',
    pros: '안정적인 월배당금, 미국 우량주 투자, 장기적 우상향 기대.',
    cons: '단기 주가 성장성은 기술주 대비 낮을 수 있음, 환율 변동 위험.',
    yield: 0.035,
    growth: 0.07,
    color: 'red',
    risk: '중립',
    category: '배당주'
  },
  '453630': {
    ticker: '453630',
    name: 'KODEX 미국S&P500필수소비재',
    desc: '미국 S&P500 내 식품, 음료, 가정용품 등 필수소비재 섹터 기업에 투자합니다.',
    pros: '경기 방어적 성격으로 시장 변동성이 클 때 안정적, 꾸준한 배당.',
    cons: '경기 호황기에는 성장주 대비 낮은 수익률, 낮은 성장성.',
    yield: 0.025,
    growth: 0.06,
    color: 'green',
    risk: '낮음',
    category: '해외 주식'
  },
  '453640': {
    ticker: '453640',
    name: 'KODEX 미국S&P500헬스케어',
    desc: '미국 S&P500 지수 내 헬스케어 섹터 기업들에 투자하여 안정적인 성장을 추구하는 ETF입니다.',
    pros: '인구 고령화에 따른 구조적 성장성을 가지며, 경기 방어적 성격으로 안정성이 높습니다.',
    cons: '정부의 약가 규제 등 정책 리스크가 있으며, 환율 변동 위험에 노출됩니다.',
    yield: 0.013,
    growth: 0.09,
    color: 'green',
    risk: '중립',
    category: '해외 주식'
  },
  '453650': {
    ticker: '453650',
    name: 'KODEX 미국S&P500금융',
    desc: '미국 S&P500 지수 내 은행, 증권, 보험 등 금융 섹터 기업들에 투자합니다.',
    pros: '금리 상승기에 수혜를 기대할 수 있으며, 미국 경제의 바로미터 역할.',
    cons: '경기 침체 및 금융 위기 시 큰 폭의 하락 가능성, 정부 규제 리스크.',
    yield: 0.02,
    growth: 0.07,
    color: 'green',
    risk: '중립',
    category: '해외 주식'
  },
  '453660': {
    ticker: '453660',
    name: 'KODEX 미국S&P500경기소비재',
    desc: '미국 S&P500 지수 내 자동차, 유통, 미디어 등 경기소비재 섹터 기업들에 투자합니다.',
    pros: '경기 확장 국면에서 높은 수익률 기대, 미국 소비 시장 성장에 직접 투자.',
    cons: '경기 침체 및 소비 심리 위축에 매우 민감하여 변동성이 높음.',
    yield: 0.008,
    growth: 0.1,
    color: 'green',
    risk: '높음',
    category: '해외 주식'
  },
  '459580': {
    ticker: '459580',
    name: 'KODEX CD금리액티브(합성)',
    desc: 'CD(양도성예금증서) 91일물 금리를 추종하여, 파킹 통장처럼 활용할 수 있는 초단기 금융상품 ETF입니다.',
    pros: '손실 위험이 거의 없는 높은 안정성, 일 복리 효과, 거래 비용이 없음.',
    cons: '기대 수익률이 매우 낮아 인플레이션 헷지 기능이 약함.',
    yield: 0.034,
    growth: 0.001,
    color: 'gray',
    risk: '낮음',
    category: '단기 금융'
  },
  '461900': {
    ticker: '461900',
    name: 'PLUS 미국테크TOP10',
    desc: '미국 나스닥 시장을 주도하는 최상위 10개 기술주에 집중 투자하여 높은 성장을 추구하는 ETF입니다.',
    pros: '미국 대표 빅테크 기업의 성장성에 집중 투자하여 높은 시장 지배력을 활용합니다.',
    cons: '소수 종목 집중으로 인한 매우 높은 변동성을 가지며, 특정 기업의 리스크에 크게 노출됩니다.',
    yield: 0.003,
    growth: 0.16,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '462330': {
    ticker: '462330',
    name: 'KODEX 2차전지산업레버리지',
    desc: '국내 2차전지 산업 지수의 일일 수익률을 2배로 추종하는 레버리지 ETF입니다.',
    pros: '2차전지 산업 상승 시 높은 수익을 기대할 수 있음.',
    cons: '변동성이 매우 높고, 하락 및 횡보장에서 복리 효과로 인한 손실이 커질 수 있는 초고위험 상품.',
    yield: 0.001,
    growth: 0.18,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '463250': {
    ticker: '463250',
    name: 'TIGER K방산&우주',
    desc: '국내 방위산업 및 항공우주 관련 기업에 투자하여 지정학적 리스크 부각 및 우주항공 시대 개화에 따른 성장을 추종합니다.',
    pros: 'K-방산 수출 증가에 따른 구조적 성장, 정부 정책 지원 기대감.',
    cons: '지정학적 리스크 및 국가 간 관계에 따른 변동성, 수주 기반 산업의 특성.',
    yield: 0.01,
    growth: 0.11,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '466920': {
    ticker: '466920',
    name: 'SOL 조선TOP3플러스',
    desc: '국내 조선업 대표 3개 기업 및 관련 핵심 기자재 기업에 투자하여 조선업황 회복의 수혜를 추구합니다.',
    pros: '슈퍼사이클 기대감이 높은 조선업에 집중 투자, 국내 대표 기업 포함.',
    cons: '산업 경기 사이클에 따른 변동성이 매우 크고, 수주 실적 및 유가에 민감.',
    yield: 0.01,
    growth: 0.09,
    color: 'lime',
    risk: '높음',
    category: '섹터'
  },
  '466940': {
    ticker: '466940',
    name: 'TIGER 은행고배당플러스TOP10',
    desc: '국내 은행주 중 배당 매력이 높은 상위 기업에 투자하여 안정적인 배당 수익과 자본 차익을 동시에 추구합니다.',
    pros: '높은 배당수익률 기대, 주주환원 정책 강화 수혜.',
    cons: '금리 변동 및 정부의 금융 규제에 민감, 성장성이 제한적일 수 있음.',
    yield: 0.06,
    growth: 0.04,
    color: 'red',
    risk: '중립',
    category: '배당주'
  },
  '469170': {
    ticker: '469170',
    name: 'ACE 포스코그룹포커스',
    desc: '포스코그룹 핵심 계열사(철강, 2차전지 소재, 에너지 등)에 집중 투자하여 그룹의 시너지와 성장을 추종하는 ETF입니다.',
    pros: '2차전지 소재 등 신성장 동력을 보유한 포스코 그룹에 집중 투자.',
    cons: '특정 그룹에 대한 집중도가 높아 그룹 리스크 및 경영 환경 변화에 민감.',
    yield: 0.02,
    growth: 0.08,
    color: 'blue',
    risk: '높음',
    category: '국내 주식'
  },
  '471990': {
    ticker: '471990',
    name: 'KODEX AI 반도체 핵심장비',
    desc: 'AI 반도체 생태계의 핵심인 전공정/후공정 장비 기업에 투자하여 AI 시장 성장의 수혜를 추구합니다.',
    pros: 'AI 시장 성장의 핵심인 반도체 장비 분야에 집중 투자, 기술적 해자 보유 기업 포함.',
    cons: '반도체 설비 투자 사이클에 민감, 특정 산업 집중으로 높은 변동성.',
    yield: 0.004,
    growth: 0.14,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '481190': {
    ticker: '481190',
    name: 'SOL 미국테크TOP10',
    desc: '미국 나스닥 시장을 주도하는 최상위 10개 기술주에 집중 투자하여 높은 성장을 추구하는 ETF입니다.',
    pros: '미국 대표 빅테크 기업의 성장성에 집중 투자, 낮은 보수.',
    cons: '소수 종목 집중으로 인한 매우 높은 변동성, 특정 기업의 리스크에 크게 노출.',
    yield: 0.003,
    growth: 0.16,
    color: 'yellow',
    risk: '높음',
    category: '테마'
  },
  '161510': {
    ticker: '161510',
    name: '한화PLUS 고배당주',
    desc: '국내 고배당주에 투자하여 안정적인 배당 수익을 추구하는 ETF입니다.',
    pros: '높은 배당수익률 기대, 안정적인 현금흐름.',
    cons: '시장 성장기에는 성장주 대비 낮은 수익률, 금리 인상에 민감.',
    yield: 0.055,
    growth: 0.04,
    color: 'red',
    risk: '중립',
    category: '배당주'
  },
  '251600': {
    ticker: '251600',
    name: '한화플러스고배당채권혼합',
    desc: '국내 고배당주와 우량 채권에 분산 투자하여 안정적인 배당 수익과 이자 수익을 동시에 추구하는 혼합형 ETF입니다.',
    pros: '주식과 채권 분산투자로 변동성을 낮춤, 안정적인 인컴 창출.',
    cons: '순수 주식형/채권형 대비 특정 시장 강세장에서의 수익률이 제한될 수 있음.',
    yield: 0.045,
    growth: 0.02,
    color: 'red',
    risk: '낮음',
    category: '배당주'
  },
  '0098N0': {
    ticker: '0098N0',
    name: 'PLUS 자사주매입고배당주',
    desc: '적극적인 자사주 매입과 꾸준한 고배당을 통해 주주환원을 극대화하는 기업들에 투자하는 ETF입니다.',
    pros: '배당과 자사주 매입의 시너지로 안정적인 주가 상승 및 인컴 기대.',
    cons: '기업의 자사주 매입 정책 변화에 따라 성과가 변동될 수 있음.',
    yield: 0.048,
    growth: 0.045,
    color: 'red',
    risk: '중립',
    category: '배당주'
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
    initialPrincipal: number, // in KRW
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
    const finalTarget = goal.value; // This is in 10,000 KRW (만원) units

    if (goal.type === 'asset' || goal.type === 'dividend') {
        let targetFinalAssets = 0;

        if (goal.type === 'asset') {
            // goal.value is target asset in 만원. Convert to 원.
            targetFinalAssets = finalTarget * 10000;
        } else { // dividend
            // goal.value is target monthly dividend in 만원. Convert to 원.
            const targetMonthlyDividend = finalTarget * 10000;
            if (monthlyYieldRate <= 1e-9) {
                 // Cannot achieve dividend goal if there is no yield.
                 // Assume a 1% yield to get a target asset number, this is a fallback.
                 targetFinalAssets = targetMonthlyDividend / (0.01 / 12);
            } else {
                 targetFinalAssets = targetMonthlyDividend / monthlyYieldRate;
            }
        }
        
        // initialPrincipal is already in KRW (원)
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
        // goal.value is monthly investment in 만원. Convert to 원.
        monthlyInvestment = finalTarget * 10000;
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