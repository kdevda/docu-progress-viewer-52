
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ApplicationStage = 'application' | 'underwriting' | 'processing' | 'closing';

interface ProgressTrackerProps {
  currentStage: ApplicationStage;
}

const stages: { id: ApplicationStage; label: string }[] = [
  { id: 'application', label: 'Application' },
  { id: 'underwriting', label: 'Underwriting' },
  { id: 'processing', label: 'Processing' },
  { id: 'closing', label: 'Closing' }
];

const ProgressTracker = ({ currentStage }: ProgressTrackerProps) => {
  // Determine the indices for styling
  const currentIndex = stages.findIndex(stage => stage.id === currentStage);
  
  return (
    <div className="flex justify-between w-full">
      {stages.map((stage, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        
        return (
          <div 
            key={stage.id}
            className={cn(
              "progress-stage flex flex-col items-center",
              isActive && "active",
              isCompleted && "completed"
            )}
          >
            <div 
              className={cn(
                "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                isCompleted ? "bg-bank-progress-completed" : 
                isActive ? "bg-bank-progress-active" : 
                "bg-bank-progress-default"
              )}
            >
              {isCompleted ? (
                <CheckIcon className="h-3 w-3 md:h-4 md:w-4 text-white" />
              ) : (
                <span className={cn(
                  "text-xs md:text-sm font-medium",
                  isActive ? "text-white" : "text-gray-500"
                )}>
                  {index + 1}
                </span>
              )}
            </div>
            <span className={cn(
              "text-xs md:text-sm whitespace-nowrap",
              isActive ? "text-bank-accent font-semibold" : 
              isCompleted ? "text-bank-progress-completed font-medium" : 
              "text-gray-500"
            )}>
              {stage.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
