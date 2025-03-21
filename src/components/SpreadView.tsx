
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronDown, FileText, Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface Spread {
  label: string;
  value: string | number;
  source: string;
}

interface SourceDocument {
  id: string;
  name: string;
  url?: string;
}

interface SpreadViewProps {
  spreads: Spread[];
}

const SpreadView: React.FC<SpreadViewProps> = ({ spreads }) => {
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [sourceDocuments, setSourceDocuments] = useState<SourceDocument[]>([
    { id: '1', name: 'Financial Statement.pdf', url: '#' },
    { id: '2', name: 'Balance Sheet Q2.pdf', url: '#' },
    { id: '3', name: 'Profit & Loss 2023.pdf', url: '#' },
  ]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const handleSpreadClick = (spread: Spread) => {
    setSelectedSpread(spread);
    // Set the source document based on the spread's source
    const sourceDoc = sourceDocuments.find(doc => doc.name === spread.source);
    if (sourceDoc) {
      setSelectedDocument(sourceDoc.id);
    }
  };

  const handleDocumentSelect = (docId: string) => {
    setSelectedDocument(docId);
    toast.info(`Viewing document: ${sourceDocuments.find(doc => doc.id === docId)?.name}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-full mx-auto">
      {/* Financial Spreads - Now 8 columns instead of 6 */}
      <div className="lg:col-span-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Financial Spreads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Label</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Value</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {spreads.map((spread, index) => (
                    <tr 
                      key={index} 
                      className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${selectedSpread?.label === spread.label ? 'bg-gray-50' : ''}`}
                      onClick={() => handleSpreadClick(spread)}
                    >
                      <td className="py-3 px-4 text-sm">{spread.label}</td>
                      <td className="py-3 px-4 text-sm text-right">
                        {typeof spread.value === 'number' ? 
                          (spread.label.toLowerCase().includes('ratio') ? 
                            spread.value : 
                            `$${spread.value.toLocaleString()}`) : 
                          spread.value}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-gray-500 flex justify-end items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                              <FileText size={14} />
                              <span className="hidden md:inline">{spread.source}</span>
                              <ChevronDown size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {sourceDocuments.map(doc => (
                              <DropdownMenuItem 
                                key={doc.id}
                                onClick={() => handleDocumentSelect(doc.id)}
                              >
                                {doc.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Source Document */}
      <div className="lg:col-span-4">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Source Documents</CardTitle>
              <Select
                value={selectedDocument || ''}
                onValueChange={handleDocumentSelect}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select document" />
                </SelectTrigger>
                <SelectContent>
                  {sourceDocuments.map(doc => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {selectedDocument ? (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-[#a29f95] mr-2" />
                    <span className="font-medium">
                      {sourceDocuments.find(doc => doc.id === selectedDocument)?.name || 'Document'}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus size={14} className="mr-1" />
                    View Full
                  </Button>
                </div>
                
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-white p-6">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Document preview would appear here</p>
                    <p className="text-xs text-gray-400 mt-1">Click "View Full" to open the document</p>
                  </div>
                </div>
                
                {selectedSpread && (
                  <div className="mt-4 bg-white p-3 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium mb-2">Referenced Data Point:</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{selectedSpread.label}:</span>
                      <span className="font-medium">
                        {typeof selectedSpread.value === 'number' ? 
                          (selectedSpread.label.toLowerCase().includes('ratio') ? 
                            selectedSpread.value : 
                            `$${selectedSpread.value.toLocaleString()}`) : 
                          selectedSpread.value}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Select a spread or document to view details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpreadView;
