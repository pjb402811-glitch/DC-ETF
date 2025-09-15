import React from 'react';
import type { EtfVerificationResult } from '../types';

interface VerificationResultModalProps {
    isOpen: boolean;
    results: EtfVerificationResult[];
    onClose: () => void;
    onUpdateMismatches: (resultsToUpdate: EtfVerificationResult[]) => void;
}

const VerificationResultModal: React.FC<VerificationResultModalProps> = ({ isOpen, results, onClose, onUpdateMismatches }) => {
    if (!isOpen) return null;

    const mismatchesToUpdate = results.filter(
        (result) => result.status === 'mismatch' && result.remoteName
    );

    const getStatusChip = (status: EtfVerificationResult['status']) => {
        switch (status) {
            case 'match':
                return <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">일치</span>;
            case 'mismatch':
                return <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">불일치</span>;
            case 'error':
                return <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-semibold">오류</span>;
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-4xl border border-gray-700 relative max-h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-xl font-bold text-white mb-2">ETF 정보 검증 결과</h3>
                <p className="text-sm text-gray-400 mb-6">로컬 ETF 데이터를 Google 검색 최신 정보와 비교한 결과입니다.</p>
                
                <div className="overflow-y-auto flex-grow">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-900 sticky top-0">
                            <tr>
                                <th scope="col" className="px-4 py-3">상태</th>
                                <th scope="col" className="px-4 py-3">종목코드</th>
                                <th scope="col" className="px-4 py-3">저장된 ETF명</th>
                                <th scope="col" className="px-4 py-3">검색된 ETF명 (AI)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {results.map((result) => (
                                <tr key={result.ticker} className="hover:bg-gray-700/50">
                                    <td className="px-4 py-3 text-center">{getStatusChip(result.status)}</td>
                                    <td className="px-4 py-3 font-mono">{result.ticker}</td>
                                    <td className="px-4 py-3">{result.localName}</td>
                                    <td className="px-4 py-3">
                                        {result.status === 'error' 
                                            ? <span className="text-red-400 italic">{result.error}</span>
                                            : result.remoteName || <span className="text-gray-500">N/A</span>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        닫기
                    </button>
                     <button
                        onClick={() => onUpdateMismatches(mismatchesToUpdate)}
                        disabled={mismatchesToUpdate.length === 0}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        불일치 항목 최신화 ({mismatchesToUpdate.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationResultModal;