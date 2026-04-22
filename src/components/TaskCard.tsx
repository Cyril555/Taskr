
import React from "react";
import { Task } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskContext } from "@/contexts/TaskContext";
import { TaskPriorityBadge } from "./task/TaskPriorityBadge";
import { TaskActionButtons } from "./task/TaskActionButtons";
import { TaskContent } from "./task/TaskContent";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  hidePatientInfo?: boolean;
  compact?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit,
  hidePatientInfo = false,
  compact = false
}) => {
  const { updateTaskStatus, deleteTask } = useTaskContext();

  return (
    <Card className={`mb-4 shadow-md hover:shadow-lg transition-shadow duration-300 ${compact ? 'p-0' : ''}`}>
      <CardHeader className={`pb-2 ${compact ? 'p-3' : ''}`}>
        <div className="flex justify-between items-start">
          <div>
            {!hidePatientInfo && (
              <>
                <CardTitle className={`${compact ? 'text-base' : 'text-lg'} font-bold`}>{task.patientName}</CardTitle>
                <p className="text-sm text-gray-500">ID: {task.patientId}</p>
              </>
            )}
          </div>
          <TaskPriorityBadge priority={task.priority} />
        </div>
      </CardHeader>
      <CardContent className={compact ? 'p-3' : ''}>
        <TaskContent 
          task={task}
          compact={compact}
          hidePatientInfo={hidePatientInfo}
        />
        
        <div className="flex flex-col space-y-2 mt-2">
          <TaskActionButtons
            task={task}
            onEdit={onEdit}
            onDelete={deleteTask}
            onStatusChange={updateTaskStatus}
          />
        </div>
      </CardContent>
    </Card>
  );
};
