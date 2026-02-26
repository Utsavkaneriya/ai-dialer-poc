import React from 'react';

const AIInsights: React.FC<{ status: string }> = ({ status }) => {

    const mockInsights = {
        sentiment: status === 'CONNECTED' ? "Neutral to Positive" : "N/A",
        keywords: status === 'CONNECTED' ? ["Billing", "Account", "Verification"] : [],
        summary: status === 'CONNECTED' ? "Customer is inquiring about billing discrepancies." : "No active call."
    };

    return (
        <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sentiment</h3>
                <p className={`text-lg font-semibold ${status === 'CONNECTED' ? 'text-blue-600' : 'text-gray-400'}`}>
                    {mockInsights.sentiment}
                </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                    {mockInsights.keywords.length > 0 ? mockInsights.keywords.map(kw => (
                        <span key={kw} className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-600">
                            {kw}
                        </span>
                    )) : <span className="text-gray-400 text-sm">Waiting...</span>}
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">AI Summary</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {mockInsights.summary}
                </p>
            </div>
        </div>
    );
};

export default AIInsights;
