
import React, { useState } from 'react';
import { FileText, Table, BarChart3, CreditCard, DollarSign, Building, LineChart } from 'lucide-react';
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
  const [statementType, setStatementType] = useState<'operating' | 'balance' | 'cashflow' | 'debtService' | 'propertyAnalysis' | 'rentRoll'>('operating');
  
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

  const statementTypes = [
    { id: 'operating', label: 'Operating Statement', icon: <DollarSign size={16} /> },
    { id: 'balance', label: 'Balance Sheet', icon: <CreditCard size={16} /> },
    { id: 'cashflow', label: 'Cash Flow', icon: <LineChart size={16} /> },
    { id: 'debtService', label: 'Debt Service', icon: <Table size={16} /> },
    { id: 'propertyAnalysis', label: 'Property Analysis', icon: <Building size={16} /> },
    { id: 'rentRoll', label: 'Rent Roll', icon: <BarChart3 size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
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

        {/* Statement Type Selector */}
        <div className="flex flex-wrap items-center space-x-2 mb-2">
          {statementTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setStatementType(type.id as any)}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm mb-2 ${
                statementType === type.id 
                  ? 'bg-[#a29f95] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1.5">{type.icon}</span>
              {type.label}
            </button>
          ))}
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
                    <div className="text-lg font-medium text-[#a29f95]">{ratio.value}</div>
                    {ratio.description && (
                      <div className="text-xs text-gray-400 mt-1">{ratio.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-4">
                {statementTypes.find(type => type.id === statementType)?.label || 'Financial Statement'}
              </h3>
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
                    {/* Render different content based on statement type */}
                    {statementType === 'operating' && (
                      <>
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
                      </>
                    )}
                    
                    {statementType === 'balance' && (
                      <>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Assets:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Cash & Equivalents</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$254,321</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$8.24</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$312,456</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$10.12</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$345,789</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$11.20</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Accounts Receivable</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$78,542</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$2.54</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$65,321</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$2.12</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$54,897</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$1.78</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Property & Equipment</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$3,450,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$111.76</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$3,450,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$111.76</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$3,500,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$113.40</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Liabilities:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Current Liabilities</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($125,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($4.05)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($142,500)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($4.62)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($139,750)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($4.53)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Long-term Debt</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($2,100,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($68.05)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($2,050,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($66.44)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($2,000,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($64.82)</td>
                        </tr>
                      </>
                    )}

                    {statementType === 'cashflow' && (
                      <>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Operating Activities:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Net Income</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$324,560</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$10.52</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$342,450</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$11.10</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$365,890</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$11.85</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Investing Activities:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Capital Expenditures</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($75,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($2.43)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($125,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($4.05)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($50,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($1.62)</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Financing Activities:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Debt Repayment</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($120,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.89)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($120,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.89)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($120,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.89)</td>
                        </tr>
                      </>
                    )}

                    {statementType === 'debtService' && (
                      <>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Debt Service:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Principal & Interest (Existing)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($162,500)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($5.27)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($162,500)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($5.27)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($162,500)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($5.27)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Proposed Debt Service</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">$0</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$0.00</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">$0</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$0.00</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($145,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($4.70)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm font-medium">DSCR</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">2.34x</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">2.35x</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">1.38x</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">-</td>
                        </tr>
                      </>
                    )}

                    {statementType === 'propertyAnalysis' && (
                      <>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Property Details:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Total Square Feet</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">30,854</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">30,854</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">30,854</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Occupancy Rate</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">92%</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">95%</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">98%</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Revenue per SF</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.10</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.58</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$25.99</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Expense per SF</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$15.18</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$18.66</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$14.53</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Cap Rate</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">5.8%</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">5.9%</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">6.2%</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                        </tr>
                      </>
                    )}

                    {statementType === 'rentRoll' && (
                      <>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Rental Income:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Suite 101 - Retail</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$98,450</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$24.50</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$100,419</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$24.99</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$102,427</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$25.49</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Suite 201 - Office</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$156,240</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$22.80</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$159,365</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.26</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$162,552</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.72</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Suite 301 - Office</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$143,472</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.40</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$146,341</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.87</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$149,268</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$24.34</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Suite 401 - Office</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$132,420</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$22.60</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$135,068</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.05</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$137,769</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.51</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Vacancy</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($28,420)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($15,740)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($5,100)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">-</td>
                        </tr>
                      </>
                    )}
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
              <FileText className="h-5 w-5 mr-2 text-[#a29f95]" />
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
        ? 'bg-[#a29f95] text-white' 
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
  >
    <span className="mr-1.5">{icon}</span>
    {label}
  </button>
);

export default SpreadView;
