
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flag } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const TaskPriorityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const priorityColors = {
    high: "bg-priority-high text-white",
    medium: "bg-priority-medium text-white",
    low: "bg-priority-low text-white",
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Flag className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-auto" align="start">
        <div className="flex flex-col space-y-1">
          <Badge className={priorityColors.high}>
            High
          </Badge>
          <Badge className={priorityColors.medium}>
            Medium
          </Badge>
          <Badge className={priorityColors.low}>
            Low
          </Badge>
        </div>
      </PopoverContent>
    </Popover>
  );
};
