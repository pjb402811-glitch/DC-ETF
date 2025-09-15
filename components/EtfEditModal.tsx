import React, { useState, useEffect, useCallback } from 'react';
import type { Etf } from '../types';
import { categoryColorMap } from '../constants';
import { generateEtfInfo } from '../services/geminiService';
import LoadingOverlay from './LoadingOverlay';

interface EtfEditModalProps {
    etf: Etf | null;
    apiKey: string | null;
    onSave: (etf: Etf) => void;
    onClose: () => void;
    existingTickers: string[];
    categories: string[];
}

interface Source {
    uri: string;
    title: string;
}

const EtfEditModal: React.FC<EtfEditModalProps> = ({ etf, apiKey, onSave, onClose, existingTickers, categories }) => {
    const isNew = etf === null;
    const [formData, setFormData] = useState<Partial<Etf>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sources, setSources] = useState<Source[] | null>(null);

    useEffect(() => {
        setFormData(isNew ? { risk: '중립', yield: 0, growth: 0 } : { ...etf });
        setError(null);
        setSources(null);
    }, [etf, isNew]);

    const handleChange = (field: keyof Etf, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNumericChange = (field: 'yield' | 'growth', value: string) => {
        const percentage = parseFloat(value);
        if (!isNaN(percentage)) {
            handleChange(field, percentage / 100);
        } else {
            handleChange(field, 0);
        }
    };
    
    const handleAutoFill = useCallback(async () => {
        if (!apiKey) {
            setError("AI 자동 완성을 사용하려면 API Key가 필요합니다.");
            return;
        }
        if (!formData.ticker && !formData.name) {
            setError("AI 자동 완성을 위해 종목코드 또는 ETF 이름 중 하나는 입력해야 합니다.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setSources(null);
        try {
            const result = await generateEtfInfo(apiKey, formData.ticker, formData.name);
            if (result) {
                 const { etfInfo, sources: newSources } = result;
                 if (isNew && etfInfo.ticker && existingTickers.includes(etfInfo.ticker)) {
                    setError(`이미 존재하는 티커입니다: ${etfInfo.ticker} (${etfInfo.name})`);
                    setIsLoading(false);
                    return;
                }
                setFormData(prev => ({
                    ...prev,
                    ...etfInfo,
                }));
                setSources(newSources);
            } else {
                setError("AI로부터 유효한 정보를 받지 못했습니다.");
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'AI 정보 생성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [apiKey, formData.ticker, formData.name, isNew, existingTickers]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { ticker, name, desc, pros, cons, yield: etfYield, growth, risk, category } = formData;
        
        if (!ticker || !name || !category) {
            setError("티커, 이름, 카테고리는 필수 입력 항목입니다.");
            return;
        }
        if (isNew && existingTickers.includes(ticker)) {
            setError("이미 존재하는 티커입니다.");
            return;
        }
        
        const finalEtf: Etf = {
            ticker,
            name,
            category,
            desc: desc || '',
            pros: pros || '',
            cons: cons || '',
            yield: typeof etfYield === 'number' ? etfYield : 0,
            growth: typeof growth === 'number' ? growth : 0,
            risk: risk || '중립',
            color: categoryColorMap[category] || 'gray',
        };

        onSave(finalEtf);
    };

    const yieldPercent = formData.yield !== undefined ? (formData.yield * 100).toFixed(2) : '0.00';
    const growthPercent = formData.growth !== undefined ? (formData.growth * 100).toFixed(2) : '0.00';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <LoadingOverlay isVisible={isLoading} message="AI가 ETF 정보를 분석 중입니다..." />
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-2xl border border-gray-700 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-xl font-bold text-white mb-6">{isNew ? '새 ETF 추가' : 'ETF 정보 수정'}</h3>
                
                {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">종목코드</label>
                            <input type="text" value={formData.ticker || ''} onChange={e => handleChange('ticker', e.target.value)} disabled={!isNew} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">ETF 이름</label>
                            <input type="text" value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="text-center my-4">
                        <button type="button" onClick={handleAutoFill} disabled={isLoading || !apiKey} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                            🤖 AI로 나머지 정보 자동 완성
                        </button>
                        {!apiKey && <p className="text-xs text-gray-500 mt-2">API Key가 설정되지 않아 AI 자동 완성을 사용할 수 없습니다.</p>}
                    </div>

                    {sources && sources.length > 0 && (
                        <div className="my-4 bg-gray-900/50 p-3 rounded-lg text-left">
                            <h4 className="text-sm font-semibold text-gray-400 mb-2">AI가 참고한 정보 출처:</h4>
                            <ul className="space-y-1 text-xs max-h-24 overflow-y-auto">
                                {sources.map((source, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all" title={source.uri}>
                                            {source.title || source.uri}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">설명</label>
                        <textarea value={formData.desc || ''} onChange={e => handleChange('desc', e.target.value)} rows={2} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">장점</label>
                        <input type="text" value={formData.pros || ''} onChange={e => handleChange('pros', e.target.value)} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">단점/유의사항</label>
                        <input type="text" value={formData.cons || ''} onChange={e => handleChange('cons', e.target.value)} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">예상 배당률 (%)</label>
                            <input type="number" step="0.01" value={yieldPercent} onChange={e => handleNumericChange('yield', e.target.value)} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">예상 성장률 (%)</label>
                            <input type="number" step="0.01" value={growthPercent} onChange={e => handleNumericChange('growth', e.target.value)} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">위험도</label>
                            <select value={formData.risk || '중립'} onChange={e => handleChange('risk', e.target.value as Etf['risk'])} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="낮음">낮음</option>
                                <option value="중립">중립</option>
                                <option value="높음">높음</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">카테고리</label>
                            <input type="text" list="categories" value={formData.category || ''} onChange={e => handleChange('category', e.target.value)} className="w-full bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <datalist id="categories">
                                {categories.map(c => <option key={c} value={c} />)}
                            </datalist>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            취소
                        </button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EtfEditModal;