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
import { 
  Table as ShadcnTable,
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
  const [statementType, setStatementType] = useState<'operating' | 'balance' | 'noistmt' | 'pfs' | 'tradcashflow' | 'schedulee' | 'rentsummary'>('operating');
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
    { id: 'schedulee', label: 'Schedule E', icon: <Table size={16} /> },
    { id: 'rentsummary', label: 'Rent Summary', icon: <Building size={16} /> },
  ];

  const currentSourceDocument = sourceDocuments.find(doc => doc.id === selectedSourceDoc) || sourceDocuments[0];

  const handleStatementClick = (rowData: any) => {
    // In a real app, this would navigate to the source document
    // For now, we'll just select a random source document
    const randomDocIndex = Math.floor(Math.random() * sourceDocuments.length);
    setSelectedSourceDoc(sourceDocuments[randomDocIndex].id);
  };

  // Render the NOI Statement table
  const renderNOIStatement = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={5} className="border border-gray-200 px-4 py-2 text-left text-base font-bold">
              NOI Statement
            </th>
          </tr>
          <tr>
            <th colSpan={5} className="border border-gray-200 px-4 py-2 text-left">
              966 Piner Road - Real Estate-Warehouse-Industrial/Warehouse
            </th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2021</td>
            <td className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2022</td>
            <td className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2023</td>
            <td className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2024</td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Income</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$233,520</td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 3</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">PGI</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$233,520</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">PGI</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$233,520</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Vacancy Percentage</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">0.00%</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Total Vacancy Amount</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$0</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">PGI</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$233,520</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Total Vacancy Amount</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$0</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Effective Gross income</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$233,520</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Repairs & Maintenance</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$3,272</td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 14 (repairs)</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Insurance</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$10,586</td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 9 (Insurance)</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Property Taxes</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$17,166</td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 16 ( Property Taxes)</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Utilities</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$5,386</td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 17 ( Utilities)</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Management Fees</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 11 ( Management fees)</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Reserves</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Other expenses</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$9,395</td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 19 (Other)</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-medium">Total Operating Expenses</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right font-medium">$45,805</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Effective Gross Income</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$233,520</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Total Operating expense</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$45,805</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-medium">Net Operating Income</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right font-medium">$187,715</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Net Operating Income</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$187,715</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Debt Service</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$117,454</td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Personal Financial Statement Charles Evans Schedule of Real Estate Owned June 30, 2024 950 - 966 Piner, Santa Rosa (Annual Debt Service)</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-medium">Excess Cash Flow</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right font-medium">$70,261</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Net Operating Income</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$187,715</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Debt Service</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$117,454</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-medium">DSCR</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right font-medium">1.60</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Net Operating Income</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$187,715</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Cap Rate</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">6.50%</td>
            <td className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Configurable constant value</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-medium">Estimated Value</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right font-medium">$2,887,923</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Requested Loan Amount</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$1,904,762</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Estimated Value</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right">$2,887,923</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-medium">Loan to Value</td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2"></td>
            <td className="border border-gray-200 px-4 py-2 text-right font-medium">65.96%</td>
            <td className="border border-gray-200 px-4 py-2"></td>
          </tr>
          <tr><td colSpan={5} className="border border-gray-200 h-6"></td></tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2">Estimated Value</td>
            <td className="border border-
