
import React from 'react';
import { FileText } from 'lucide-react';

interface SpreadItem {
  label: string;
  value: string | number;
  source: string;
}

interface SpreadViewProps {
  spreads: SpreadItem[];
}

const SpreadView: React.FC<SpreadViewProps> = ({ spreads }) => {
  return (
    <div className="flex h-full">
      {/* Left side - financial spreads */}
      <div className="w-1/2 p-4 overflow-auto border-r border-gray-200">
        <h3 className="text-lg font-medium mb-4">Financial Spreads</h3>
        <div className="space-y-4">
          {spreads.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500">{item.label}</div>
              <div className="text-lg font-medium">{typeof item.value === 'number' ? 
                `$${item.value.toLocaleString()}` : item.value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side - source documents */}
      <div className="w-1/2 p-4 overflow-auto">
        <h3 className="text-lg font-medium mb-4">Source Documents</h3>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 mr-2 text-nano-blue" />
            <span className="font-medium">Financial Statement.pdf</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-md text-sm border border-gray-200">
            <p className="mb-2 text-gray-600">Extracted data from page 4:</p>
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
  );
};

export default SpreadView;
