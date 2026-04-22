
import React from "react";
import { Button } from "@/components/ui/button";
import { FileEdit, Trash2 } from "lucide-react";
import { Task } from "@/types/task";
import { TaskStatusMenu } from "./TaskStatusMenu";
import { TaskPriorityMenu } from "./TaskPriorityMenu";
import { TaskTagsMenu } from "./TaskTagsMenu";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskActionButtonsProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: "complete" | "pending" | "progress") => void;
}

export const TaskActionButtons: React.FC<TaskActionButtonsProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const isMobile = useIsMobile();
  
  const handleStatusChange = (status: "complete" | "pending" | "progress") => {
    onStatusChange(task.id, status);
  };

  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-1 justify-between">
        <div className="flex gap-1">
          <TaskStatusMenu status={task.status} onChange={handleStatusChange} />
          <TaskPriorityMenu />
          <TaskTagsMenu tags={task.tags} />
        </div>
        
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => onEdit(task)} className="h-8 w-8 p-0">
            <FileEdit className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:text-destructive/90 h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-1">
      <TaskStatusMenu status={task.status} onChange={handleStatusChange} />
      
      <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
        <FileEdit className="w-4 h-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onDelete(task.id)}
        className="text-destructive hover:text-destructive/90"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
