
import React from 'react';
import { CheckCircle, ChevronRight, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  count?: number;
  onClick?: () => void;
}

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  className?: string;
}

const TaskList = ({ tasks, onTaskClick, className }: TaskListProps) => {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 overflow-hidden animate-fade-in", className)}>
      {tasks.length === 0 ? (
        <div className="p-4 text-center text-gray-500 text-sm">
          No tasks available
        </div>
      ) : (
        tasks.map((task, index) => (
          <div 
            key={task.id}
            className={cn(
              "flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors",
              index !== tasks.length - 1 && "border-b border-gray-100"
            )}
            onClick={() => onTaskClick(task.id)}
          >
            <div className="flex items-center">
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-bank-accent mr-3 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3 w-3 text-bank-accent" />
                </div>
              )}
              <span className={cn(
                "text-sm font-medium",
                task.completed ? "text-gray-500" : "text-gray-900"
              )}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center">
              {task.count !== undefined && task.count > 0 && (
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                  {task.count}
                </span>
              )}
              <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
