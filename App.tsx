import React, { useState, useEffect, useCallback } from 'react';
import type { Etf, PortfolioScenario, RiskProfile, InvestmentTheme, SimulationGoal, SimulationResult, PortfolioMonitorData } from './types';
import { ALL_ETFS, runSimulation } from './services/etfService';
import { generateAiPortfolio } from './services/geminiService';
import Header from './components/Header';
import Navigation from './components/Navigation';
import EtfInfoSection from './components/EtfInfoSection';
import SimulatorForm from './components/SimulatorForm';
import ResultsSection from './components/ResultsSection';
import MyPortfolioSection from './components/MyPortfolioSection';
import LoadingOverlay from './components/LoadingOverlay';
import AlertModal from './components/AlertModal';
import ApiKeyModal from './components/ApiKeyModal';
import ConfirmModal from './components/ConfirmModal';

type AlertState = {
    isVisible: boolean;
    title: string;
    message: string;
} | null;

type ConfirmState = {
    isVisible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
} | null;

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-lg text-center border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">🎉 퇴직연금 DC플랜에 오신 것을 환영합니다!</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    이 앱의 핵심 기능인 AI 포트폴리오 시뮬레이션을 사용하려면 <br/>
                    <span className="font-bold text-amber-400">Google AI API Key</span>가 필요합니다.
                </p>
                <div className="bg-gray-900/50 p-4 rounded-lg mb-6 text-left">
                    <p className="text-gray-300">
                        우측 상단의 <span className="inline-flex items-center justify-center bg-gray-700 rounded-md p-1 mx-1 align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>
                        </span>
                        아이콘을 클릭하여 API Key를 설정해주세요.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">API Key는 브라우저에만 안전하게 저장됩니다.</p>
                </div>
                <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    확인하고 시작하기
                </button>
            </div>
        </div>
    );
};

const App: React.FC = () => {
    // Main App State
    const [activeTab, setActiveTab] = useState<'simulator' | 'tracker'>('simulator');
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
    
    // Data State
    const [etfData, setEtfData] = useState<Record<string, Etf>>(ALL_ETFS);
    const [myPortfolios, setMyPortfolios] = useState<PortfolioMonitorData[]>([]);

    // UI State
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('데이터 로딩 중...');
    const [alertState, setAlertState] = useState<AlertState>(null);
    const [confirmState, setConfirmState] = useState<ConfirmState>(null);

    // Simulation State
    const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
    const [simulationInputs, setSimulationInputs] = useState<{
        currentAge: number; investmentPeriod: number; initialPrincipal: number;
    } | null>(null);
    
    // Load data from localStorage on initial render
    useEffect(() => {
        try {
            const savedApiKey = localStorage.getItem('geminiApiKey');
            if (savedApiKey) setApiKey(savedApiKey);

            const savedEtfs = localStorage.getItem('etfData');
            if (savedEtfs) setEtfData(JSON.parse(savedEtfs));
            
            const savedPortfolios = localStorage.getItem('myPortfolios');
            if (savedPortfolios) setMyPortfolios(JSON.parse(savedPortfolios));

            const hasVisited = localStorage.getItem('hasVisited');
            if (!hasVisited) {
                setIsWelcomeModalOpen(true);
            }
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
            showAlert('로딩 오류', '저장된 데이터를 불러오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveData = useCallback((key: string, data: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Failed to save data to localStorage (key: ${key})`, error);
            showAlert('저장 오류', '데이터를 로컬에 저장하는 데 실패했습니다.');
        }
    }, []);

    const handleCloseWelcomeModal = () => {
        setIsWelcomeModalOpen(false);
        localStorage.setItem('hasVisited', 'true');
        if (!apiKey) {
            setIsApiKeyModalOpen(true);
        }
    };
    
    const handleSaveApiKey = (newKey: string) => {
        setApiKey(newKey);
        saveData('geminiApiKey', newKey);
        setIsApiKeyModalOpen(false);
        showAlert('저장 완료', 'API Key가 성공적으로 저장되었습니다.');
    };

    const handleSaveEtf = (etf: Etf) => {
        const newEtfData = { ...etfData, [etf.ticker]: etf };
        setEtfData(newEtfData);
        saveData('etfData', newEtfData);
        showAlert('저장 완료', 'ETF 정보가 성공적으로 저장되었습니다.');
    };
    
    const handleDeleteEtf = (ticker: string) => {
        showConfirm('ETF 삭제', `'${ticker}' ETF를 목록에서 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`, () => {
            const newEtfData = { ...etfData };
            delete newEtfData[ticker];
            setEtfData(newEtfData);
            saveData('etfData', newEtfData);
        });
    };
    
    const handleResetEtfs = () => {
        showConfirm('ETF 목록 초기화', '모든 ETF 정보를 기본값으로 복원하시겠습니까? 사용자 추가/수정 정보가 모두 사라집니다.', () => {
            setEtfData(ALL_ETFS);
            saveData('etfData', ALL_ETFS);
        });
    };
    
    const categories = [...new Set(Object.values(etfData).map(etf => etf.category))].sort((a, b) => {
        const order = ['국내 주식', '해외 주식', '배당주', '커버드콜', '섹터', '테마', '부동산/인프라', '국내 채권', '해외 채권', '자산배분(TDF/TRF)', '단기 금융'];
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    const showAlert = (title: string, message: string) => {
        setAlertState({ isVisible: true, title, message });
    };

    const showConfirm = (title: string, message: string, onConfirm: () => void) => {
        setConfirmState({ isVisible: true, title, message, onConfirm });
    };
    
    const handleSimulationSubmit = async (
        goal: SimulationGoal,
        initialPrincipal: number,
        currentAge: number,
        investmentPeriod: number,
        riskProfile: RiskProfile,
        investmentTheme: InvestmentTheme,
        inflationRate: number
    ) => {
        const currentApiKey = apiKey;
        if (!currentApiKey) {
            showAlert('API Key 필요', '시뮬레이션을 위해 API Key를 먼저 설정해주세요. 우측 상단 설정 아이콘을 클릭하여 입력할 수 있습니다.');
            setIsApiKeyModalOpen(true);
            return;
        }

        setLoadingMessage('AI가 최적의 포트폴리오를 구성 중입니다...');
        setIsLoading(true);
        setSimulationResults([]);
        
        try {
            const primaryScenario = await generateAiPortfolio(currentApiKey, riskProfile, investmentTheme, Object.values(etfData));
            if (!primaryScenario) throw new Error("AI 포트폴리오 생성에 실패했습니다.");
            
            const alternativeThemes: InvestmentTheme[] = (['stable-income', 'balanced-growth', 'max-growth-70'] as const).filter(t => t !== investmentTheme);
            const alternativeScenariosPromises = alternativeThemes.slice(0, 2).map(theme =>
                generateAiPortfolio(currentApiKey, riskProfile, theme, Object.values(etfData))
            );
            const alternativeScenariosResults = await Promise.all(alternativeScenariosPromises);
            
            const allScenarios = [primaryScenario, ...alternativeScenariosResults.filter(Boolean) as PortfolioScenario[]];
            
            setLoadingMessage('시뮬레이션 결과를 계산 중입니다...');
            
            const results: SimulationResult[] = allScenarios.map(scenario => {
                 const simResult = runSimulation(scenario, etfData, goal, initialPrincipal, investmentPeriod, inflationRate/100);
                 const inflationAdjustment = Math.pow(1 + inflationRate / 100, investmentPeriod);
                 const inflationAdjustedTargetAssets = simResult.targetAssets / inflationAdjustment;
                 const finalMonthlyDividend = simResult.dividendGrowth[simResult.dividendGrowth.length - 1];
                 const inflationAdjustedMonthlyDividend = finalMonthlyDividend / inflationAdjustment;
                 
                 return {
                     scenario,
                     ...simResult,
                     inflationAdjustedTargetAssets,
                     inflationAdjustedMonthlyDividend,
                 };
            });
            
            setSimulationResults(results);
            setSimulationInputs({ currentAge, investmentPeriod, initialPrincipal });
            
        } catch (error) {
            console.error("Simulation failed:", error);
            showAlert('시뮬레이션 오류', error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleResetSimulation = () => {
        setSimulationResults([]);
        setSimulationInputs(null);
    };

    const handleSelectPortfolio = (result: SimulationResult) => {
        const { scenario, monthlyInvestment, targetAssets, inflationAdjustedTargetAssets, periodYears, dividendGrowth, inflationAdjustedMonthlyDividend } = result;
        const startAge = simulationInputs?.currentAge;
        const currentYear = new Date().getFullYear();

        const newPortfolio: PortfolioMonitorData = {
            id: `portfolio-${Date.now()}`,
            portfolio: scenario,
            childName: '나의 퇴직연금',
            targetMonthlyInvestment: monthlyInvestment,
            currentTotalValue: simulationInputs?.initialPrincipal || 0,
            monthlyDividendReceived: 0,
            yearlyAdjustments: {},
            currentTrackingYear: currentYear,
            trackingHistory: {
                [currentYear]: Array(12).fill(null).map((_, i) => ({
                    month: i + 1,
                    investments: Object.keys(scenario.weights).reduce((acc, ticker) => ({ ...acc, [ticker]: 0 }), {}),
                }))
            },
            simulationProjection: {
                periodYears,
                targetAssets,
                finalMonthlyDividend: dividendGrowth[dividendGrowth.length - 1],
                inflationAdjustedTargetAssets,
                inflationAdjustedMonthlyDividend,
                startAge,
            }
        };

        const updatedPortfolios = [...myPortfolios, newPortfolio];
        setMyPortfolios(updatedPortfolios);
        saveData('myPortfolios', updatedPortfolios);
        setActiveTab('tracker');
        showAlert('포트폴리오 추가 완료', `'${scenario.name}' 포트폴리오가 '포트폴리오 관리' 탭에 추가되었습니다.`);
        handleResetSimulation();
    };
    
    const handleUpdatePortfolio = (updatedData: PortfolioMonitorData) => {
        const newPortfolios = myPortfolios.map(p => p.id === updatedData.id ? updatedData : p);
        setMyPortfolios(newPortfolios);
        saveData('myPortfolios', newPortfolios);
    };

    const handleClonePortfolio = (portfolioId: string) => {
        const portfolioToClone = myPortfolios.find(p => p.id === portfolioId);
        if (portfolioToClone) {
            const clonedPortfolio = JSON.parse(JSON.stringify(portfolioToClone));
            clonedPortfolio.id = `portfolio-${Date.now()}`;
            clonedPortfolio.childName = `${clonedPortfolio.childName} (복사본)`;
            const updatedPortfolios = [...myPortfolios, clonedPortfolio];
            setMyPortfolios(updatedPortfolios);
            saveData('myPortfolios', updatedPortfolios);
            showAlert('복제 완료', '포트폴리오가 복제되었습니다.');
        }
    };
    
    const handleDeletePortfolio = (portfolioId: string) => {
        showConfirm('포트폴리오 삭제', '이 포트폴리오를 정말로 삭제하시겠습니까? 모든 추적 데이터가 사라지며, 되돌릴 수 없습니다.', () => {
            const newPortfolios = myPortfolios.filter(p => p.id !== portfolioId);
            setMyPortfolios(newPortfolios);
            saveData('myPortfolios', newPortfolios);
        });
    };
    
    const handleResetAllPortfolios = () => {
        showConfirm('전체 초기화', '모든 포트폴리오 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.', () => {
            setMyPortfolios([]);
            saveData('myPortfolios', []);
        });
    };
    
    const handleExportData = () => {
        const dataToExport = {
            etfData,
            myPortfolios,
        };
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `janyebuja_plan_backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showAlert('내보내기 완료', '데이터가 JSON 파일로 다운로드되었습니다.');
    };
    
    const handleImportData = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    const importedData = JSON.parse(text);
                    if (importedData.etfData && importedData.myPortfolios) {
                         showConfirm('데이터 가져오기', '현재 데이터를 덮어쓰고 가져온 데이터로 교체하시겠습니까?', () => {
                            setEtfData(importedData.etfData);
                            setMyPortfolios(importedData.myPortfolios);
                            saveData('etfData', importedData.etfData);
                            saveData('myPortfolios', importedData.myPortfolios);
                            showAlert('가져오기 성공', '데이터를 성공적으로 가져왔습니다.');
                        });
                    } else {
                        throw new Error("Invalid file format");
                    }
                }
            } catch (error) {
                console.error("Failed to import data:", error);
                showAlert('가져오기 실패', '파일을 읽거나 분석하는 데 실패했습니다. 유효한 백업 파일인지 확인해주세요.');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <LoadingOverlay isVisible={isLoading} message={loadingMessage} />
            {alertState && <AlertModal {...alertState} onClose={() => setAlertState(null)} />}
            {confirmState && <ConfirmModal {...confirmState} onClose={() => setConfirmState(null)} onConfirm={() => { confirmState.onConfirm(); setConfirmState(null); }} />}
            <ApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} onSave={handleSaveApiKey} />
            <WelcomeModal isOpen={isWelcomeModalOpen} onClose={handleCloseWelcomeModal} />

            <main className="container mx-auto px-4 py-8">
                <Header onSettingsClick={() => setIsApiKeyModalOpen(true)} />
                <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                
                {activeTab === 'simulator' && (
                    <>
                        <EtfInfoSection 
                            etfData={etfData}
                            categories={categories}
                            apiKey={apiKey}
                            onSaveEtf={handleSaveEtf}
                            onDeleteEtf={handleDeleteEtf}
                            onResetEtfs={handleResetEtfs}
                        />
                        <SimulatorForm onSubmit={handleSimulationSubmit} />
                        {simulationResults.length > 0 && simulationInputs && (
                           <ResultsSection
                                results={simulationResults}
                                inputs={simulationInputs}
                                onSelectPortfolio={handleSelectPortfolio}
                                onReset={handleResetSimulation}
                                showAlert={showAlert}
                                etfData={etfData}
                            />
                        )}
                    </>
                )}

                {activeTab === 'tracker' && (
                    <MyPortfolioSection
                        portfolios={myPortfolios}
                        etfData={etfData}
                        onUpdate={handleUpdatePortfolio}
                        onClone={handleClonePortfolio}
                        onDelete={handleDeletePortfolio}
                        onResetAll={handleResetAllPortfolios}
                        onExport={handleExportData}
                        onImport={handleImportData}
                    />
                )}
            </main>
        </div>
    );
};

export default App;