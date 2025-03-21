
import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DocumentUploadProps {
  title: string;
  description: string;
  onUpload?: (file: File) => void;
  acceptedFileTypes?: string;
}

type FileStatus = 'idle' | 'uploading' | 'success' | 'error';

const DocumentUpload = ({
  title,
  description,
  onUpload,
  acceptedFileTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png"
}: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<FileStatus>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Check if file type is acceptable
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = selectedFile.type;
    
    // Simple validation - in production, would do more thorough checks
    if (!acceptedFileTypes.includes(fileExtension) && !acceptedFileTypes.includes(mimeType)) {
      toast.error("Invalid file type. Please upload a supported document format.");
      return;
    }
    
    setFile(selectedFile);
    setStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate for demo
        setStatus('success');
        toast.success("Document uploaded successfully!");
        if (onUpload) onUpload(selectedFile);
      } else {
        setStatus('error');
        toast.error("Upload failed. Please try again.");
      }
    }, 1500);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setStatus('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-sm border border-gray-100 p-4 mb-4 animate-fade-in">
      <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      
      {!file ? (
        <div 
          className={cn(
            "file-drop-area p-6 rounded-md text-center cursor-pointer transition-all",
            isDragging && "dragging"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-600">
            Drag and drop a file, or <span className="text-bank-accent">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: PDF, DOC, DOCX, JPG, PNG
          </p>
          <input 
            type="file" 
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept={acceptedFileTypes}
          />
        </div>
      ) : (
        <div className="border rounded-md p-3 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-bank-light flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-bank-accent" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
          <div className="flex items-center">
            {status === 'uploading' && (
              <div className="h-4 w-4 border-2 border-t-bank-accent rounded-full animate-spin mr-2"></div>
            )}
            {status === 'success' && (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            )}
            {status === 'error' && (
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            )}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
