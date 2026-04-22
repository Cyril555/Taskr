import React from "react";
import { useTaskContext } from "@/contexts/TaskContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, ClipboardList, FileText, AlertTriangle, Stethoscope, ClipboardCheck, Activity, FileOutput } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const TaskStats: React.FC = () => {
  const { tasks, getTasksByStatus, getTasksByPriority, getTasksByTag } = useTaskContext();
  const isMobile = useIsMobile();
  
  const pendingTasks = getTasksByStatus("pending");
  const progressTasks = getTasksByStatus("progress");
  const completeTasks = getTasksByStatus("complete");
  
  const highPriorityTasks = getTasksByPriority("high");
  const mediumPriorityTasks = getTasksByPriority("medium");
  const lowPriorityTasks = getTasksByPriority("low");
  
  const practicalTasks = getTasksByTag("practical");
  const prescribingTasks = getTasksByTag("prescribing");
  const referralsTasks = getTasksByTag("referrals");
  const dischargeTasks = getTasksByTag("discharge");
  
  const calculatePercentage = (count: number) => {
    return tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0;
  };
  
  const statusPercentages = {
    pending: calculatePercentage(pendingTasks.length),
    progress: calculatePercentage(progressTasks.length),
    complete: calculatePercentage(completeTasks.length),
  };
  
  const priorityPercentages = {
    high: calculatePercentage(highPriorityTasks.length),
    medium: calculatePercentage(mediumPriorityTasks.length),
    low: calculatePercentage(lowPriorityTasks.length),
  };
  
  const tagPercentages = {
    practical: calculatePercentage(practicalTasks.length),
    prescribing: calculatePercentage(prescribingTasks.length),
    referrals: calculatePercentage(referralsTasks.length),
    discharge: calculatePercentage(dischargeTasks.length),
  };
  
  const statusCard = (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Task Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <ClipboardList className="h-4 w-4 mr-2 text-status-pending" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {pendingTasks.length} ({statusPercentages.pending}%)
              </span>
            </div>
            <Progress 
              value={statusPercentages.pending} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-status-progress" />
                <span className="text-sm font-medium">In Progress</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {progressTasks.length} ({statusPercentages.progress}%)
              </span>
            </div>
            <Progress 
              value={statusPercentages.progress} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-status-complete" />
                <span className="text-sm font-medium">Complete</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {completeTasks.length} ({statusPercentages.complete}%)
              </span>
            </div>
            <Progress 
              value={statusPercentages.complete} 
              className="h-2 bg-muted"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const priorityCard = (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Task Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-priority-high" />
                <span className="text-sm font-medium">High</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {highPriorityTasks.length} ({priorityPercentages.high}%)
              </span>
            </div>
            <Progress 
              value={priorityPercentages.high} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-priority-medium" />
                <span className="text-sm font-medium">Medium</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {mediumPriorityTasks.length} ({priorityPercentages.medium}%)
              </span>
            </div>
            <Progress 
              value={priorityPercentages.medium} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-priority-low" />
                <span className="text-sm font-medium">Low</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {lowPriorityTasks.length} ({priorityPercentages.low}%)
              </span>
            </div>
            <Progress 
              value={priorityPercentages.low} 
              className="h-2 bg-muted"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const tagsCard = (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Task Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Stethoscope className="h-4 w-4 mr-2 text-tag-practical" />
                <span className="text-sm font-medium">Practical</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {practicalTasks.length} ({tagPercentages.practical}%)
              </span>
            </div>
            <Progress 
              value={tagPercentages.practical} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <ClipboardCheck className="h-4 w-4 mr-2 text-tag-prescribing" />
                <span className="text-sm font-medium">Prescribing</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {prescribingTasks.length} ({tagPercentages.prescribing}%)
              </span>
            </div>
            <Progress 
              value={tagPercentages.prescribing} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-tag-referrals" />
                <span className="text-sm font-medium">Referrals</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {referralsTasks.length} ({tagPercentages.referrals}%)
              </span>
            </div>
            <Progress 
              value={tagPercentages.referrals} 
              className="h-2 bg-muted"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <FileOutput className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm font-medium">Discharge Summaries</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {dischargeTasks.length} ({tagPercentages.discharge}%)
              </span>
            </div>
            <Progress 
              value={tagPercentages.discharge} 
              className="h-2 bg-muted"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isMobile) {
    return (
      <div className="mt-6">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="md:basis-1/1">
              {statusCard}
            </CarouselItem>
            <CarouselItem className="md:basis-1/1">
              {priorityCard}
            </CarouselItem>
            <CarouselItem className="md:basis-1/1">
              {tagsCard}
            </CarouselItem>
          </CarouselContent>
          <div className="flex justify-center mt-2">
            <CarouselPrevious className="relative static translate-y-0 mr-2 -left-0" />
            <CarouselNext className="relative static translate-y-0 -right-0" />
          </div>
        </Carousel>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {statusCard}
      {priorityCard}
      {tagsCard}
    </div>
  );
};
