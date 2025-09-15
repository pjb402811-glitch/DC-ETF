import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-16 text-xs text-gray-500 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="font-bold text-base text-yellow-300 mb-3">⚠️ 시뮬레이션 유의사항</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
                <li>본 시뮬레이션은 과거 데이터를 기반으로 한 AI의 예상치이며, 미래 수익률을 보장하지 않습니다.</li>
                <li>세금(배당소득세 15.4%)이 일부 반영되었으나, 개인별 금융소득종합과세 등은 고려되지 않았습니다.</li>
                <li>시장 상황에 따라 수익률과 배당금은 언제든지 변동될 수 있으며, 투자의 최종 결정과 책임은 투자자 본인에게 있습니다.</li>
                <li>연평균 물가상승률을 적용하여 목표 금액의 미래 가치를 추산하고, 최종 결과의 현재 가치를 함께 표시합니다.</li>
                <li>AI가 추천하는 ETF 및 포트폴리오는 정보 제공을 목적으로 하며, 투자 권유가 아닙니다.</li>
            </ul>
            <h3 className="font-bold text-base text-gray-400 mb-3">면책조항 (Disclaimer)</h3>
            <p>
                본 애플리케이션에서 제공되는 모든 정보와 시뮬레이션 결과는 정보 제공을 목적으로 하며, 어떠한 경우에도 금융, 투자, 법률, 세무 또는 기타 전문적인 조언으로 해석되어서는 안 됩니다. 제공되는 정보의 정확성이나 완전성을 보장하지 않으며, 정보의 오류나 누락에 대해 어떠한 책임도 지지 않습니다. 모든 투자 결정은 사용자 본인의 판단과 책임 하에 이루어져야 하며, 본 애플리케이션의 사용으로 인해 발생할 수 있는 어떠한 직간접적인 손실에 대해서도 개발자는 책임을 지지 않습니다. 투자를 시작하기 전에는 반드시 자격을 갖춘 금융 전문가와 상담하시기 바랍니다.
            </p>
        </footer>
    );
};

export default Footer;
