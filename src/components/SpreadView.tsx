
import React, { useState } from 'react';
import { FileText, Table, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SpreadItem {
  label: string;
  value: string | number;
  source: string;
}

interface FinancialRatio {
  name: string;
  value: string;
  description?: string;
}

interface SpreadViewProps {
  spreads: SpreadItem[];
}

const SpreadView: React.FC<SpreadViewProps> = ({ spreads }) => {
  const [activeView, setActiveView] = useState<'simplified' | 'detailed'>('simplified');
  
  // Sample ratios data
  const financialRatios: FinancialRatio[] = [
    { name: 'Working Capital', value: '$500,000', description: 'Current Assets - Current Liabilities' },
    { name: 'Current Ratio', value: '2.5x', description: 'Current Assets / Current Liabilities' },
    { name: 'Quick Ratio', value: '1.8x', description: '(Cash + Accounts Receivable) / Current Liabilities' },
    { name: 'Liquidity Ratio', value: '3.2x', description: 'Total Assets / Total Liabilities' },
    { name: 'Debt-to-Equity Ratio', value: '0.7x', description: 'Total Debt / Shareholder Equity' },
    { name: 'DSCR (P&I, Nano Debt Only)', value: '2.34x', description: 'Net Operating Income / Debt Service (Principal & Interest)' },
    { name: 'DSCR (P&I, All Debt)', value: '1.28x', description: 'Net Operating Income / Total Debt Service' },
    { name: 'Tangible Net Worth', value: '$1,250,000', description: 'Total Assets - Intangible Assets - Total Liabilities' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center space-x-4 mb-2">
          <ToggleViewButton 
            active={activeView === 'simplified'} 
            onClick={() => setActiveView('simplified')}
            icon={<BarChart3 size={16} />}
            label="Simplified"
          />
          <ToggleViewButton 
            active={activeView === 'detailed'} 
            onClick={() => setActiveView('detailed')}
            icon={<Table size={16} />}
            label="Statement View"
          />
        </div>
      </div>

      <div className="flex flex-1 overflow-auto">
        {/* Left side - financial spreads */}
        <div className="w-1/2 pr-4 overflow-auto border-r border-gray-200">
          {activeView === 'simplified' ? (
            <>
              <h3 className="text-lg font-medium mb-4">Financial Ratios</h3>
              <div className="grid grid-cols-2 gap-4">
                {financialRatios.map((ratio, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">{ratio.name}</div>
                    <div className="text-lg font-medium text-nano-blue">{ratio.value}</div>
                    {ratio.description && (
                      <div className="text-xs text-gray-400 mt-1">{ratio.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-4">Financial Statement</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Item</th>
                      <th className="border border-gray-200 px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">2021 TY</th>
                      <th className="border border-gray-200 px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">$/SF</th>
                      <th className="border border-gray-200 px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">2022 TY</th>
                      <th className="border border-gray-200 px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">$/SF</th>
                      <th className="border border-gray-200 px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">2023 Q3</th>
                      <th className="border border-gray-200 px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">$/SF</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Revenue:</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Rental Income</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$712,834</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.10</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$727,583</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.58</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$802,124</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">$25.99</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Other</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$0</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">$0.00</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$0</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">$0.00</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$13,159</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">$0.43</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Expenses:</td>
                      <td colSpan={6} className="border border-gray-200 bg-gray-50"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm">Operating Expense</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($468,569)</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">($15.18)</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($579,718)</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">($18.66)</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($448,257)</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right">($14.53)</td>
                    </tr>
                    <tr>
                      <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Net Operating Income (NOI):</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2 text-sm font-medium">NOI</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$379,760</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$12.31</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$382,331</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$11.74</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$424,091</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$13.74</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        
        {/* Right side - source documents */}
        <div className="w-1/2 pl-4 overflow-auto">
          <h3 className="text-lg font-medium mb-4">Source Documents</h3>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 mr-2 text-nano-blue" />
              <span className="font-medium">25109 Jefferson Ave_Operating History.pdf</span>
            </div>
            <div className="aspect-[1.5/1] bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
              <img 
                src="/lovable-uploads/101e02fe-1989-4d1a-8542-150a10f02734.png" 
                alt="Financial Statement" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-md text-sm border border-gray-200 mt-3">
              <p className="mb-2 text-gray-600">Extracted data from page 1:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {spreads.map((item, index) => (
                  <li key={index}>
                    {item.label}: {typeof item.value === 'number' ? 
                      `$${item.value.toLocaleString()}` : item.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleViewButton = ({ active, onClick, icon, label }: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center px-3 py-1.5 rounded-md text-sm ${
      active 
        ? 'bg-nano-blue text-white' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <span className="mr-1.5">{icon}</span>
    {label}
  </button>
);

export default SpreadView;
