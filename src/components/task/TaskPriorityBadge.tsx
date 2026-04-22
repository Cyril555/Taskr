
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskPriority } from "@/types/task";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
  compact?: boolean;
}

const priorityColors = {
  high: "bg-priority-high text-white",
  medium: "bg-priority-medium text-white",
  low: "bg-priority-low text-white",
};

export const TaskPriorityBadge: React.FC<TaskPriorityBadgeProps> = ({ 
  priority,
  compact = false
}) => {
  return (
    <Badge className={`${priorityColors[priority]} ${compact ? 'text-xs px-1 py-0' : ''}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
};
