
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskTag } from "@/types/task";

interface TaskTagsListProps {
  tags: TaskTag[];
  compact?: boolean;
}

const tagColors = {
  practical: "bg-tag-practical text-white",
  prescribing: "bg-tag-prescribing text-white",
  referrals: "bg-tag-referrals text-white",
  discharge: "bg-tag-discharge text-white",
};

export const TaskTagsList: React.FC<TaskTagsListProps> = ({ 
  tags,
  compact = false
}) => {
  return (
    <div className={`flex flex-wrap gap-1 ${compact ? 'mb-2' : 'mb-3'}`}>
      {tags.map((tag) => (
        <Badge key={tag} className={`${tagColors[tag]} ${compact ? 'text-xs px-1 py-0' : ''}`}>
          {tag.charAt(0).toUpperCase() + tag.slice(1)}
        </Badge>
      ))}
    </div>
  );
};
