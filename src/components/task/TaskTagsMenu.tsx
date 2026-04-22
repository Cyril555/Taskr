
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import { TaskTag } from "@/types/task";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TaskTagsMenuProps {
  tags: TaskTag[];
}

export const TaskTagsMenu: React.FC<TaskTagsMenuProps> = ({ tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const tagColors = {
    practical: "bg-tag-practical text-white",
    prescribing: "bg-tag-prescribing text-white",
    referrals: "bg-tag-referrals text-white",
    discharge: "bg-tag-discharge text-white",
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Tag className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-auto" align="start">
        <div className="flex flex-col space-y-1">
          {tags.map((tag) => (
            <Badge key={tag} className={`${tagColors[tag]}`}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Badge>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
