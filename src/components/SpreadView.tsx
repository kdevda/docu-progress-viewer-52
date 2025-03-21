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
  const [statementType, setStatementType] = useState<'operating' | 'balance' | 'cashflow' | 'debtService' | 'propertyAnalysis' | 'rentRoll'>('operating');
  const [selectedSourceDoc, setSelectedSourceDoc] = useState<string>("doc1");
  
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

  const currentSourceDocument = sourceDocuments.find(doc => doc.id === selectedSourceDoc) || sourceDocuments[0];

  const handleStatementClick = (rowData: any) => {
    const
