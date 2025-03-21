
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, Plus, BarChart } from 'lucide-react';

interface SpreadItem {
  label: string;
  value: number | string;
  source?: string;
}

interface SpreadViewProps {
  spreads: SpreadItem[];
}

const SpreadView: React.FC<SpreadViewProps> = ({ spreads }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Financial Analysis</h2>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm" variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-[#20703F] hover:bg-[#155e32] text-white flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Spread
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="financials">
        <TabsList className="mb-4">
          <TabsTrigger value="financials">Financial Statements</TabsTrigger>
          <TabsTrigger value="ratios">Financial Ratios</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financials">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-medium text-[#20703F]">Income Statement</h3>
                <div className="space-y-2">
                  {spreads.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        {item.label}
                        {item.source && (
                          <span className="text-xs text-gray-400 ml-1">
                            ({item.source})
                          </span>
                        )}
                      </span>
                      <span className="font-medium text-[#20703F]">
                        {typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-[#20703F]">Balance Sheet</h3>
                <div className="space-y-2">
                  {spreads.slice(3, 5).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        {item.label}
                        {item.source && (
                          <span className="text-xs text-gray-400 ml-1">
                            ({item.source})
                          </span>
                        )}
                      </span>
                      <span className="font-medium text-[#20703F]">
                        {typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-[#20703F]">Ratio Analysis</h3>
                <div className="space-y-2">
                  {spreads.slice(5).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        {item.label}
                        {item.source && (
                          <span className="text-xs text-gray-400 ml-1">
                            ({item.source})
                          </span>
                        )}
                      </span>
                      <span className="font-medium text-[#20703F]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t">
              <Button className="bg-[#20703F] hover:bg-[#155e32] text-white">
                <BarChart className="h-4 w-4 mr-2" />
                Generate Analysis Report
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="ratios">
          <Card className="p-6">
            <p className="text-center text-gray-500">Financial ratio analysis will be displayed here.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="cashflow">
          <Card className="p-6">
            <p className="text-center text-gray-500">Cash flow analysis will be displayed here.</p>
          </Card>
        </TabsContent>
        
        <TabsContent value="projections">
          <Card className="p-6">
            <p className="text-center text-gray-500">Financial projections will be displayed here.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpreadView;
