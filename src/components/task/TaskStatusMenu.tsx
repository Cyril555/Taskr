
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/types/task";
import { Clipboard, FileCheck, FileEdit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskStatusMenuProps {
  status: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

export const TaskStatusMenu: React.FC<TaskStatusMenuProps> = ({ status, onChange }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-500";
      case "progress":
        return "bg-amber-500";
      case "pending":
      default:
        return "bg-blue-500";
    }
  };

  const handleStatusChange = (status: TaskStatus) => {
    onChange(status);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
          >
            <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-1 w-auto" align="start">
          <div className="flex flex-col">
            <Button
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => handleStatusChange("pending")}
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Pending
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => handleStatusChange("progress")}
            >
              <FileEdit className="w-4 h-4 mr-2" />
              In Progress
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => handleStatusChange("complete")}
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Complete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
          <Clipboard className="w-4 h-4 mr-2" />
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("progress")}>
          <FileEdit className="w-4 h-4 mr-2" />
          In Progress
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("complete")}>
          <FileCheck className="w-4 h-4 mr-2" />
          Complete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
