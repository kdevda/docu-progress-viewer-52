
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
    { id: 'schedulee', label: 'Schedule E', icon: <TableIcon size={16} /> },
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
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={5} className="border border-gray-200 px-4 py-2 text-left text-base font-bold">
              NOI Statement
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={5} className="border border-gray-200 px-4 py-2 text-left">
              966 Piner Road - Real Estate-Warehouse-Industrial/Warehouse
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2021</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2022</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2023</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Income</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$233,520</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">PGI</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$233,520</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">PGI</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$233,520</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Vacancy Percentage</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">0.00%</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Total Vacancy Amount</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$0</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">PGI</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$233,520</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Total Vacancy Amount</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$0</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Effective Gross income</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$233,520</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Repairs & Maintenance</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$3,272</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 14 (repairs)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Insurance</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$10,586</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 9 (Insurance)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Property Taxes</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$17,166</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 16 ( Property Taxes)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Utilities</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$5,386</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 17 ( Utilities)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Management Fees</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 11 ( Management fees)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Reserves</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Other expenses</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$9,395</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Form 1040 Schedule E row 19 (Other)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Total Operating Expenses</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right font-medium">$45,805</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Effective Gross Income</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$233,520</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Total Operating expense</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$45,805</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Net Operating Income</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right font-medium">$187,715</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  // Render the PFS table
  const renderPFS = () => (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="border border-gray-200 px-4 py-2 text-left text-base font-bold">
              Personal Financial Statement
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={2} className="border border-gray-200 px-4 py-2 text-left">
              CHARLES EVANS - Individual
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">6/30/2024</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Cash - checking accounts</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Liquid Assets</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Notes & Contracts receivable</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Personal Property (autos, jewelry etc.)</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Real Estate (market value)</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Investment Real Estate</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Value Closely Held Business Entity</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Total</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Total Assets</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Real Estate Mortgages</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Investment Real Estate Debt</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Total Liabilities</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Total Stated Net Worth (subT)</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  // Render the Traditional Cash Flow table
  const renderTraditionalCashFlow = () => (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={6} className="border border-gray-200 px-4 py-2 text-left text-base font-bold">
              Traditional Cash Flow
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={6} className="border border-gray-200 px-4 py-2 text-left">
              CHARLES EVANS - individual
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={6} className="border border-gray-200 px-4 py-2 text-left">
              CRE Portfolio: 950 PINER and 966 PINER
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2021</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2022</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2023</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2024</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">Source</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Taxable Interest</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$97</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Individual tax return Form 1040, 2b</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Social Security Benefits</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$17,814</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Individual tax return Form 1040, 6a</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Personal Income</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right font-medium">$17,911</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Net Income</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$140,644</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Individual tax return Form 1040, Schedule E, Part 1, Row 21, B + C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Mortgage Interest Expense</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$149,516</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Individual tax return Form 1040, Schedule E, Part 1, Row 12, B + C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Other Interest</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$1,775</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Individual tax return Form 1040, Schedule E, Part 1, Row 13, B + C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Depreciation Expense</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$43,043</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Individual tax return Form 1040, Schedule E, Part 1, Row 18, B + C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Total Cash Flow (Schedule E)</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right font-medium">$334,978</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
  
  // Render the Schedule E table
  const renderScheduleE = () => (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={5} className="border border-gray-200 px-4 py-2 text-left text-base font-bold">
              Schedule E
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={5} className="border border-gray-200 px-4 py-2 text-left">
              CHARLES EVANS - Individual
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead colSpan={5} className="border border-gray-200 px-4 py-2 text-left">
              CRE Portfolio: All others except 950 PINER and 966 PINER
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2021</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2022</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">12/31/2023</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">Source:</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">Tax Returns</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">Tax Returns</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-center font-medium">Tax Returns</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="border border-gray-200 h-6"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Rents Received</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right">$802,125</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-left text-gray-500 text-sm">Individual tax return Form 1040, Schedule E, Part 1, Row 3 A+B+C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2 font-medium">Total Income</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
            <TableCell className="border border-gray-200 px-4 py-2 text-right font-medium">$802,125</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  // Render the Rent Summary table
  const renderRentSummary = () => (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3} className="border border-gray-200 px-4 py-2 text-left text-base font-bold">
              Rent Summary
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">Property</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2">Square Footage</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2">Annual Rent</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">25109 Jefferson Ave</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2">30,854 SF</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2">$736,369</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">950 Piner Road</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2">15,200 SF</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2">$405,120</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border border-gray-200 px-4 py-2">966 Piner Road</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2">11,750 SF</TableCell>
            <TableCell className="border border-gray-200 px-4 py-2">$233,520</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );

  // Decide which statement to render based on statementType
  const renderStatementView = () => {
    switch (statementType) {
      case 'noistmt':
        return renderNOIStatement();
      case 'pfs':
        return renderPFS();
      case 'tradcashflow':
        return renderTraditionalCashFlow();
      case 'schedulee':
        return renderScheduleE();
      case 'rentsummary':
        return renderRentSummary();
      default:
        return renderNOIStatement();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Financial Spreads</h2>
          <div className="flex space-x-2">
            <ToggleViewButton
              active={activeView === 'simplified'}
              onClick={() => setActiveView('simplified')}
              icon={<BarChart3 size={16} />}
              label="Simplified"
            />
            <ToggleViewButton
              active={activeView === 'detailed'}
              onClick={() => setActiveView('detailed')}
              icon={<FileText size={16} />}
              label="Statement View"
            />
          </div>
        </div>

        <Tabs defaultValue="ratios" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="ratios">Key Ratios</TabsTrigger>
            <TabsTrigger value="statements">Statement Details</TabsTrigger>
            <TabsTrigger value="source">Source Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="ratios">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {financialRatios.map((ratio, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{ratio.name}</h3>
                      {ratio.description && (
                        <p className="text-sm text-gray-500 mt-1">{ratio.description}</p>
                      )}
                    </div>
                    <span className="text-xl font-bold text-[#20703F]">{ratio.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statements">
            {activeView === 'simplified' ? (
              <div className="grid grid-cols-1 gap-4">
                {sourceDocuments.map((doc) => (
                  <div key={doc.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-800">{doc.name}</h3>
                      <span className="text-sm text-gray-500">PDF</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {doc.extractedData.slice(0, 6).map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-medium">{typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : item.value}</span>
                        </div>
                      ))}
                    </div>
                    {doc.extractedData.length > 6 && (
                      <button 
                        onClick={() => handleStatementClick(doc)}
                        className="mt-3 text-[#20703F] text-sm font-medium flex items-center"
                      >
                        View all {doc.extractedData.length} entries
                        <ChevronDown size={14} className="ml-1" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4">
                <Select value={statementType} onValueChange={(value: any) => setStatementType(value)}>
                  <SelectTrigger className="w-full sm:w-[220px] mb-4">
                    <SelectValue placeholder="Select Statement Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {statementTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center">
                          <span className="mr-2">{type.icon}</span>
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                  {renderStatementView()}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="source">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-800 mb-2">{currentSourceDocument.name}</h3>
                <img 
                  src={currentSourceDocument.imageUrl} 
                  alt="Document Preview" 
                  className="w-full h-auto object-cover rounded border border-gray-200 mb-3"
                />
                <p className="text-sm text-gray-500">
                  PDF document with {currentSourceDocument.extractedData.length} extracted data points.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-800 mb-2">Extracted Data</h3>
                <div className="max-h-[400px] overflow-y-auto pr-2">
                  <div className="space-y-2">
                    {currentSourceDocument.extractedData.map((item, index) => (
                      <div key={index} className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-700">{item.label}</span>
                        <span className="font-medium">{typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SpreadView;
