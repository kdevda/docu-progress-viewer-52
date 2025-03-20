
import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ApplicationStage = 'application' | 'pre-flight' | 'loi' | 'underwriting';

interface ProgressTrackerProps {
  currentStage: ApplicationStage;
  onStageClick?: (stage: ApplicationStage) => void;
}

const stages: { id: ApplicationStage; label: string }[] = [
  { id: 'application', label: 'Application' },
  { id: 'pre-flight', label: 'Pre-Flight' },
  { id: 'loi', label: 'LOI' },
  { id: 'underwriting', label: 'Underwriting' }
];

const ProgressTracker = ({ currentStage, onStageClick }: ProgressTrackerProps) => {
  // Determine the indices for styling
  const currentIndex = stages.findIndex(stage => stage.id === currentStage);
  
  return (
    <div className="flex justify-between w-full relative">
      {/* Progress Line */}
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
      
      {stages.map((stage, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        
        return (
          <div 
            key={stage.id}
            className={cn(
              "progress-stage flex flex-col items-center cursor-pointer",
              isActive && "active",
              isCompleted && "completed"
            )}
            onClick={() => onStageClick && onStageClick(stage.id)}
          >
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                isCompleted ? "bg-nano-green" : 
                isActive ? "bg-nano-blue" : 
                "bg-gray-200"
              )}
            >
              {isCompleted ? (
                <CheckIcon className="h-4 w-4 text-white" />
              ) : (
                <span className={cn(
                  "text-sm font-medium",
                  isActive ? "text-white" : "text-gray-500"
                )}>
                  {index + 1}
                </span>
              )}
            </div>
            <span className={cn(
              "text-xs md:text-sm whitespace-nowrap",
              isActive ? "text-nano-blue font-semibold" : 
              isCompleted ? "text-nano-green font-medium" : 
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
