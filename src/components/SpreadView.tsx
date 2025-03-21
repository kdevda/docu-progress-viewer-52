
import React, { useState } from 'react';
import { FileText, Table, BarChart3, CreditCard, DollarSign, Building, LineChart, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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

interface SourceDocument {
  id: string;
  name: string;
  imageUrl: string;
  extractedData: SpreadItem[];
}

interface SpreadViewProps {
  spreads: SpreadItem[];
}

// Toggle Button Component
interface ToggleViewButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ToggleViewButton: React.FC<ToggleViewButtonProps> = ({
  active,
  onClick,
  icon,
  label
}) => {
  return (
    <button
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
        active 
          ? "bg-[#a29f95] text-white" 
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

const SpreadView: React.FC<SpreadViewProps> = ({ spreads }) => {
  const [activeView, setActiveView] = useState<'simplified' | 'detailed'>('simplified');
  const [statementType, setStatementType] = useState<'operating' | 'balance' | 'cashflow' | 'debtService' | 'propertyAnalysis' | 'rentRoll'>('operating');
  const [selectedSourceDoc, setSelectedSourceDoc] = useState<string>("doc1");
  
  // Sample ratios data - expanded with more detailed entries
  const financialRatios: FinancialRatio[] = [
    { name: 'Working Capital', value: '$500,000', description: 'Current Assets - Current Liabilities' },
    { name: 'Current Ratio', value: '2.5x', description: 'Current Assets / Current Liabilities' },
    { name: 'Quick Ratio', value: '1.8x', description: 'Liquid Assets / Current Liabilities' },
    { name: 'Liquidity Ratio', value: '3.2x', description: 'Total Assets / Total Liabilities' },
    { name: 'Debt-to-Equity Ratio', value: '0.7x', description: 'Total Debt / Shareholder Equity' },
    { name: 'DSCR (P&I, Nano Debt Only)', value: '2.34x', description: 'Net Operating Income / Debt Service (Principal & Interest)' },
    { name: 'DSCR (P&I, All Debt)', value: '1.28x', description: 'Net Operating Income / Total Debt Service' },
    { name: 'Tangible Net Worth', value: '$1,250,000', description: 'Total Assets - Intangible Assets - Total Liabilities' },
    { name: 'Return on Assets (ROA)', value: '8.5%', description: 'Net Income / Total Assets' },
    { name: 'Return on Equity (ROE)', value: '14.2%', description: 'Net Income / Shareholder Equity' },
    { name: 'Operating Expense Ratio', value: '52.3%', description: 'Operating Expenses / Effective Gross Income' },
    { name: 'Net Income Ratio', value: '40.0%', description: 'Net Income / Gross Revenue' },
    { name: 'Leverage Ratio', value: '60.0%', description: 'Total Debt / Total Assets' },
    { name: 'Interest Coverage Ratio', value: '3.6x', description: 'EBIT / Interest Expense' },
    { name: 'Break-Even Ratio', value: '78.4%', description: '(Operating Expenses + Debt Service) / Gross Income' },
    { name: 'Fixed Charge Coverage Ratio', value: '2.1x', description: '(EBITDA - CAPEX) / (Interest + Principal)' },
    { name: 'Cash-on-Cash Return', value: '9.2%', description: 'Annual Pre-Tax Cash Flow / Total Cash Invested' },
    { name: 'Gross Rent Multiplier', value: '7.8x', description: 'Property Price / Annual Gross Rental Income' },
    { name: 'Net Income Multiplier', value: '10.5x', description: 'Property Value / Net Operating Income' },
    { name: 'Debt Yield', value: '11.7%', description: 'Net Operating Income / Loan Amount' },
  ];

  // Sample source documents - more detailed data
  const sourceDocuments: SourceDocument[] = [
    {
      id: "doc1",
      name: "25109 Jefferson Ave_Operating History.pdf",
      imageUrl: "/lovable-uploads/101e02fe-1989-4d1a-8542-150a10f02734.png",
      extractedData: [
        { label: 'Annual Revenue', value: 1250000, source: 'Financial Statement.pdf' },
        { label: 'Base Rental Income', value: 1125000, source: 'Financial Statement.pdf' },
        { label: 'CAM Reimbursements', value: 125000, source: 'Financial Statement.pdf' },
        { label: 'Operating Expenses', value: 750000, source: 'Financial Statement.pdf' },
        { label: 'Property Taxes', value: 175000, source: 'Financial Statement.pdf' },
        { label: 'Insurance', value: 85000, source: 'Financial Statement.pdf' },
        { label: 'Utilities', value: 210000, source: 'Financial Statement.pdf' },
        { label: 'Maintenance', value: 155000, source: 'Financial Statement.pdf' },
        { label: 'Management Fees', value: 125000, source: 'Financial Statement.pdf' },
        { label: 'Net Income', value: 500000, source: 'Financial Statement.pdf' },
        { label: 'Occupancy Rate', value: '92%', source: 'Financial Statement.pdf' },
        { label: 'Average Lease Term', value: '5.4 years', source: 'Financial Statement.pdf' },
        { label: 'Total Square Footage', value: '30,854 SF', source: 'Financial Statement.pdf' },
        { label: 'Average Base Rent/SF', value: '$36.46/SF', source: 'Financial Statement.pdf' },
        { label: 'Capital Expenditures', value: 85000, source: 'Financial Statement.pdf' },
      ]
    },
    {
      id: "doc2",
      name: "25109 Jefferson Ave_Balance Sheet.pdf",
      imageUrl: "/lovable-uploads/101e02fe-1989-4d1a-8542-150a10f02734.png",
      extractedData: [
        { label: 'Total Assets', value: 3750000, source: 'Balance Sheet.pdf' },
        { label: 'Cash & Equivalents', value: 450000, source: 'Balance Sheet.pdf' },
        { label: 'Accounts Receivable', value: 175000, source: 'Balance Sheet.pdf' },
        { label: 'Land Value', value: 1250000, source: 'Balance Sheet.pdf' },
        { label: 'Building Value', value: 1875000, source: 'Balance Sheet.pdf' },
        { label: 'Total Liabilities', value: 2250000, source: 'Balance Sheet.pdf' },
        { label: 'Current Liabilities', value: 225000, source: 'Balance Sheet.pdf' },
        { label: 'Long-term Debt', value: 2025000, source: 'Balance Sheet.pdf' },
        { label: 'Total Equity', value: 1500000, source: 'Balance Sheet.pdf' },
        { label: 'Debt-to-Income Ratio', value: '0.60', source: 'Balance Sheet.pdf' },
        { label: 'Working Capital', value: 400000, source: 'Balance Sheet.pdf' },
        { label: 'Fixed Assets', value: 3125000, source: 'Balance Sheet.pdf' },
        { label: 'Accumulated Depreciation', value: 375000, source: 'Balance Sheet.pdf' },
        { label: 'Other Assets', value: 125000, source: 'Balance Sheet.pdf' },
        { label: 'Retained Earnings', value: 875000, source: 'Balance Sheet.pdf' },
      ]
    },
    {
      id: "doc3",
      name: "25109 Jefferson Ave_DSCR Analysis.pdf",
      imageUrl: "/lovable-uploads/101e02fe-1989-4d1a-8542-150a10f02734.png",
      extractedData: [
        { label: 'DSCR', value: '1.25', source: 'DSCR Analysis.pdf' },
        { label: 'Annual Debt Service', value: 287000, source: 'DSCR Analysis.pdf' },
        { label: 'Principal Payments', value: 127000, source: 'DSCR Analysis.pdf' },
        { label: 'Interest Payments', value: 160000, source: 'DSCR Analysis.pdf' },
        { label: 'Net Operating Income', value: 359000, source: 'DSCR Analysis.pdf' },
        { label: 'Proposed Debt Service', value: 250000, source: 'DSCR Analysis.pdf' },
        { label: 'Combined DSCR', value: '1.07', source: 'DSCR Analysis.pdf' },
        { label: 'Breakeven Occupancy', value: '82%', source: 'DSCR Analysis.pdf' },
        { label: 'LTV Ratio', value: '65%', source: 'DSCR Analysis.pdf' },
        { label: 'Amortization Period', value: '25 years', source: 'DSCR Analysis.pdf' },
        { label: 'Loan Term', value: '10 years', source: 'DSCR Analysis.pdf' },
        { label: 'Interest Rate', value: '5.25%', source: 'DSCR Analysis.pdf' },
        { label: 'Loan Amount', value: 2400000, source: 'DSCR Analysis.pdf' },
        { label: 'Stress Test DSCR (200bps)', value: '0.95', source: 'DSCR Analysis.pdf' },
        { label: 'Debt Yield', value: '14.96%', source: 'DSCR Analysis.pdf' },
      ]
    },
    {
      id: "doc4",
      name: "25109 Jefferson Ave_Rent Roll.pdf",
      imageUrl: "/lovable-uploads/101e02fe-1989-4d1a-8542-150a10f02734.png",
      extractedData: [
        { label: 'Total Square Footage', value: '30,854 SF', source: 'Rent Roll.pdf' },
        { label: 'Occupied Space', value: '28,694 SF', source: 'Rent Roll.pdf' },
        { label: 'Vacant Space', value: '2,160 SF', source: 'Rent Roll.pdf' },
        { label: 'Occupancy Rate', value: '93%', source: 'Rent Roll.pdf' },
        { label: 'Average Base Rent/SF', value: '$23.85/SF', source: 'Rent Roll.pdf' },
        { label: 'Number of Tenants', value: '12', source: 'Rent Roll.pdf' },
        { label: 'Largest Tenant', value: 'Acme Corp (8,750 SF)', source: 'Rent Roll.pdf' },
        { label: 'Average Lease Term', value: '5.2 years', source: 'Rent Roll.pdf' },
        { label: 'Weighted Average Remaining Term', value: '3.8 years', source: 'Rent Roll.pdf' },
        { label: 'Annual Escalations', value: '3%', source: 'Rent Roll.pdf' },
        { label: 'Total Annual Base Rent', value: 736369, source: 'Rent Roll.pdf' },
        { label: 'Total Annual Additional Rent', value: 184730, source: 'Rent Roll.pdf' },
        { label: 'Percentage of NNN Leases', value: '85%', source: 'Rent Roll.pdf' },
        { label: 'Tenant Industry Diversity', value: 'High', source: 'Rent Roll.pdf' },
        { label: 'Lease Expirations (Next 12 Mo)', value: '2 leases (4,200 SF)', source: 'Rent Roll.pdf' },
      ]
    }
  ];

  const statementTypes = [
    { id: 'operating', label: 'Operating Statement', icon: <DollarSign size={16} /> },
    { id: 'balance', label: 'Balance Sheet', icon: <CreditCard size={16} /> },
    { id: 'cashflow', label: 'Cash Flow', icon: <LineChart size={16} /> },
    { id: 'debtService', label: 'Debt Service', icon: <Table size={16} /> },
    { id: 'propertyAnalysis', label: 'Property Analysis', icon: <Building size={16} /> },
    { id: 'rentRoll', label: 'Rent Roll', icon: <BarChart3 size={16} /> },
  ];

  // Find the currently selected source document
  const currentSourceDocument = sourceDocuments.find(doc => doc.id === selectedSourceDoc) || sourceDocuments[0];

  const handleStatementClick = (rowData: any) => {
    // In a real app, this would navigate to the source document
    // For now, we'll just select a random source document
    const randomDocIndex = Math.floor(Math.random() * sourceDocuments.length);
    setSelectedSourceDoc(sourceDocuments[randomDocIndex].id);
  };

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

        {/* Statement Type Selector - only show for detailed view */}
        {activeView === 'detailed' && (
          <div className="mb-4">
            <Select value={statementType} onValueChange={(value) => setStatementType(value as any)}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Select statement type" />
              </SelectTrigger>
              <SelectContent>
                {statementTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center">
                      <span className="mr-2">{type.icon}</span>
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-auto">
        {/* Left side - financial ratios - take full width of column */}
        <div className="w-full pr-4 overflow-auto">
          {activeView === 'simplified' ? (
            <>
              <h3 className="text-lg font-medium mb-4">Financial Ratios</h3>
              <div className="grid grid-cols-1 gap-4">
                {financialRatios.map((ratio, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleStatementClick(ratio)}
                  >
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
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'revenue' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Rental Income</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$712,834</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.10</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$727,583</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$23.58</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$802,124</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$25.99</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'other' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">CAM & Reimbursements</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$120,450</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$3.90</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$124,063</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$4.02</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$128,965</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$4.18</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'other' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Parking Income</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$52,150</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$1.69</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$54,925</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$1.78</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$57,671</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$1.87</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'other' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Other Income</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$35,785</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$1.16</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$38,450</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$1.25</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$42,570</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$1.38</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50 font-medium">
                          <td className="border border-gray-200 px-4 py-2 text-sm">Total Revenue</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$921,219</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$29.85</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$945,021</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$30.63</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,031,330</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$33.42</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Expenses:</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Property Taxes</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($98,750)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.20)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($102,700)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.33)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($107,808)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.49)</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Insurance</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($57,234)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($1.85)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($62,384)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($2.02)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($65,503)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($2.12)</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Utilities</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($112,585)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.65)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($126,834)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($4.11)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($93,946)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.04)</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Maintenance</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($95,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.08)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($120,750)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.91)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($80,500)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($2.61)</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Management</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($65,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($2.11)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($67,600)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($2.19)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($70,304)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($2.28)</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Other Expenses</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($40,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($1.30)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($99,450)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($3.22)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($30,196)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($0.98)</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50 font-medium">
                          <td className="border border-gray-200 px-4 py-2 text-sm">Total Expenses</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($468,569)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($15.18)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($579,718)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($18.79)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($448,257)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($14.53)</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Net Operating Income (NOI):</td>
                        </tr>
                        <tr className="cursor-pointer hover:bg-gray-50 font-medium">
                          <td className="border border-gray-200 px-4 py-2 text-sm font-medium">NOI</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$452,650</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$14.67</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$365,303</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$11.84</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$583,073</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right font-medium">$18.90</td>
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
                          <td className="border border-gray-200 px-4 py-2 text-sm">Land</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,250,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$40.51</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,250,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$40.51</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,250,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$40.51</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Building & Improvements</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,875,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$60.77</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,975,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$64.01</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$2,125,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$68.87</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Other Assets</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$125,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$4.05</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$137,500</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$4.46</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$143,750</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$4.66</td>
                        </tr>
                        <tr className="font-medium">
                          <td className="border border-gray-200 px-4 py-2 text-sm">Total Assets</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$3,582,863</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$116.12</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$3,740,277</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$121.23</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$3,919,436</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$127.03</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Liabilities:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Current Liabilities</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($225,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($7.29)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($235,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($7.62)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($240,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($7.78)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Long-term Debt</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($2,025,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($65.63)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($1,975,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($64.01)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($1,925,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($62.39)</td>
                        </tr>
                        <tr className="font-medium">
                          <td className="border border-gray-200 px-4 py-2 text-sm">Total Liabilities</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($2,250,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($72.92)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($2,210,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($71.63)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-red-600">($2,165,000)</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">($70.17)</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="border border-gray-200 px-4 py-2 text-sm font-medium bg-gray-50">Equity:</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Owner's Equity</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$625,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$20.26</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$625,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$20.26</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$625,000</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$20.26</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-2 text-sm">Retained Earnings</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$707,863</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$22.94</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$905,277</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$29.34</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,129,436</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$36.61</td>
                        </tr>
                        <tr className="font-medium">
                          <td className="border border-gray-200 px-4 py-2 text-sm">Total Equity</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,332,863</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$43.20</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,530,277</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$49.60</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right text-blue-600">$1,754,436</td>
                          <td className="border border-gray-200 px-4 py-2 text-sm text-right">$56.86</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpreadView;
