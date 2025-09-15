import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Etf, PortfolioScenario, RiskProfile, InvestmentTheme, SimulationGoal, SimulationResult, PortfolioMonitorData } from './types';
import { ALL_ETFS, runSimulation } from './services/etfService';
import { generateAiPortfolio } from './services/geminiService';
import Header from './components/Header';
import Navigation from './components/Navigation';
import EtfInfoSection from './components/EtfInfoSection';
import FearAndGreedIndex from './components/FearAndGreedIndex';
import SimulatorForm from './components/SimulatorForm';
import ResultsSection from './components/ResultsSection';
import MyPortfolioSection from './components/MyPortfolioSection';
import LoadingOverlay from './components/LoadingOverlay';
import AlertModal from './components/AlertModal';
import ApiKeyModal from './components/ApiKeyModal';
import ConfirmModal from './components/ConfirmModal';
import Footer from './components/Footer';

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

const App: React.FC = () => {
    // Main App State
    const [activeTab, setActiveTab] = useState<'simulator' | 'tracker'>('simulator');
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    
    // Data State
    const [etfData, setEtfData] = useState<Record<string, Etf>>(() => {
        try {
            const savedEtfs = localStorage.getItem('custom-etf-data');
            return savedEtfs ? JSON.parse(savedEtfs) : ALL_ETFS;
        } catch (error) {
            console.error("Failed to load ETFs from localStorage", error);
            return ALL_ETFS;
        }
    });

    const [myPortfolios, setMyPortfolios] = useState<PortfolioMonitorData[]>(() => {
        try {
            const saved = localStorage.getItem('my-portfolios-data');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to load portfolios from localStorage", error);
            return [];
        }
    });

    // UI/Flow State
    const [loading, setLoading] = useState({ isVisible: false, message: '처리 중...' });
    const [alert, setAlert] = useState<AlertState>(null);
    const [confirm, setConfirm] = useState<ConfirmState>(null);
    const [simulationResults, setSimulationResults] = useState<SimulationResult[] | null>(null);
    const [simulationInputs, setSimulationInputs] = useState<{ currentAge: number; investmentPeriod: number; initialPrincipal: number; } | null>(null);

    // Derived data
    const categories = useMemo(() => [...new Set(Object.values(etfData).map(etf => etf.category))].sort(), [etfData]);

    // API Key persistence
    useEffect(() => {
        const savedApiKey = localStorage.getItem('gemini-api-key');
        if (savedApiKey) {
            setApiKey(savedApiKey);
        } else {
            setIsApiKeyModalOpen(true);
        }
    }, []);

    const handleApiKeySave = (newApiKey: string) => {
        setApiKey(newApiKey);
        localStorage.setItem('gemini-api-key', newApiKey);
        setIsApiKeyModalOpen(false);
        showAlert('API Key 저장 완료', 'API Key가 브라우저에 안전하게 저장되었습니다.');
    };

    // Data persistence
    useEffect(() => {
        try {
            localStorage.setItem('my-portfolios-data', JSON.stringify(myPortfolios));
        } catch (error) {
            console.error("Failed to save portfolios to localStorage", error);
        }
    }, [myPortfolios]);

    useEffect(() => {
        try {
            localStorage.setItem('custom-etf-data', JSON.stringify(etfData));
        } catch (error) {
            console.error("Failed to save ETFs to localStorage", error);
        }
    }, [etfData]);

    // Alert and Confirm modal handlers
    const showAlert = (title: string, message: string) => {
        setAlert({ isVisible: true, title, message });
    };

    const closeAlert = () => setAlert(null);

    const showConfirm = (title: string, message: string, onConfirm: () => void) => {
        setConfirm({ isVisible: true, title, message, onConfirm });
    };

    const closeConfirm = () => setConfirm(null);

    const handleSimulatorSubmit = useCallback(async (
        goal: SimulationGoal,
        initialPrincipal: number,
        currentAge: number,
        investmentPeriod: number,
        riskProfile: RiskProfile,
        investmentTheme: InvestmentTheme,
        inflationRate: number
    ) => {
        if (!apiKey) {
            showAlert('API Key 필요', '시뮬레이션을 실행하려면 API Key를 설정해야 합니다.');
            setIsApiKeyModalOpen(true);
            return;
        }

        setLoading({ isVisible: true, message: 'AI가 포트폴리오를 구성 중입니다...' });
        setSimulationResults(null);
        setSimulationInputs(null);

        try {
            // Generate multiple portfolios for comparison
            const portfolioPromises = [
                generateAiPortfolio(apiKey, riskProfile, investmentTheme, Object.values(etfData)),
                // Generate a slightly different one for comparison
                generateAiPortfolio(apiKey, riskProfile, investmentTheme === 'ai-recommended' ? 'balanced-growth' : 'ai-recommended', Object.values(etfData))
            ];

            const portfolios = (await Promise.all(portfolioPromises)).filter(p => p !== null) as PortfolioScenario[];
            
            if (portfolios.length === 0) {
                throw new Error("AI가 유효한 포트폴리오를 생성하지 못했습니다.");
            }

            setLoading({ isVisible: true, message: '시뮬레이션 계산 중...' });
            
            const results: SimulationResult[] = portfolios.map(scenario => {
                const simCore = runSimulation(scenario, etfData, goal, initialPrincipal, investmentPeriod, inflationRate / 100);
                
                const inflationAdjustment = Math.pow(1 + (inflationRate / 100), investmentPeriod);
                const inflationAdjustedTargetAssets = simCore.targetAssets / inflationAdjustment;
                const finalMonthlyDividend = simCore.dividendGrowth[simCore.dividendGrowth.length - 1];
                const inflationAdjustedMonthlyDividend = finalMonthlyDividend / inflationAdjustment;

                return {
                    ...simCore,
                    scenario,
                    inflationAdjustedTargetAssets,
                    inflationAdjustedMonthlyDividend,
                };
            }).filter((r): r is SimulationResult => r !== null);
            
            setSimulationResults(results);
            setSimulationInputs({ currentAge, investmentPeriod, initialPrincipal });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
            showAlert('시뮬레이션 실패', errorMessage);
        } finally {
            setLoading({ isVisible: false, message: '' });
        }
    }, [apiKey, etfData]);

    const handleResetSimulation = () => {
        setSimulationResults(null);
        setSimulationInputs(null);
    };

    const handleSelectPortfolio = (result: SimulationResult) => {
        const newPortfolio: PortfolioMonitorData = {
            id: `portfolio-${Date.now()}`,
            portfolio: result.scenario,
            childName: `나의 퇴직연금 - ${result.scenario.name}`,
            targetMonthlyInvestment: result.monthlyInvestment,
            currentTotalValue: simulationInputs?.initialPrincipal || 0,
            monthlyDividendReceived: 0,
            yearlyAdjustments: {},
            currentTrackingYear: new Date().getFullYear(),
            trackingHistory: {
                [new Date().getFullYear()]: Array.from({ length: 12 }, (_, i) => ({
                    month: i + 1,
                    investments: Object.keys(result.scenario.weights).reduce((acc, ticker) => ({ ...acc, [ticker]: 0 }), {})
                }))
            },
            simulationProjection: {
                periodYears: result.periodYears,
                targetAssets: result.targetAssets,
                finalMonthlyDividend: result.dividendGrowth[result.dividendGrowth.length - 1],
                inflationAdjustedTargetAssets: result.inflationAdjustedTargetAssets,
                inflationAdjustedMonthlyDividend: result.inflationAdjustedMonthlyDividend,
                startAge: simulationInputs?.currentAge,
            }
        };

        setMyPortfolios(prev => [...prev, newPortfolio]);
        showAlert('포트폴리오 추가됨', `'${newPortfolio.childName}' 포트폴리오가 '포트폴리오 관리' 탭에 추가되었습니다.`);
        setActiveTab('tracker');
    };
    
    const handleUpdatePortfolio = (updatedPortfolio: PortfolioMonitorData) => {
        setMyPortfolios(prev => prev.map(p => p.id === updatedPortfolio.id ? updatedPortfolio : p));
        showAlert('업데이트 완료', `'${updatedPortfolio.childName}' 포트폴리오 정보가 저장되었습니다.`);
    };

    const handleClonePortfolio = (portfolioId: string) => {
        const portfolioToClone = myPortfolios.find(p => p.id === portfolioId);
        if (portfolioToClone) {
            const clonedPortfolio = {
                ...JSON.parse(JSON.stringify(portfolioToClone)),
                id: `portfolio-${Date.now()}`,
                childName: `${portfolioToClone.childName} (복사본)`
            };
            setMyPortfolios(prev => [...prev, clonedPortfolio]);
            showAlert('복제 완료', '포트폴리오가 복제되었습니다.');
        }
    };
    
    const handleDeletePortfolio = (portfolioId: string) => {
        const portfolio = myPortfolios.find(p => p.id === portfolioId);
        if (portfolio) {
            showConfirm(
                '포트폴리오 삭제',
                `'${portfolio.childName}' 포트폴리오를 정말로 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`,
                () => {
                    setMyPortfolios(prev => prev.filter(p => p.id !== portfolioId));
                    closeConfirm();
                    showAlert('삭제 완료', '포트폴리오가 삭제되었습니다.');
                }
            );
        }
    };

    const handleResetAllPortfolios = () => {
        showConfirm(
            '전체 초기화',
            '모든 포트폴리오 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.',
            () => {
                setMyPortfolios([]);
                closeConfirm();
                showAlert('초기화 완료', '모든 포트폴리오 데이터가 삭제되었습니다.');
            }
        );
    };

    const handleExportPortfolios = () => {
        try {
            const dataStr = JSON.stringify({ portfolios: myPortfolios, etfs: etfData }, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const exportFileDefaultName = `dc_planner_backup_${new Date().toISOString().slice(0, 10)}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            showAlert('내보내기 성공', '데이터가 JSON 파일로 다운로드되었습니다.');
        } catch (error) {
            showAlert('내보내기 실패', '데이터를 내보내는 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const handleImportPortfolios = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("File content is not valid text.");
                
                const data = JSON.parse(text);
                
                if (data.portfolios && Array.isArray(data.portfolios) && data.etfs && typeof data.etfs === 'object') {
                    showConfirm(
                        '데이터 가져오기',
                        `파일에서 ${data.portfolios.length}개의 포트폴리오와 ${Object.keys(data.etfs).length}개의 ETF 데이터를 찾았습니다.\n기존 데이터를 덮어쓰시겠습니까?`,
                        () => {
                            setMyPortfolios(data.portfolios);
                            setEtfData(data.etfs);
                            closeConfirm();
                            showAlert('가져오기 성공', '데이터를 성공적으로 불러왔습니다.');
                            setActiveTab('tracker');
                        }
                    );
                } else {
                    throw new Error("Invalid JSON format. Expected 'portfolios' and 'etfs' keys.");
                }
            } catch (error) {
                const msg = error instanceof Error ? error.message : "알 수 없는 오류입니다.";
                showAlert('가져오기 실패', `파일을 읽는 중 오류가 발생했습니다: ${msg}`);
            }
        };
        reader.readAsText(file);
    };

    const handleSaveEtf = (etf: Etf) => {
        setEtfData(prev => ({
            ...prev,
            [etf.ticker]: etf,
        }));
        showAlert('ETF 저장됨', `'${etf.name}' 정보가 저장되었습니다.`);
    };

    const handleDeleteEtf = (ticker: string) => {
        const etf = etfData[ticker];
        const isUsed = myPortfolios.some(p => Object.keys(p.portfolio.weights).includes(ticker));
        
        if (isUsed) {
            showAlert('삭제 불가', `'${etf.name}' ETF는 현재 사용 중인 포트폴리오가 있어 삭제할 수 없습니다.`);
            return;
        }

        showConfirm(
            'ETF 삭제',
            `'${etf.name}' (${ticker}) ETF를 목록에서 삭제하시겠습니까?`,
            () => {
                const newEtfData = { ...etfData };
                delete newEtfData[ticker];
                setEtfData(newEtfData);
                closeConfirm();
                showAlert('삭제 완료', 'ETF가 목록에서 삭제되었습니다.');
            }
        );
    };

    const handleResetEtfs = () => {
        showConfirm(
            '기본값 복원',
            'ETF 목록을 기본값으로 복원하시겠습니까? 추가/수정한 모든 정보가 사라집니다.',
            () => {
                setEtfData(ALL_ETFS);
                closeConfirm();
                showAlert('복원 완료', 'ETF 목록이 기본값으로 복원되었습니다.');
            }
        );
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            <main className="container mx-auto p-4 md:p-8">
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
                        <FearAndGreedIndex />
                        <SimulatorForm onSubmit={handleSimulatorSubmit} />
                        {simulationResults && simulationInputs && (
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
                        onExport={handleExportPortfolios}
                        onImport={handleImportPortfolios}
                    />
                )}

                <Footer />

                <LoadingOverlay isVisible={loading.isVisible} message={loading.message} />
                
                {alert && (
                    <AlertModal
                        isVisible={alert.isVisible}
                        title={alert.title}
                        message={alert.message}
                        onClose={closeAlert}
                    />
                )}
                
                {confirm && (
                    <ConfirmModal
                        isVisible={confirm.isVisible}
                        title={confirm.title}
                        message={confirm.message}
                        onConfirm={confirm.onConfirm}
                        onClose={closeConfirm}
                    />
                )}
                
                <ApiKeyModal
                    isOpen={isApiKeyModalOpen}
                    onClose={() => setIsApiKeyModalOpen(false)}
                    onSave={handleApiKeySave}
                />
            </main>
        </div>
    );
};

export default App;
