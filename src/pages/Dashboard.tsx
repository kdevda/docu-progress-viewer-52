
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import TaskList from '@/components/TaskList';
import ProductCard from '@/components/ProductCard';
import DocumentUpload from '@/components/DocumentUpload';
import ContactCard from '@/components/ContactCard';
import { Task } from '@/components/TaskList';
import { X } from 'lucide-react';
import { ApplicationStage } from '@/components/ProgressTracker';
import { toast } from 'sonner';

// Mock data
const initialTasks: Task[] = [
  { id: 'upload-documents', title: 'Upload Documents', completed: false, count: 3 },
  { id: 'verify-information', title: 'Verify Information', completed: true },
  { id: 'sign-agreements', title: 'Sign Agreements', completed: false }
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const handleTaskClick = (taskId: string) => {
    setActiveTask(taskId);
  };

  const handleCloseTask = () => {
    setActiveTask(null);
  };

  const handleDocumentUpload = (file: File) => {
    setUploadedDocuments(prev => [...prev, file.name]);
    
    // If we've uploaded 3 documents, mark the task as completed
    if (uploadedDocuments.length + 1 >= 3) {
      setTimeout(() => {
        setTasks(tasks.map(task => 
          task.id === 'upload-documents' ? { ...task, completed: true, count: 0 } : task
        ));
        toast.success("All required documents have been uploaded!");
      }, 1000);
    }
  };

  // Render document upload section if that task is selected
  const renderTaskContent = () => {
    if (activeTask === 'upload-documents') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 animate-slide-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
            <button 
              onClick={handleCloseTask}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            Please upload the following documents to continue with your application process.
          </p>
          
          <DocumentUpload
            title="Proof of Income"
            description="Upload your most recent pay stub, W-2, or tax return document."
            onUpload={handleDocumentUpload}
          />
          
          <DocumentUpload
            title="Identity Verification"
            description="Upload a valid government-issued ID (passport, driver's license)."
            onUpload={handleDocumentUpload}
          />
          
          <DocumentUpload
            title="Additional Documentation"
            description="Upload any supplemental files for to-do list items."
            onUpload={handleDocumentUpload}
          />
        </div>
      );
    }
    
    if (activeTask === 'verify-information') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 animate-slide-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Verify Information</h2>
            <button 
              onClick={handleCloseTask}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            Your information has been verified. No further action is required at this time.
          </p>
          
          <div className="flex items-center bg-green-50 border border-green-100 rounded-md p-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Verification Complete</p>
              <p className="text-xs text-green-600">Completed on June 15, 2023</p>
            </div>
          </div>
        </div>
      );
    }
    
    if (activeTask === 'sign-agreements') {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 animate-slide-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Sign Agreements</h2>
            <button 
              onClick={handleCloseTask}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-6">
            Please review and sign the following agreements to proceed with your application.
          </p>
          
          <div className="space-y-4">
            <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="text-sm font-medium text-gray-900">Loan Agreement</h3>
              <p className="text-xs text-gray-500 mt-1">Review and sign your home loan refinance agreement</p>
              <button className="mt-3 text-xs font-medium text-bank-accent">View & Sign</button>
            </div>
            
            <div className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="text-sm font-medium text-gray-900">Terms & Conditions</h3>
              <p className="text-xs text-gray-500 mt-1">Review the terms and conditions for your account</p>
              <button className="mt-3 text-xs font-medium text-bank-accent">View & Sign</button>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const currentStage: ApplicationStage = 'application';
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <HeroBanner 
        title="Welcome to your dashboard"
        subtitle="Upload documents, check the status of your products, and keep in touch!"
      />
      
      <div className="container px-4 sm:px-6 mx-auto -mt-6 sm:-mt-10 relative z-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6 animate-fade-in">
              <div className="px-4 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">TO-DO LIST</h2>
              </div>
              <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
            </div>
            
            <ContactCard />
          </div>
          
          <div className="lg:col-span-2">
            {activeTask ? (
              renderTaskContent()
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 px-1 mb-4">YOUR PRODUCTS</h2>
                  <ProductCard 
                    title="Home Loan Refinance" 
                    relationship="John Smith"
                    currentStage={currentStage}
                    onClick={() => toast.info("Viewing product details would open here")}
                  />
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-5 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Documents</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Upload additional documentation here, including supplemental files for to-do list items.
                  </p>
                  
                  <DocumentUpload
                    title="Additional Documentation"
                    description="Upload any supplemental files for to-do list items."
                    onUpload={(file) => {
                      toast.success(`Successfully uploaded: ${file.name}`);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
