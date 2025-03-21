import React, { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProgressTracker, { ApplicationStage } from "@/components/ProgressTracker";
import DocumentUpload from "@/components/DocumentUpload";
import SpreadView from "@/components/SpreadView";
import MemoView from "@/components/MemoView";
import { 
  FileText, 
  MessageSquarePlus, 
  Search, 
  User, 
  Info, 
  Plus, 
  Upload, 
  FileSpreadsheet, 
  FileText as FileTextIcon,
  PanelRight,
  UploadCloud,
  MessageCircle,
  Building2,
  Calendar,
  DollarSign,
  ClipboardList,
  FileUp
} from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
};

type Document = {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
};

type Client = {
  id: string;
  name: string;
  dealId: string;
  email: string;
  loanAmount: number;
  recentChat?: {
    preview: string;
    timestamp: Date;
  };
  details: {
    email: string;
    phone: string;
    address: string;
    loanAmount: number;
    loanType: string;
    propertyValue: number;
    creditScore: number;
    propertyType?: string;
    loanTerm?: number;
    interestRate?: number;
    ltv?: number;
    noi?: number;
    capRate?: number;
    dscr?: number;
  };
};

type ViewMode = 'documents' | 'spreads' | 'memo' | 'chat' | 'pre-screen' | 'loi';

const suggestionMessages = [
  "Upload completed application to start new deal",
  "Request financial statements for underwriting",
  "Schedule property inspection for next week",
  "Need additional information on borrower credit history",
  "Share latest term sheet with the client"
];

const Agent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! How can I help you today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [clients, setClients] = useState<Client[]>([
    {
      id: '119323096298',
      name: 'Harry Clare',
      dealId: '119323096298',
      email: 'harry@example.com',
      loanAmount: 320000,
      recentChat: {
        preview: 'Need to submit additional documents for my application',
        timestamp: new Date()
      },
      details: {
        email: 'harry@example.com',
        phone: '(555) 123-4567',
        address: '1234 Maple St, Anytown, CA 90210',
        loanAmount: 320000,
        loanType: 'Conventional 30-year fixed',
        propertyValue: 400000,
        creditScore: 720,
        propertyType: 'Retail Shopping Center',
        loanTerm: 30,
        interestRate: 5.25,
        ltv: 80,
        noi: 45000,
        capRate: 5.8,
        dscr: 1.25
      }
    },
    {
      id: '119323096299',
      name: 'James Hallacy',
      dealId: '119323096299',
      email: 'james@uptig.ai',
      loanAmount: 450000,
      recentChat: {
        preview: 'Question about interest rate lock',
        timestamp: new Date()
      },
      details: {
        email: 'james@uptig.ai',
        phone: '(555) 987-6543',
        address: '567 Oak Dr, Somewhere, CA 92101',
        loanAmount: 450000,
        loanType: 'FHA 30-year fixed',
        propertyValue: 500000,
        creditScore: 680,
        propertyType: 'Office Building',
        loanTerm: 25,
        interestRate: 4.75,
        ltv: 75,
        noi: 62000,
        capRate: 6.2,
        dscr: 1.35
      }
    },
    {
      id: '119323096300',
      name: 'Sarah Johnson',
      dealId: '119323096300',
      email: 'sarah.j@example.com',
      loanAmount: 750000,
      recentChat: {
        preview: 'Reviewing the terms of the loan',
        timestamp: new Date()
      },
      details: {
        email: 'sarah.j@example.com',
        phone: '(555) 234-5678',
        address: '789 Pine Ave, Somewhere, CA 92102',
        loanAmount: 750000,
        loanType: 'Commercial Bridge Loan',
        propertyValue: 1000000,
        creditScore: 745,
        propertyType: 'Mixed-Use Development',
        loanTerm: 10,
        interestRate: 6.25,
        ltv: 75,
        noi: 95000,
        capRate: 7.1,
        dscr: 1.4
      }
    },
    {
      id: '119323096301',
      name: 'Michael Rodriguez',
      dealId: '119323096301',
      email: 'michael.r@example.com',
      loanAmount: 1250000,
      recentChat: {
        preview: 'Preparing for closing next month',
        timestamp: new Date()
      },
      details: {
        email: 'michael.r@example.com',
        phone: '(555) 345-6789',
        address: '101 Cedar Blvd, Anytown, CA 90211',
        loanAmount: 1250000,
        loanType: 'Commercial Mortgage',
        propertyValue: 1800000,
        creditScore: 780,
        propertyType: 'Industrial Warehouse',
        loanTerm: 20,
        interestRate: 5.5,
        ltv: 70,
        noi: 175000,
        capRate: 8.2,
        dscr: 1.65
      }
    },
    {
      id: '119323096302',
      name: 'Jennifer Lee',
      dealId: '119323096302',
      email: 'jennifer.l@example.com',
      loanAmount: 525000,
      recentChat: {
        preview: 'Submitted updated financial statements',
        timestamp: new Date()
      },
      details: {
        email: 'jennifer.l@example.com',
        phone: '(555) 456-7890',
        address: '202 Elm St, Somewhere, CA 92103',
        loanAmount: 525000,
        loanType: 'SBA 504 Loan',
        propertyValue: 650000,
        creditScore: 710,
        propertyType: 'Retail Strip Center',
        loanTerm: 25,
        interestRate: 5.0,
        ltv: 80,
        noi: 65000,
        capRate: 6.5,
        dscr: 1.3
      }
    }
  ]);
  
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[1]);
  const [currentStage, setCurrentStage] = useState<'application' | 'pre-flight' | 'loi' | 'underwriting'>('underwriting');
  const [viewMode, setViewMode] = useState<ViewMode>('spreads');
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [memoUrl, setMemoUrl] = useState<string | undefined>("/Credit Memo.pdf");
  const [preScreenUrl, setPreScreenUrl] = useState<string | undefined>("/Pre-Screen Summary.pdf");
  const [loiUrl, setLoiUrl] = useState<string | undefined>("/LOI.pdf");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoUrl, setLogoUrl] = useState<string>("/lovable-uploads/da4cffd1-9a5a-4e34-bbfd-377882856f5c.png");
  const [documentInputRef] = useState<React.RefObject<HTMLInputElement>>(React.createRef());
  const [waitingForApplicationUpload, setWaitingForApplicationUpload] = useState(false);

  const financialSpreads = [
    { label: 'Annual Revenue', value: 1250000, source: 'Financial Statement.pdf' },
    { label: 'Operating Expenses', value: 750000, source: 'Financial Statement.pdf' },
    { label: 'Net Income', value: 500000, source: 'Financial Statement.pdf' },
    { label: 'Total Assets', value: 3750000, source: 'Financial Statement.pdf' },
    { label: 'Total Liabilities', value: 2250000, source: 'Financial Statement.pdf' },
    { label: 'Debt-to-Income Ratio', value: '0.60', source: 'Financial Statement.pdf' },
  ];

  useEffect(() => {
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    if (newMessage.toLowerCase().includes("upload") && newMessage.toLowerCase().includes("application")) {
      setWaitingForApplicationUpload(true);
      
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "Please upload your completed application document. You can drag and drop the file below or click to browse.",
          sender: 'agent',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    } else {
      setTimeout(() => {
        let responseContent = "I'll help you with that. Let me check your application details.";
        
        if (newMessage.toLowerCase().includes("document") || newMessage.toLowerCase().includes("upload")) {
          responseContent = "You can upload documents directly using the document tab. Would you like me to guide you through the process?";
        } else if (newMessage.toLowerCase().includes("rate") || newMessage.toLowerCase().includes("interest")) {
          responseContent = "Current interest rates for commercial real estate loans are between 4.5% and 6.25% depending on the property type, loan term, and borrower creditworthiness. Would you like more specific information?";
        } else if (newMessage.toLowerCase().includes("timeline") || newMessage.toLowerCase().includes("process")) {
          responseContent = "Our typical processing timeline is 45-60 days from application to closing. We're currently in the underwriting phase for this deal, which usually takes 2-3 weeks.";
        }
        
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          sender: 'agent',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleUploadDocument = (file: File) => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date()
    };
    
    setDocuments(prev => [...prev, newDoc]);
    toast.success(`Document "${file.name}" uploaded successfully`);
    
    if (waitingForApplicationUpload) {
      setWaitingForApplicationUpload(false);
      
      const newClient: Client = {
        id: `KD-${Date.now()}`,
        name: 'KD',
        dealId: `KD-${Date.now()}`,
        email: 'kd@example.com',
        loanAmount: 500000,
        recentChat: {
          preview: 'Uploaded completed application',
          timestamp: new Date()
        },
        details: {
          email: 'kd@example.com',
          phone: '(555) 987-6543',
          address: '567 Oak Dr, Somewhere, CA 92101',
          loanAmount: 500000,
          loanType: 'Commercial Mortgage',
          propertyValue: 625000,
          creditScore: 740,
          propertyType: 'Office Building',
          loanTerm: 25,
          interestRate: 5.5,
          ltv: 80,
          noi: 75000,
          capRate: 7.2,
          dscr: 1.4
        }
      };
      
      setClients(prev => [newClient, ...prev]);
      setSelectedClient(newClient);
      
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "Thank you for your application! I've created a new deal for you. Please upload the financial documents for spreading and analysis.",
          sender: 'agent',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleNewChat = () => {
    setMessages([{
      id: Date.now().toString(),
      content: "Hi there! How can I help you today?",
      sender: 'agent',
      timestamp: new Date()
    }]);
    setSelectedClient(null);
    setCurrentStage('application');
    setViewMode('chat');
    setShowChat(true);
  };

  const handleMemoUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setMemoUrl(objectUrl);
    toast.success(`Memo "${file.name}" uploaded successfully`);
  };

  const handlePreScreenUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreScreenUrl(objectUrl);
    toast.success(`Pre-Screen document "${file.name}" uploaded successfully`);
  };

  const handleLoiUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setLoiUrl(objectUrl);
    toast.success(`LOI document "${file.name}" uploaded successfully`);
  };

  const handleStageClick = (stage: 'application' | 'pre-flight' | 'loi' | 'underwriting') => {
    setCurrentStage(stage);
    
    if (stage === 'application') {
      setViewMode('chat');
      setShowChat(true);
    } else if (stage === 'pre-flight') {
      setViewMode('pre-screen');
    } else if (stage === 'loi') {
      setViewMode('loi');
    } else if (stage === 'underwriting') {
      setViewMode('spreads');
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setLogoUrl(URL.createObjectURL(file));
      toast.success('Logo updated successfully');
    }
  };

  const triggerLogoUpload = () => {
    logoInputRef.current?.click();
  };

  const triggerDocumentUpload = () => {
    documentInputRef.current?.click();
  };

  const handleDocumentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleUploadDocument(event.target.files[0]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
    client.dealId.includes(clientSearchQuery)
  );

  const getAvailableViewModes = () => {
    switch (currentStage) {
      case 'application':
        return [{ value: 'chat', label: 'Chat', icon: <MessageSquarePlus size={16} /> }];
      case 'pre-flight':
        return [
          { value: 'documents', label: 'Documents', icon: <FileText size={16} /> },
          { value: 'pre-screen', label: 'Pre-Screen View', icon: <FileText size={16} /> },
          { value: 'spreads', label: 'Spreads', icon: <FileSpreadsheet size={16} /> },
          { value: 'chat', label: 'Chat', icon: <MessageSquarePlus size={16} /> }
        ];
      case 'loi':
        return [
          { value: 'documents', label: 'Documents', icon: <FileText size={16} /> },
          { value: 'loi', label: 'LOI View', icon: <FileText size={16} /> },
          { value: 'spreads', label: 'Spreads', icon: <FileSpreadsheet size={16} /> },
          { value: 'chat', label: 'Chat', icon: <MessageSquarePlus size={16} /> }
        ];
      case 'underwriting':
        return [
          { value: 'documents', label: 'Documents', icon: <FileText size={16} /> },
          { value: 'spreads', label: 'Spreads', icon: <FileSpreadsheet size={16} /> },
          { value: 'memo', label: 'Memo View', icon: <FileTextIcon size={16} /> },
          { value: 'chat', label: 'Chat', icon: <MessageSquarePlus size={16} /> }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 flex items-center justify-center">
            <img 
              src="/lovable-uploads/d53d268c-e6c5-4abb-8df8-6ba865ad6ae0.png" 
              alt="Nano Banc" 
              className="h-10 w-auto"
            />
          </div>

          <div className="p-4 border-b border-gray-200">
            <Button 
              className="w-full bg-[#a29f95] hover:bg-[#8a8880] text-white"
              onClick={handleNewChat}
            >
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">Clients</h3>
                
                <div className="relative">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-7 py-1 h-7 text-xs bg-gray-50 w-24"
                    value={clientSearchQuery}
                    onChange={e => setClientSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {filteredClients.map(client => (
                  <div 
                    key={client.id}
                    className={cn(
                      "p-3 rounded-md cursor-pointer border transition-all",
                      selectedClient?.id === client.id 
                        ? "bg-gray-50 border-[#a29f95]" 
                        : "border-gray-100 hover:border-gray-200"
                    )}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">Deal - {client.name}</span>
                      <div className={cn(
                        "w-3 h-3 rounded-full", 
                        selectedClient?.id === client.id ? "bg-[#a29f95]" : "bg-gray-300"
                      )} />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-600">${client.loanAmount.toLocaleString()}</p>
                      {client.recentChat && (
                        <p className="text-xs text-gray-500 truncate mt-1">{client.recentChat.preview}</p>
                      )}
                    </div>
                  </div>
                ))}

                {filteredClients.length === 0 && (
                  <p className="text-sm text-gray-500 italic text-center py-2">No clients found</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col h-full">
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
            <h1 className="text-lg font-medium">
              {selectedClient ? (
                <>Deal - {selectedClient.name} - {new Date().toISOString().split('T')[0]} - ${selectedClient.loanAmount.toLocaleString()}</>
              ) : (
                <>New Application - {new Date().toISOString().split('T')[0]}</>
              )}
            </h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PanelRight className="h-5 w-5 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                <div className="h-full flex flex-col">
                  {selectedClient ? (
                    <>
                      <div className="flex items-center space-x-4 pb-4">
                        <div className="h-12 w-12 rounded-full bg-[#a29f95] text-white flex items-center justify-center">
                          <span className="font-medium">
                            {selectedClient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{selectedClient.name}</h3>
                          <p className="text-sm text-gray-500">Deal ID: {selectedClient.dealId}</p>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex-1 overflow-auto">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium text-[#a29f95] mb-3 flex items-center">
                              <User className="mr-2 h-4 w-4" /> 
                              Contact Information
                            </h4>
                            <div className="space-y-2">
                              <p className="text-sm"><span className="font-medium">Email:</span> {selectedClient.details.email}</p>
                              <p className="text-sm"><span className="font-medium">Phone:</span> {selectedClient.details.phone}</p>
                              <p className="text-sm"><span className="font-medium">Address:</span> {selectedClient.details.address}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-[#a29f95] mb-3 flex items-center">
                              <Building2 className="mr-2 h-4 w-4" />
                              Property Details
                            </h4>
                            <div className="space-y-2">
                              <p className="text-sm"><span className="font-medium">Type:</span> {selectedClient.details.propertyType}</p>
                              <p className="text-sm"><span className="font-medium">Value:</span> ${selectedClient.details.propertyValue.toLocaleString()}</p>
                              <p className="text-sm"><span className="font-medium">NOI:</span> ${selectedClient.details.noi?.toLocaleString()}</p>
                              <p className="text-sm"><span className="font-medium">Cap Rate:</span> {selectedClient.details.capRate}%</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-[#a29f95] mb-3 flex items-center">
                              <DollarSign className="mr-2 h-4 w-4" />
                              Loan Information
                            </h4>
                            <div className="space-y-2">
                              <p className="text-sm"><span className="font-medium">Amount:</span> ${selectedClient.details.loanAmount.toLocaleString()}</p>
                              <p className="text-sm"><span className="font-medium">Type:</span> {selectedClient.details.loanType}</p>
                              <p className="text-sm"><span className="font-medium">Term:</span> {selectedClient.details.loanTerm} years</p>
                              <p className="text-sm"><span className="font-medium">Rate:</span> {selectedClient.details.interestRate}%</p>
                              <p className="text-sm"><span className="font-medium">LTV:</span> {selectedClient.details.ltv}%</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-[#a29f95] mb-3 flex items-center">
                              <ClipboardList className="mr-2 h-4 w-4" />
                              Underwriting Metrics
                            </h4>
                            <div className="space-y-2">
                              <p className="text-sm"><span className="font-medium">DSCR:</span> {selectedClient.details.dscr}x</p>
                              <p className="text-sm"><span className="font-medium">Credit Score:</span> {selectedClient.details.creditScore}</p>
                              <p className="text-sm"><span className="font-medium">Loan Status:</span> {currentStage.charAt(0).toUpperCase() + currentStage.slice(1)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div>
                          <h4 className="text-sm font-medium text-[#a29f95] mb-3 flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            Timeline
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm font-medium">Application Received</p>
                              <p className="text-xs text-gray-500">2023-10-15</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm font-medium">Pre-Flight Review</p>
                              <p className="text-xs text-gray-500">2023-10-22</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm font-medium">LOI Issued</p>
                              <p className="text-xs text-gray-500">2023-11-05</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm font-medium">Underwriting Started</p>
                              <p className="text-xs text-gray-500">2023-11-12</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md border border-[#a29f95]">
                              <p className="text-sm font-medium">Estimated Closing</p>
                              <p className="text-xs text-gray-500">2023-12-15</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No client selected</p>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-white border-b border-gray-200 px-6 py-2">
              <ToggleGroup 
                type="single" 
                value={viewMode} 
                onValueChange={(value) => value && setViewMode(value as ViewMode)}
              >
                {getAvailableViewModes().map(mode => (
                  <ToggleGroupItem 
                    key={mode.value} 
                    value={mode.value} 
                    className="flex items-center gap-2"
                  >
                    {mode.icon}
                    <span>{mode.label}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {viewMode === 'documents' && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Documents</h2>
                    <Button 
                      size="sm"
                      onClick={triggerDocumentUpload}
                      className="bg-[#a29f95] hover:bg-[#8a8880]"
                    >
                      <FileUp className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                    <input 
                      type="file" 
                      ref={documentInputRef} 
                      className="hidden" 
                      onChange={handleDocumentInputChange}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <DocumentUpload 
                      title="Upload Document"
                      description="Drag & drop files or click to browse"
                      onUpload={handleUploadDocument}
                    />
                  </div>
                  
                  {documents.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                      <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-gray-500">No documents uploaded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {documents.map(doc => (
                        <div 
                          key={doc.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(doc.uploadDate).toLocaleDateString()} • {Math.round(doc.size / 1024)} KB
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <span className="text-xs text-gray-600">View</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {viewMode === 'spreads' && (
                <div className="w-full max-w-6xl mx-auto">
                  <SpreadView spreads={financialSpreads} />
                </div>
              )}
              
              {viewMode === 'memo' && (
                <div className="w-full max-w-6xl mx-auto">
                  <MemoView memoUrl={memoUrl} onUpload={handleMemoUpload} />
                </div>
              )}
              
              {viewMode === 'pre-screen' && (
                <div className="w-full max-w-6xl mx-auto">
                  <MemoView memoUrl={preScreenUrl} onUpload={handlePreScreenUpload} />
                </div>
              )}
              
              {viewMode === 'loi' && (
                <div className="w-full max-w-6xl mx-auto">
                  <MemoView memoUrl={loiUrl} onUpload={handleLoiUpload} />
                </div>
              )}
              
              {viewMode === 'chat' && (
                <div className="flex flex-col h-full max-w-4xl mx-auto">
                  <div className="flex-1 overflow-y-auto pb-4">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div 
                          key={message.id}
                          className={cn(
                            "flex w-full",
                            message.sender === 'user' ? "justify-end" : "justify-start"
                          )}
                        >
                          <div 
                            className={cn(
                              "max-w-[80%] rounded-lg p-3",
                              message.sender === 'user' 
                                ? "bg-[#a29f95] text-white rounded-tr-none" 
                                : "bg-gray-100 text-gray-800 rounded-tl-none"
                            )}
                          >
                            {message.content}
                            <div 
                              className={cn(
                                "text-xs mt-1",
                                message.sender === 'user' ? "text-gray-200" : "text-gray-500"
                              )}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {waitingForApplicationUpload && (
                        <div className="mx-auto w-full max-w-md my-4">
                          <DocumentUpload 
                            title="Upload Application"
                            description="Please upload your completed application document"
                            onUpload={handleUploadDocument}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {suggestionMessages.map((suggestion, idx) => (
                        <Button 
                          key={idx} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs text-gray-600 px-2 py-1 h-auto"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <Textarea 
                        placeholder="Type your message..."
                        className="flex-1 resize-none"
                        rows={3}
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        className="bg-[#a29f95] hover:bg-[#8a8880] mb-[3px]"
                        size="icon"
                        onClick={handleSendMessage}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-white">
        <ProgressTracker 
          currentStage={currentStage} 
          onStageClick={handleStageClick}
        />
      </div>
    </div>
  );
};

export default Agent;

