
import React from "react";
import { TaskStatus, TaskTag } from "@/types/task";
import { useTaskContext } from "@/contexts/TaskContext";
import { TaskCard } from "@/components/TaskCard";
import { ClipboardList, FileText, CheckCircle } from "lucide-react";

interface TaskListProps {
  status: TaskStatus;
  tag?: TaskTag;
  onEditTask: (task: any) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ status, tag, onEditTask }) => {
  const { getTasksByStatus, getTasksByTag } = useTaskContext();
  
  // Filter tasks by status first
  let tasks = getTasksByStatus(status);
  
  // If tag is provided, further filter by tag
  if (tag) {
    tasks = tasks.filter(task => task.tags.includes(tag));
  }

  const statusIcons = {
    pending: <ClipboardList className="w-5 h-5 mr-2" />,
    progress: <FileText className="w-5 h-5 mr-2" />,
    complete: <CheckCircle className="w-5 h-5 mr-2" />,
  };

  const statusClasses = {
    pending: "text-status-pending",
    progress: "text-status-progress",
    complete: "text-status-complete",
  };

  const statusLabels = {
    pending: "Pending",
    progress: "In Progress",
    complete: "Complete",
  };

  return (
    <div>
      <div className={`flex items-center mb-4 ${statusClasses[status]}`}>
        {statusIcons[status]}
        <h2 className="text-xl font-bold">{statusLabels[status]}</h2>
        <span className="ml-2 bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold">
          {tasks.length}
        </span>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No tasks in this category</p>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
        </div>
      )}
    </div>
  );
};
