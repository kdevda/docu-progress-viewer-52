
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MemoViewProps {
  memoUrl?: string;
  onUpload?: (file: File) => void;
}

const MemoView: React.FC<MemoViewProps> = ({ memoUrl, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && onUpload) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onUpload) {
      onUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {memoUrl ? (
        <iframe
          src={memoUrl}
          className="w-full h-full border-0"
          title="Memo Document"
        />
      ) : (
        <div 
          className={cn(
            "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg w-full max-w-lg mx-auto",
            isDragging ? "border-nano-blue bg-nano-lightblue" : "border-gray-300"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">Upload Document</h3>
          <p className="text-gray-500 text-center mb-6">
            Drag and drop your PDF document here, or click to browse
          </p>
          <Button onClick={triggerFileInput}>
            <Upload className="h-4 w-4 mr-2" />
            Select File
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf,.docx,.doc" 
            onChange={handleFileInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default MemoView;
