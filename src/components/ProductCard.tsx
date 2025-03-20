
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ApplicationStage } from './ProgressTracker';
import ProgressTracker from './ProgressTracker';

interface ProductCardProps {
  title: string;
  relationship: string;
  currentStage: ApplicationStage;
  onClick?: () => void;
}

const ProductCard = ({ 
  title, 
  relationship, 
  currentStage,
  onClick
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer animate-slide-in" onClick={onClick}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">Relationship: {relationship}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">In: {currentStage.charAt(0).toUpperCase() + currentStage.slice(1)}</p>
          <ProgressTracker currentStage={currentStage} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
