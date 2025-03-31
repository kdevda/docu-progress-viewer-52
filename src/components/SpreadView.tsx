
import React, { useState } from 'react';
import { FileText, Table as TableIcon, BarChart3, CreditCard, DollarSign, Building, LineChart, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

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
          ? "bg-[#20703F] text-white" 
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
  const [statementType, setStatementType] = useState<'operating' | 'balance' | 'cashflow' | 'debtService' | 'propertyAnalysis' | 'rentRoll' | 'noistmt' | 'pfs' | 'tradcashflow' | 'schedulee'>('operating');
  const [selectedSourceDoc, setSelectedSourceDoc] = useState<string>("doc1");
  
  // Sample ratios data - reduced to 10 entries with DSCR name updated
  const financialRatios: FinancialRatio[] = [
    { name: 'Working Capital', value: '$500,000', description: 'Current Assets - Current Liabilities' },
    { name: 'Current Ratio', value: '2.5x', description: 'Current Assets / Current Liabilities' },
    { name: 'Quick Ratio', value: '1.8x', description: 'Liquid Assets / Current Liabilities' },
    { name: 'Debt-to-Equity Ratio', value: '0.7x', description: 'Total Debt / Shareholder Equity' },
    { name: 'DSCR (P&I, New Debt Only)', value: '2.34x', description: 'Net Operating Income / Debt Service (Principal & Interest)' },
    { name: 'DSCR (P&I, All Debt)', value: '1.28x', description: 'Net Operating Income / Total Debt Service' },
    { name: 'Tangible Net Worth', value: '$1,250,000', description: 'Total Assets - Intangible Assets - Total Liabilities' },
    { name: 'Operating Expense Ratio', value: '52.3%', description: 'Operating Expenses / Effective Gross Income' },
    { name: 'Interest Coverage Ratio', value: '3.6x', description: 'EBIT / Interest Expense' },
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
    { id: 'noistmt', label: 'NOI Statement', icon: <DollarSign size={16} /> },
    { id: 'pfs', label: 'PFS', icon: <CreditCard size={16} /> },
    { id: 'tradcashflow', label: 'Traditional Cash Flow', icon: <LineChart size={16} /> },
    { id: 'schedulee', label: 'Schedule E', icon: <TableIcon size={16} /> },
    { id: 'rentRoll', label: 'Rent Roll', icon: <Building size={16} /> },
  ];

  // Sample data for the simplified view
  const ratiosData = [
    { name: 'Simple Cash Flow Coverage', y2023: '1.78x', y2022: '1.65x', y2021: '1.55x' },
    { name: 'Excess Cash Flow', value: '$73,890', y2023: '$73,890', y2022: '$65,325', y2021: '$59,457' },
    { name: 'Debt to Stated Worth', y2023: '0.38', y2022: '0.42', y2021: '0.47' },
    { name: 'Debt to Adjusted Net Worth', y2023: '0.45', y2022: '0.53', y2021: '0.59' },
    { name: 'Debt to Income', y2023: '2.10', y2022: '2.45', y2021: '2.78' },
  ];

  const globalCashFlowData = [
    { name: 'Combined Properties NOI', y2023: '$187,715', y2022: '$175,244', y2021: '$162,950' },
    { name: 'Guarantor Net Personal CF', y2023: '$121,083', y2022: '$115,750', y2021: '$108,500' },
    { name: 'Global CF Available for Debt Service', y2023: '$308,798', y2022: '$290,994', y2021: '$271,450' },
    { name: 'Property Debt Service', y2023: '$234,908', y2022: '$234,908', y2021: '$234,908' },
    { name: 'Global Net Cash Margin', y2023: '$73,890', y2022: '$56,086', y2021: '$36,542' },
    { name: 'Global DSC Ratio', y2023: '1.31', y2022: '1.24', y2021: '1.16' },
  ];

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
            icon={<TableIcon size={16} />}
            label="Statement View"
          />
        </div>

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

      <div className="flex-1 overflow-auto">
        <div className="w-full pr-4 overflow-auto">
          {activeView === 'simplified' ? (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Ratios</h3>
                <div className="bg-white rounded-lg shadow border border-gray-100">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Ratio</TableHead>
                        <TableHead className="text-right">
                          <div>2023</div>
                          <div className="text-xs text-gray-500">Tax Return</div>
                        </TableHead>
                        <TableHead className="text-right">
                          <div>2022</div>
                          <div className="text-xs text-gray-500">Tax Return</div>
                        </TableHead>
                        <TableHead className="text-right">
                          <div>2021</div>
                          <div className="text-xs text-gray-500">Tax Return</div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ratiosData.map((ratio, index) => (
                        <TableRow 
                          key={index} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleStatementClick(ratio)}
                        >
                          <TableCell className="font-medium">{ratio.name}</TableCell>
                          <TableCell className="text-right text-[#20703F] font-medium">{ratio.y2023}</TableCell>
                          <TableCell className="text-right text-[#20703F] font-medium">{ratio.y2022}</TableCell>
                          <TableCell className="text-right text-[#20703F] font-medium">{ratio.y2021}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Global Cash Flow</h3>
                <div className="bg-white rounded-lg shadow border border-gray-100">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Item</TableHead>
                        <TableHead className="text-right">
                          <div>2023</div>
                          <div className="text-xs text-gray-500">Tax Return</div>
                        </TableHead>
                        <TableHead className="text-right">
                          <div>2022</div>
                          <div className="text-xs text-gray-500">Tax Return</div>
                        </TableHead>
                        <TableHead className="text-right">
                          <div>2021</div>
                          <div className="text-xs text-gray-500">Tax Return</div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {globalCashFlowData.map((item, index) => (
                        <TableRow 
                          key={index} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleStatementClick(item)}
                        >
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-right text-[#20703F] font-medium">{item.y2023}</TableCell>
                          <TableCell className="text-right text-[#20703F] font-medium">{item.y2022}</TableCell>
                          <TableCell className="text-right text-[#20703F] font-medium">{item.y2021}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-4">
                {statementTypes.find(type => type.id === statementType)?.label || 'Financial Statement'}
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/4">Item</TableHead>
                      <TableHead className="text-right">2021 TY</TableHead>
                      <TableHead className="text-right">$/SF</TableHead>
                      <TableHead className="text-right">2022 TY</TableHead>
                      <TableHead className="text-right">$/SF</TableHead>
                      <TableHead className="text-right">2023 Q3</TableHead>
                      <TableHead className="text-right">$/SF</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statementType === 'operating' && (
                      <>
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50 font-medium">Revenue:</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'revenue' })}>
                          <TableCell>Rental Income</TableCell>
                          <TableCell className="text-right text-blue-600">$712,834</TableCell>
                          <TableCell className="text-right">$23.10</TableCell>
                          <TableCell className="text-right text-blue-600">$727,583</TableCell>
                          <TableCell className="text-right">$23.58</TableCell>
                          <TableCell className="text-right text-blue-600">$802,124</TableCell>
                          <TableCell className="text-right">$25.99</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'other' })}>
                          <TableCell>CAM & Reimbursements</TableCell>
                          <TableCell className="text-right text-blue-600">$120,450</TableCell>
                          <TableCell className="text-right">$3.90</TableCell>
                          <TableCell className="text-right text-blue-600">$124,063</TableCell>
                          <TableCell className="text-right">$4.02</TableCell>
                          <TableCell className="text-right text-blue-600">$128,965</TableCell>
                          <TableCell className="text-right">$4.18</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'other' })}>
                          <TableCell>Parking Income</TableCell>
                          <TableCell className="text-right text-blue-600">$52,150</TableCell>
                          <TableCell className="text-right">$1.69</TableCell>
                          <TableCell className="text-right text-blue-600">$54,925</TableCell>
                          <TableCell className="text-right">$1.78</TableCell>
                          <TableCell className="text-right text-blue-600">$57,671</TableCell>
                          <TableCell className="text-right">$1.87</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'other' })}>
                          <TableCell>Other Income</TableCell>
                          <TableCell className="text-right text-blue-600">$35,785</TableCell>
                          <TableCell className="text-right">$1.16</TableCell>
                          <TableCell className="text-right text-blue-600">$38,450</TableCell>
                          <TableCell className="text-right">$1.25</TableCell>
                          <TableCell className="text-right text-blue-600">$42,570</TableCell>
                          <TableCell className="text-right">$1.38</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50 font-medium">
                          <TableCell>Total Revenue</TableCell>
                          <TableCell className="text-right text-blue-600">$921,219</TableCell>
                          <TableCell className="text-right">$29.85</TableCell>
                          <TableCell className="text-right text-blue-600">$945,021</TableCell>
                          <TableCell className="text-right">$30.63</TableCell>
                          <TableCell className="text-right text-blue-600">$1,031,330</TableCell>
                          <TableCell className="text-right">$33.42</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50 font-medium">Expenses:</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <TableCell>Property Taxes</TableCell>
                          <TableCell className="text-right text-red-600">($98,750)</TableCell>
                          <TableCell className="text-right">($3.20)</TableCell>
                          <TableCell className="text-right text-red-600">($102,700)</TableCell>
                          <TableCell className="text-right">($3.33)</TableCell>
                          <TableCell className="text-right text-red-600">($107,808)</TableCell>
                          <TableCell className="text-right">($3.49)</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <TableCell>Insurance</TableCell>
                          <TableCell className="text-right text-red-600">($57,234)</TableCell>
                          <TableCell className="text-right">($1.85)</TableCell>
                          <TableCell className="text-right text-red-600">($62,384)</TableCell>
                          <TableCell className="text-right">($2.02)</TableCell>
                          <TableCell className="text-right text-red-600">($65,503)</TableCell>
                          <TableCell className="text-right">($2.12)</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <TableCell>Utilities</TableCell>
                          <TableCell className="text-right text-red-600">($112,585)</TableCell>
                          <TableCell className="text-right">($3.65)</TableCell>
                          <TableCell className="text-right text-red-600">($126,834)</TableCell>
                          <TableCell className="text-right">($4.11)</TableCell>
                          <TableCell className="text-right text-red-600">($93,946)</TableCell>
                          <TableCell className="text-right">($3.04)</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <TableCell>Maintenance</TableCell>
                          <TableCell className="text-right text-red-600">($95,000)</TableCell>
                          <TableCell className="text-right">($3.08)</TableCell>
                          <TableCell className="text-right text-red-600">($120,750)</TableCell>
                          <TableCell className="text-right">($3.91)</TableCell>
                          <TableCell className="text-right text-red-600">($80,500)</TableCell>
                          <TableCell className="text-right">($2.61)</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <TableCell>Management</TableCell>
                          <TableCell className="text-right text-red-600">($65,000)</TableCell>
                          <TableCell className="text-right">($2.11)</TableCell>
                          <TableCell className="text-right text-red-600">($67,600)</TableCell>
                          <TableCell className="text-right">($2.19)</TableCell>
                          <TableCell className="text-right text-red-600">($70,304)</TableCell>
                          <TableCell className="text-right">($2.28)</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => handleStatementClick({ type: 'expenses' })}>
                          <TableCell>Other Expenses</TableCell>
                          <TableCell className="text-right text-red-600">($40,000)</TableCell>
                          <TableCell className="text-right">($1.30)</TableCell>
                          <TableCell className="text-right text-red-600">($99,450)</TableCell>
                          <TableCell className="text-right">($3.22)</TableCell>
                          <TableCell className="text-right text-red-600">($30,196)</TableCell>
                          <TableCell className="text-right">($0.98)</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50 font-medium">
                          <TableCell>Total Expenses</TableCell>
                          <TableCell className="text-right text-red-600">($468,569)</TableCell>
                          <TableCell className="text-right">($15.18)</TableCell>
                          <TableCell className="text-right text-red-600">($579,718)</TableCell>
                          <TableCell className="text-right">($18.79)</TableCell>
                          <TableCell className="text-right text-red-600">($448,257)</TableCell>
                          <TableCell className="text-right">($14.53)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50 font-medium">Net Operating Income (NOI):</TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer hover:bg-gray-50 font-medium">
                          <TableCell>NOI</TableCell>
                          <TableCell className="text-right font-medium">$452,650</TableCell>
                          <TableCell className="text-right font-medium">$14.67</TableCell>
                          <TableCell className="text-right font-medium">$365,303</TableCell>
                          <TableCell className="text-right font-medium">$11.84</TableCell>
                          <TableCell className="text-right font-medium">$583,073</TableCell>
                          <TableCell className="text-right font-medium">$18.90</TableCell>
                        </TableRow>
                      </>
                    )}
                    
                    {statementType === 'balance' && (
                      <>
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50 font-medium">Assets:</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cash & Equivalents</TableCell>
                          <TableCell className="text-right text-blue-600">$254,321</TableCell>
                          <TableCell className="text-right">$8.24</TableCell>
                          <TableCell className="text-right text-blue-600">$312,456</TableCell>
                          <TableCell className="text-right">$10.12</TableCell>
                          <TableCell className="text-right text-blue-600">$345,789</TableCell>
                          <TableCell className="text-right">$11.20</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Accounts Receivable</TableCell>
                          <TableCell className="text-right text-blue-600">$78,542</TableCell>
                          <TableCell className="text-right">$2.54</TableCell>
                          <TableCell className="text-right text-blue-600">$65,321</TableCell>
                          <TableCell className="text-right">$2.12</TableCell>
                          <TableCell className="text-right text-blue-600">$54,897</TableCell>
                          <TableCell className="text-right">$1.78</TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpreadView;
