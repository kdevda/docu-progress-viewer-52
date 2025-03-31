
import React, { useState } from 'react';
import { FileText, Table as TableIcon, BarChart3, CreditCard, DollarSign, Building, LineChart } from 'lucide-react';
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
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [statementType, setStatementType] = useState<'operating' | 'balance' | 'cashflow' | 'debtService' | 'propertyAnalysis' | 'rentRoll' | 'noistmt' | 'pfs' | 'tradcashflow' | 'schedulee'>('noistmt');
  const [selectedSourceDoc, setSelectedSourceDoc] = useState<string>("doc1");
  
  // Sample ratios data for simplified view
  const ratiosData = [
    { name: 'Simple Cash Flow Coverage', y2023: '1.78x', y2022: '1.65x', y2021: '1.55x' },
    { name: 'Excess Cash Flow', y2023: '$73,890', y2022: '$65,325', y2021: '$59,457' },
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

  // Sample data for NOI Statement
  const noiStatementData = [
    { name: 'Income', y2023: '$233,520', y2022: '$225,600', y2021: '$217,500' },
    { name: 'PGI', y2023: '$233,520', y2022: '$225,600', y2021: '$217,500' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'PGI', y2023: '$233,520', y2022: '$225,600', y2021: '$217,500' },
    { name: 'Vacancy Percentage', y2023: '0.00%', y2022: '2.50%', y2021: '5.00%' },
    { name: 'Total Vacancy Amount', y2023: '$0', y2022: '$5,640', y2021: '$10,875' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'PGI', y2023: '$233,520', y2022: '$225,600', y2021: '$217,500' },
    { name: 'Total Vacancy Amount', y2023: '$0', y2022: '$5,640', y2021: '$10,875' },
    { name: 'Effective Gross income', y2023: '$233,520', y2022: '$219,960', y2021: '$206,625' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Repairs & Maintenance', y2023: '$3,272', y2022: '$3,100', y2021: '$2,950' },
    { name: 'Insurance', y2023: '$10,586', y2022: '$9,875', y2021: '$9,325' },
    { name: 'Property Taxes', y2023: '$17,166', y2022: '$16,500', y2021: '$15,950' },
    { name: 'Utilities', y2023: '$5,386', y2022: '$5,200', y2021: '$4,950' },
    { name: 'Management Fees', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Reserves', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Other expenses', y2023: '$9,395', y2022: '$8,975', y2021: '$8,525' },
    { name: 'Total Operating Expenses', y2023: '$45,805', y2022: '$43,650', y2021: '$41,700' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Effective Gross Income', y2023: '$233,520', y2022: '$219,960', y2021: '$206,625' },
    { name: 'Total Operating expense', y2023: '$45,805', y2022: '$43,650', y2021: '$41,700' },
    { name: 'Net Operating Income', y2023: '$187,715', y2022: '$176,310', y2021: '$164,925' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Net Operating Income', y2023: '$187,715', y2022: '$176,310', y2021: '$164,925' },
    { name: 'Debt Service', y2023: '$117,454', y2022: '$117,454', y2021: '$117,454' },
    { name: 'Excess Cash Flow', y2023: '$70,261', y2022: '$58,856', y2021: '$47,471' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Net Operating Income', y2023: '$187,715', y2022: '$176,310', y2021: '$164,925' },
    { name: 'Debt Service', y2023: '$117,454', y2022: '$117,454', y2021: '$117,454' },
    { name: 'DSCR', y2023: '1.60', y2022: '1.50', y2021: '1.40' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Net Operating Income', y2023: '$187,715', y2022: '$176,310', y2021: '$164,925' },
    { name: 'Cap Rate', y2023: '6.50%', y2022: '6.50%', y2021: '6.50%' },
    { name: 'Estimated Value', y2023: '$2,887,923', y2022: '$2,712,462', y2021: '$2,537,308' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Requested Loan Amount', y2023: '$1,904,762', y2022: '$1,904,762', y2021: '$1,904,762' },
    { name: 'Estimated Value', y2023: '$2,887,923', y2022: '$2,712,462', y2021: '$2,537,308' },
    { name: 'Loan to Value', y2023: '65.96%', y2022: '70.22%', y2021: '75.07%' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Estimated Value', y2023: '$2,887,923', y2022: '$2,712,462', y2021: '$2,537,308' },
    { name: 'Policy Loan to Value', y2023: '75.00%', y2022: '75.00%', y2021: '75.00%' },
    { name: 'Max Loan @ Policy LTV', y2023: '$2,165,942', y2022: '$2,034,346', y2021: '$1,902,981' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'NOI', y2023: '$187,715', y2022: '$176,310', y2021: '$164,925' },
    { name: 'Policy DSCR', y2023: '1.20', y2022: '1.20', y2021: '1.20' },
    { name: 'Max Annual Payment @ Policy DSCR', y2023: '$156,429', y2022: '$146,925', y2021: '$137,437' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Max Loan @ Policy DSCR', y2023: '$1,932,525', y2022: '$1,815,050', y2021: '$1,697,574' },
    { name: 'Max Loan @ Policy LTV', y2023: '$2,165,942', y2022: '$2,034,346', y2021: '$1,902,981' },
  ];

  // Sample data for PFS Statement
  const pfsData = [
    { name: 'Cash - checking accounts', y2023: '$185,000', y2022: '$165,000', y2021: '$150,000' },
    { name: 'Liquid Assets', y2023: '$325,000', y2022: '$290,000', y2021: '$275,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Notes & Contracts receivable', y2023: '$75,000', y2022: '$60,000', y2021: '$45,000' },
    { name: 'Personal Property (autos, jewelry etc.)', y2023: '$180,000', y2022: '$160,000', y2021: '$145,000' },
    { name: 'Real Estate (market value)', y2023: '$850,000', y2022: '$800,000', y2021: '$750,000' },
    { name: 'Investment Real Estate', y2023: '$4,250,000', y2022: '$3,975,000', y2021: '$3,750,000' },
    { name: 'Value Closely Held Business Entity', y2023: '$1,200,000', y2022: '$1,100,000', y2021: '$975,000' },
    { name: 'Total', y2023: '$6,555,000', y2022: '$6,095,000', y2021: '$5,665,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Total Assets', y2023: '$6,880,000', y2022: '$6,385,000', y2021: '$5,940,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Real Estate Mortgages', y2023: '$595,000', y2022: '$615,000', y2021: '$635,000' },
    { name: 'Investment Real Estate Debt', y2023: '$2,650,000', y2022: '$2,725,000', y2021: '$2,800,000' },
    { name: 'Total Liabilities', y2023: '$3,245,000', y2022: '$3,340,000', y2021: '$3,435,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Total Stated Net Worth (subT)', y2023: '$3,635,000', y2022: '$3,045,000', y2021: '$2,505,000' },
  ];

  // Sample data for Traditional Cash Flow Statement
  const tradCashFlowData = [
    { name: 'Taxable Interest', y2023: '$12,500', y2022: '$11,250', y2021: '$10,750' },
    { name: 'Social Security Benefits', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Personal Income', y2023: '$275,000', y2022: '$255,000', y2021: '$235,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Net Income', y2023: '$95,000', y2022: '$87,500', y2021: '$82,500' },
    { name: 'Interest (paid to banks. etc.)', y2023: '$12,500', y2022: '$13,250', y2021: '$14,000' },
    { name: 'Other Interest', y2023: '$5,500', y2022: '$5,250', y2021: '$5,000' },
    { name: 'Depreciation Expense', y2023: '$28,500', y2022: '$27,250', y2021: '$26,000' },
    { name: 'Depreciation in COGS', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Amortization', y2023: '$7,500', y2022: '$7,250', y2021: '$7,000' },
    { name: 'Total Cash Flow (Schedule C)', y2023: '$149,000', y2022: '$140,500', y2021: '$134,500' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Net Income', y2023: '$132,500', y2022: '$125,000', y2021: '$117,500' },
    { name: 'Mortgage Interest Expense', y2023: '$110,000', y2022: '$112,500', y2021: '$115,000' },
    { name: 'Other Interest', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Depreciation Expense', y2023: '$98,500', y2022: '$95,000', y2021: '$92,500' },
    { name: 'Amortization', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Total Cash Flow (Schedule E)', y2023: '$341,000', y2022: '$332,500', y2021: '$325,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Net Income', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Interest (paid to banks. etc.)', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Other Interest', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Depreciation Expense', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Amortization', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Total Cash Flow (Schedule F)', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Itemized Deductions', y2023: '$45,000', y2022: '$42,500', y2021: '$40,000' },
    { name: 'Income Tax Expense', y2023: '$105,000', y2022: '$97,500', y2021: '$90,000' },
    { name: 'Total Deductions', y2023: '$150,000', y2022: '$140,000', y2021: '$130,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Living Expenses', y2023: '$110,000', y2022: '$105,000', y2021: '$100,000' },
    { name: 'Total Adjustments to CF', y2023: '$110,000', y2022: '$105,000', y2021: '$100,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Personal Income', y2023: '$275,000', y2022: '$255,000', y2021: '$235,000' },
    { name: 'Schedule C Income', y2023: '$95,000', y2022: '$87,500', y2021: '$82,500' },
    { name: 'Schedule C Adjustments', y2023: '$54,000', y2022: '$53,000', y2021: '$52,000' },
    { name: 'Schedule E Income', y2023: '$132,500', y2022: '$125,000', y2021: '$117,500' },
    { name: 'Schedule F Income', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Schedule K-1 Income', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: '(Total Deductions)', y2023: '($150,000)', y2022: '($140,000)', y2021: '($130,000)' },
    { name: '(Total Adjustments)', y2023: '($110,000)', y2022: '($105,000)', y2021: '($100,000)' },
    { name: 'Gross Cash Flow (subT)', y2023: '$296,500', y2022: '$275,500', y2021: '$257,000' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Debt Service from Schedule', y2023: '$175,417', y2022: '$175,417', y2021: '$175,417' },
    { name: 'Total Debt Service', y2023: '$175,417', y2022: '$175,417', y2021: '$175,417' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Total Net Cash Flow', y2023: '$121,083', y2022: '$100,083', y2021: '$81,583' },
  ];

  // Sample data for Schedule E
  const scheduleEData = [
    { name: 'Rents Received', y2023: '$233,520', y2022: '$219,960', y2021: '$206,625' },
    { name: 'Total Income', y2023: '$233,520', y2022: '$219,960', y2021: '$206,625' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Advertising', y2023: '$1,250', y2022: '$1,150', y2021: '$1,050' },
    { name: 'Auto and Travel', y2023: '$2,500', y2022: '$2,350', y2021: '$2,200' },
    { name: 'Cleaning and Maintenance', y2023: '$3,272', y2022: '$3,100', y2021: '$2,950' },
    { name: 'Commissions', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Insurance', y2023: '$10,586', y2022: '$9,875', y2021: '$9,325' },
    { name: 'Legal and Other Professional Fees', y2023: '$3,500', y2022: '$3,250', y2021: '$3,000' },
    { name: 'Management Fees', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Mortgage Interest Paid to Banks, etc.', y2023: '$110,000', y2022: '$112,500', y2021: '$115,000' },
    { name: 'Other Interest', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Repairs', y2023: '$8,500', y2022: '$7,950', y2021: '$7,500' },
    { name: 'Supplies', y2023: '$1,850', y2022: '$1,725', y2021: '$1,625' },
    { name: 'Taxes', y2023: '$17,166', y2022: '$16,500', y2021: '$15,950' },
    { name: 'Utilities', y2023: '$5,386', y2022: '$5,200', y2021: '$4,950' },
    { name: 'Depreciation Expense or Depletion', y2023: '$98,500', y2022: '$95,000', y2021: '$92,500' },
    { name: 'Amortization', y2023: '$0', y2022: '$0', y2021: '$0' },
    { name: 'Other Expenses', y2023: '$4,045', y2022: '$3,875', y2021: '$3,675' },
    { name: 'Total Expenses', y2023: '$266,555', y2022: '$262,475', y2021: '$259,725' },
    { name: '', y2023: '', y2022: '', y2021: '' },
    { name: 'Net Income/(Loss)', y2023: '($33,035)', y2022: '($42,515)', y2021: '($53,100)' },
    { name: 'Net Income/(Loss)', y2023: '($33,035)', y2022: '($42,515)', y2021: '($53,100)' },
  ];

  // Sample data for Rent Roll
  const rentRollData = [
    { tenant: 'Fairway Cabinets, Inc', unit: '950 Piner', sqft: 15000, pctSqft: '36.76%', rent: '$17,500', rentSq: '$1.17', leaseStart: '3/1/2020', leaseEnd: '2/28/2025', exitOption: 'None', leaseDocs: 'On File', pctRent: '37.67%' },
    { tenant: 'E Squared Electric', unit: '950 Piner', sqft: 3000, pctSqft: '7.35%', rent: '$2,700', rentSq: '$0.90', leaseStart: '5/1/2021', leaseEnd: '4/30/2024', exitOption: 'None', leaseDocs: 'On File', pctRent: '3.58%' },
    { tenant: 'Jarrett', unit: '950 Piner', sqft: 2000, pctSqft: '4.90%', rent: '$2,500', rentSq: '$1.25', leaseStart: '6/15/2022', leaseEnd: '6/14/2025', exitOption: 'None', leaseDocs: 'On File', pctRent: '3.44%' },
    { tenant: 'John Wilson J&J Autobody', unit: '966 Piner', sqft: 10000, pctSqft: '24.51%', rent: '$12,500', rentSq: '$1.25', leaseStart: '1/1/2021', leaseEnd: '12/31/2025', exitOption: 'None', leaseDocs: 'On File', pctRent: '17.81%' },
    { tenant: 'Nestor Auto Repair', unit: '966 Piner', sqft: 2500, pctSqft: '6.13%', rent: '$3,000', rentSq: '$1.20', leaseStart: '8/1/2021', leaseEnd: '7/31/2024', exitOption: 'None', leaseDocs: 'On File', pctRent: '5.20%' },
    { tenant: 'Nebel Plumbing', unit: '966 Piner', sqft: 2500, pctSqft: '6.13%', rent: '$2,500', rentSq: '$1.00', leaseStart: '9/1/2021', leaseEnd: '8/31/2024', exitOption: 'None', leaseDocs: 'On File', pctRent: '4.57%' },
    { tenant: 'Higday', unit: '966 Piner', sqft: 3300, pctSqft: '8.09%', rent: '$2,750', rentSq: '$0.83', leaseStart: '4/1/2022', leaseEnd: '3/31/2025', exitOption: 'None', leaseDocs: 'On File', pctRent: '5.27%' },
    { tenant: 'Romero Auto Repair', unit: '966 Piner', sqft: 2500, pctSqft: '6.13%', rent: '$3,000', rentSq: '$1.20', leaseStart: '10/1/2022', leaseEnd: '9/30/2025', exitOption: 'None', leaseDocs: 'On File', pctRent: '6.07%' },
    { tenant: 'Total', unit: '', sqft: 40800, pctSqft: '100%', rent: '$46,450', rentSq: '', leaseStart: '', leaseEnd: '', exitOption: '', leaseDocs: '', pctRent: '' },
  ];

  // Sample source documents
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

  const currentSourceDocument = sourceDocuments.find(doc => doc.id === selectedSourceDoc) || sourceDocuments[0];

  const handleStatementClick = (rowData: any) => {
    // In a real app, this would navigate to the source document
    const randomDocIndex = Math.floor(Math.random() * sourceDocuments.length);
    setSelectedSourceDoc(sourceDocuments[randomDocIndex].id);
  };

  // Get the appropriate data based on statement type
  const getStatementData = () => {
    switch (statementType) {
      case 'noistmt':
        return noiStatementData;
      case 'pfs':
        return pfsData;
      case 'tradcashflow':
        return tradCashFlowData;
      case 'schedulee':
        return scheduleEData;
      default:
        return [];
    }
  };

  // Function to render empty space for separator rows
  const isEmptyRow = (item: any) => item.name === '' && item.y2023 === '' && item.y2022 === '' && item.y2021 === '';

  const renderSourceDocument = () => {
    return (
      <Card className="h-full">
        <CardHeader className="py-3 px-4 border-b">
          <CardTitle className="text-sm font-semibold">Source Document</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold mb-1">Document Name</h3>
              <p className="text-sm">{currentSourceDocument.name}</p>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold mb-1">Document Preview</h3>
              <div className="border rounded-md overflow-hidden">
                <img 
                  src={currentSourceDocument.imageUrl} 
                  alt="Document Preview" 
                  className="w-full h-40 object-cover object-top"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold mb-1">Extracted Data</h3>
              <div className="border rounded-md p-3 bg-gray-50 max-h-[300px] overflow-y-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-1.5 font-medium">Label</th>
                      <th className="text-right pb-1.5 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSourceDocument.extractedData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="py-1.5">{item.label}</td>
                        <td className="py-1.5 text-right">{typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
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
        {activeView === 'simplified' ? (
          <div className="w-full pr-2 overflow-auto space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Ratios</h3>
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
              <h3 className="text-sm font-medium mb-2">Global Cash Flow</h3>
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
          </div>
        ) : (
          <ResizablePanelGroup direction="horizontal" className="w-full h-full rounded-lg border">
            <ResizablePanel defaultSize={66} minSize={40} className="p-3 overflow-auto">
              <h3 className="text-sm font-medium mb-3">
                {statementTypes.find(type => type.id === statementType)?.label || 'Financial Statement'}
              </h3>
              
              {statementType === 'rentRoll' ? (
                <div className="overflow-x-auto">
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Tenant</TableHead>
                        <TableHead className="font-semibold">Unit #</TableHead>
                        <TableHead className="text-right font-semibold">Sq Ft</TableHead>
                        <TableHead className="text-right font-semibold">% SqFt</TableHead>
                        <TableHead className="text-right font-semibold">Rent</TableHead>
                        <TableHead className="text-right font-semibold">Rent/sq</TableHead>
                        <TableHead className="font-semibold">Lease Start</TableHead>
                        <TableHead className="font-semibold">Lease End</TableHead>
                        <TableHead className="font-semibold">Exit Option</TableHead>
                        <TableHead className="font-semibold">Lease Docs</TableHead>
                        <TableHead className="text-right font-semibold">% Rent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rentRollData.map((item, index) => (
                        <TableRow 
                          key={index} 
                          className={cn(
                            "hover:bg-gray-50 cursor-pointer",
                            item.tenant === 'Total' ? "font-semibold bg-gray-50" : ""
                          )}
                          onClick={() => handleStatementClick(item)}
                        >
                          <TableCell className="py-1.5">{item.tenant}</TableCell>
                          <TableCell className="py-1.5">{item.unit}</TableCell>
                          <TableCell className="py-1.5 text-right">{item.sqft.toLocaleString()}</TableCell>
                          <TableCell className="py-1.5 text-right">{item.pctSqft}</TableCell>
                          <TableCell className="py-1.5 text-right">{item.rent}</TableCell>
                          <TableCell className="py-1.5 text-right">{item.rentSq}</TableCell>
                          <TableCell className="py-1.5">{item.leaseStart}</TableCell>
                          <TableCell className="py-1.5">{item.leaseEnd}</TableCell>
                          <TableCell className="py-1.5">{item.exitOption}</TableCell>
                          <TableCell className="py-1.5">{item.leaseDocs}</TableCell>
                          <TableCell className="py-1.5 text-right">{item.pctRent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="text-xs">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-2/5 font-semibold py-1.5">Item</TableHead>
                        <TableHead className="text-right font-semibold py-1.5">2023</TableHead>
                        <TableHead className="text-right font-semibold py-1.5">2022</TableHead>
                        <TableHead className="text-right font-semibold py-1.5">2021</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getStatementData().map((item, index) => (
                        <TableRow 
                          key={index} 
                          className={cn(
                            "hover:bg-gray-50 cursor-pointer",
                            isEmptyRow(item) ? "h-2 bg-gray-50" : "",
                            item.name.includes('Total') || item.name.includes('subT') ? "font-semibold bg-gray-50" : ""
                          )}
                          onClick={() => handleStatementClick(item)}
                        >
                          {isEmptyRow(item) ? (
                            <TableCell colSpan={4} className="h-2 bg-gray-50"></TableCell>
                          ) : (
                            <>
                              <TableCell className={cn(
                                "py-1.5",
                                item.name.includes('Total') || item.name.includes('subT') ? "font-semibold" : ""
                              )}>
                                {item.name}
                              </TableCell>
                              <TableCell className="text-right text-blue-600 py-1.5">{item.y2023}</TableCell>
                              <TableCell className="text-right text-blue-600 py-1.5">{item.y2022}</TableCell>
                              <TableCell className="text-right text-blue-600 py-1.5">{item.y2021}</TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={34} minSize={25} className="bg-gray-50">
              {renderSourceDocument()}
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default SpreadView;
