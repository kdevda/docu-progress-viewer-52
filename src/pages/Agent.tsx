
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ProgressTracker from "@/components/ProgressTracker";
import DocumentUpload from "@/components/DocumentUpload";
import SpreadView from "@/components/SpreadView";
import MemoView from "@/components/MemoView";
import { FileText, MessageSquarePlus, Search, User, Info, Plus, Upload, DollarSign, FileSpreadsheet, FileText as FileTextIcon } from 'lucide-react';
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
  };
};

type ViewMode = 'chat' | 'spreads' | 'memo';

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
        creditScore: 720
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
        creditScore: 680
      }
    }
  ]);
  
  const [selectedClient, setSelectedClient] = useState<Client>(clients[1]);
  const [currentStage, setCurrentStage] = useState<'application' | 'pre-flight' | 'loi' | 'underwriting'>('underwriting');
  const [viewMode, setViewMode] = useState<ViewMode>('spreads');
  const [documentSearchQuery, setDocumentSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [memoUrl, setMemoUrl] = useState<string | undefined>(undefined);

  // Sample financial spreads data
  const financialSpreads = [
    { label: 'Annual Revenue', value: 1250000, source: 'Financial Statement.pdf' },
    { label: 'Operating Expenses', value: 750000, source: 'Financial Statement.pdf' },
    { label: 'Net Income', value: 500000, source: 'Financial Statement.pdf' },
    { label: 'Total Assets', value: 3750000, source: 'Financial Statement.pdf' },
    { label: 'Total Liabilities', value: 2250000, source: 'Financial Statement.pdf' },
    { label: 'Debt-to-Income Ratio', value: '0.60', source: 'Financial Statement.pdf' },
  ];

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
    
    // Simulate agent response after a short delay
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'll help you with that. Let me check your application details.",
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
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
  };

  const handleNewChat = () => {
    setMessages([{
      id: Date.now().toString(),
      content: "Hi there! How can I help you today?",
      sender: 'agent',
      timestamp: new Date()
    }]);
    setShowChat(true);
  };

  const handleMemoUpload = (file: File) => {
    // In a real app, we would upload the file to a server and get a URL back
    // For this demo, we'll create a temporary object URL
    const objectUrl = URL.createObjectURL(file);
    setMemoUrl(objectUrl);
    toast.success(`Memo "${file.name}" uploaded successfully`);
  };

  const handleStageClick = (stage: 'application' | 'pre-flight' | 'loi' | 'underwriting') => {
    setCurrentStage(stage);
    // If stage is underwriting, default to spreads view
    if (stage === 'underwriting') {
      setViewMode('spreads');
    } else {
      setShowChat(true);
    }
  };

  return (
    <div className="flex h-screen bg-nano-lightblue overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <img 
            src="/lovable-uploads/da4cffd1-9a5a-4e34-bbfd-377882856f5c.png" 
            alt="Nano Banc" 
            className="h-10 w-auto"
          />
        </div>
        
        {/* New Chat Button */}
        <div className="p-4">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 border-gray-300"
            onClick={handleNewChat}
          >
            <Plus size={16} />
            New Chat
          </Button>
        </div>

        {/* Documents Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-sm">Documents</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setIsUploading(prev => !prev)}
            >
              <Upload className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
          
          {isUploading && (
            <div className="mb-4">
              <DocumentUpload 
                title="Upload Document"
                description="Drag & drop or browse files"
                onUpload={handleUploadDocument}
              />
            </div>
          )}
          
          {/* Document Search */}
          <div className="relative mb-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search Documents..."
              className="pl-8 py-1 h-9 text-sm bg-gray-50"
              value={documentSearchQuery}
              onChange={e => setDocumentSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Uploaded Documents List */}
          <div>
            <p className="text-xs font-medium mb-1 text-gray-500">Uploaded Documents</p>
            {documents.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No documents uploaded</p>
            ) : (
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center text-xs p-1 hover:bg-gray-100 rounded">
                    <FileText className="h-3 w-3 mr-2 text-gray-500" />
                    <span className="truncate">{doc.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Clients Section */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">Clients</h3>
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            
            {/* Client List */}
            <div className="space-y-2">
              {clients.map(client => (
                <div 
                  key={client.id}
                  className={cn(
                    "flex items-start p-2 rounded-md cursor-pointer",
                    selectedClient?.id === client.id ? "bg-nano-lightblue" : "hover:bg-gray-50"
                  )}
                  onClick={() => setSelectedClient(client)}
                >
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-2" 
                    checked={selectedClient?.id === client.id}
                    onChange={() => setSelectedClient(client)}
                  />
                  <div className="flex-1 text-xs">
                    <p className="font-medium">Deal - {client.name}</p>
                    <p className="text-xs text-gray-600">${client.loanAmount.toLocaleString()}</p>
                    {client.recentChat && (
                      <p className="text-gray-500 truncate">{client.recentChat.preview}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header Bar */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
          <h1 className="text-lg font-medium">
            Deal - {selectedClient?.name} - {new Date().toISOString().split('T')[0]} - ${selectedClient?.loanAmount.toLocaleString()}
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5 text-gray-600" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <div className="h-full flex flex-col">
                <div className="flex items-center space-x-4 pb-4">
                  <div className="h-12 w-12 rounded-full bg-nano-blue text-white flex items-center justify-center">
                    <span className="font-medium">
                      {selectedClient?.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{selectedClient?.name}</h3>
                    <p className="text-sm text-gray-500">Deal ID: {selectedClient?.dealId}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex-1 overflow-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Contact Information</p>
                      <p className="text-sm">{selectedClient?.details.email}</p>
                      <p className="text-sm">{selectedClient?.details.phone}</p>
                      <p className="text-sm">{selectedClient?.details.address}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Loan Details</p>
                      <p className="text-sm">Amount: ${selectedClient?.details.loanAmount.toLocaleString()}</p>
                      <p className="text-sm">Type: {selectedClient?.details.loanType}</p>
                      <p className="text-sm">Property Value: ${selectedClient?.details.propertyValue.toLocaleString()}</p>
                      <p className="text-sm">Credit Score: {selectedClient?.details.creditScore}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <p className="text-sm font-medium mb-3">Documents</p>
                    <DocumentUpload 
                      title="Upload Document"
                      description="Upload any additional documents required for processing"
                      onUpload={handleUploadDocument}
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Underwriting stage content */}
        {currentStage === 'underwriting' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="bg-white border-b border-gray-200 px-6 py-2">
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
                <ToggleGroupItem value="spreads" className="flex items-center gap-2">
                  <FileSpreadsheet size={16} />
                  <span>Spreads</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="memo" className="flex items-center gap-2">
                  <FileTextIcon size={16} />
                  <span>Memo View</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="chat" className="flex items-center gap-2">
                  <MessageSquarePlus size={16} />
                  <span>Chat</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {viewMode === 'spreads' && <SpreadView spreads={financialSpreads} />}
              {viewMode === 'memo' && <MemoView memoUrl={memoUrl} onUpload={handleMemoUpload} />}
              {viewMode === 'chat' && (
                <div className="max-w-4xl mx-auto h-full flex flex-col">
                  <div className="flex-1 overflow-auto">
                    {messages.map(message => (
                      <div 
                        key={message.id}
                        className={cn(
                          "mb-4 max-w-[80%]",
                          message.sender === 'agent' ? "mr-auto" : "ml-auto"
                        )}
                      >
                        <div className={cn(
                          "rounded-lg p-4",
                          message.sender === 'agent' 
                            ? "bg-white border border-gray-200" 
                            : "bg-nano-blue text-white"
                        )}>
                          {message.content}
                        </div>
                        <div className={cn(
                          "text-xs mt-1",
                          message.sender === 'user' ? "text-right" : ""
                        )}>
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex">
                    <Textarea
                      placeholder="Type here..."
                      className="min-h-12 resize-none"
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
                      className="ml-2 self-end"
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Chat View for non-underwriting stages
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Chat Area */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={cn(
                      "mb-4 max-w-[80%]",
                      message.sender === 'agent' ? "mr-auto" : "ml-auto"
                    )}
                  >
                    <div className={cn(
                      "rounded-lg p-4",
                      message.sender === 'agent' 
                        ? "bg-white border border-gray-200" 
                        : "bg-nano-blue text-white"
                    )}>
                      {message.content}
                    </div>
                    <div className={cn(
                      "text-xs mt-1",
                      message.sender === 'user' ? "text-right" : ""
                    )}>
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="max-w-4xl mx-auto flex">
                <Textarea
                  placeholder="Type here..."
                  className="min-h-12 resize-none"
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
                  className="ml-2 self-end"
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Progress Tracker */}
        <div className="p-4 bg-white border-t border-gray-200">
          <ProgressTracker currentStage={currentStage} onStageClick={handleStageClick} />
        </div>
      </div>
    </div>
  );
};

export default Agent;
