
import React from "react";
import { Task } from "@/types/task";
import { formatDistanceToNow } from "date-fns";
import { TaskTagsList } from "./TaskTagsList";

interface TaskContentProps {
  task: Task;
  compact?: boolean;
  hidePatientInfo?: boolean;
}

export const TaskContent: React.FC<TaskContentProps> = ({
  task,
  compact = false,
  hidePatientInfo = false,
}) => {
  return (
    <>
      {!hidePatientInfo && (
        <>
          <h3 className={`${compact ? 'text-base' : 'text-lg'} font-bold`}>
            {task.patientName}
          </h3>
          <p className="text-sm text-gray-500">ID: {task.patientId}</p>
        </>
      )}
      <p className={`${compact ? 'mb-2 line-clamp-2 text-sm' : 'mb-3'}`}>
        {task.description}
      </p>
      
      <TaskTagsList tags={task.tags} compact={compact} />
      
      <p className="text-xs text-gray-500">
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: false })}
      </p>
    </>
  );
};
