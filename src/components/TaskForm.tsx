
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Task, TaskPriority, TaskTag } from "@/types/task";
import { useTaskContext } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TaskTemplate } from "@/components/PatientTaskGrid";
import { PatientInfo } from "@/components/PatientTaskGrid";

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editTask?: Task;
  prefilledPatient?: PatientInfo;
  prefilledTemplate?: TaskTemplate;
}

interface FormValues {
  patientName: string;
  patientId: string;
  bedNumber: string;
  doctor: string;
  description: string;
  priority: TaskPriority;
  dueDate?: string;
  notes?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  open,
  onOpenChange,
  editTask,
  prefilledPatient,
  prefilledTemplate,
}) => {
  const { addTask, updateTask } = useTaskContext();
  const [selectedTags, setSelectedTags] = useState<TaskTag[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (editTask) {
      setValue("patientName", editTask.patientName);
      setValue("patientId", editTask.patientId);
      setValue("bedNumber", editTask.bedNumber);
      setValue("doctor", editTask.doctor);
      setValue("description", editTask.description);
      setValue("priority", editTask.priority);
      if (editTask.dueDate) {
        const date = new Date(editTask.dueDate);
        setValue(
          "dueDate",
          `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(date.getDate()).padStart(2, "0")}T${String(
            date.getHours()
          ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
        );
      }
      setValue("notes", editTask.notes || "");
      setSelectedTags(editTask.tags);
    } else if (prefilledPatient) {
      setValue("patientName", prefilledPatient.name);
      setValue("patientId", prefilledPatient.id);
      setValue("bedNumber", prefilledPatient.bedNumber || "");
      setValue("doctor", prefilledPatient.doctor || "");
      
      // Apply template data if provided
      if (prefilledTemplate) {
        setValue("description", prefilledTemplate.description);
        setValue("priority", prefilledTemplate.priority);
        setValue("notes", prefilledTemplate.notes || "");
        setSelectedTags(prefilledTemplate.tags);
      } else {
        setValue("description", "");
        setValue("priority", "medium");
        setValue("notes", "");
        setSelectedTags([]);
      }
      setValue("dueDate", "");
    } else {
      reset({
        patientName: "",
        patientId: "",
        bedNumber: "",
        doctor: "",
        description: "",
        priority: "medium",
        dueDate: "",
        notes: "",
      });
      setSelectedTags([]);
    }
  }, [editTask, prefilledPatient, prefilledTemplate, setValue, reset, open]);

  const onSubmit = (data: FormValues) => {
    if (editTask) {
      updateTask(editTask.id, {
        ...data,
        tags: selectedTags,
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      });
    } else {
      addTask({
        ...data,
        tags: selectedTags,
        status: "pending",
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      });
    }
    onOpenChange(false);
  };

  const handleTagToggle = (tag: TaskTag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editTask ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {editTask
              ? "Update the task details below"
              : "Enter the details for the new task"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientName" className="text-right">
                Patient
              </Label>
              <Input
                id="patientName"
                placeholder="Patient name"
                className="col-span-3"
                {...register("patientName", { required: true })}
                readOnly={!!prefilledPatient}
              />
              {errors.patientName && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  Patient name is required
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patientId" className="text-right">
                Patient ID
              </Label>
              <Input
                id="patientId"
                placeholder="Patient ID"
                className="col-span-3"
                {...register("patientId", { required: true })}
                readOnly={!!prefilledPatient}
              />
              {errors.patientId && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  Patient ID is required
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bedNumber" className="text-right">
                Bed Number
              </Label>
              <Input
                id="bedNumber"
                placeholder="e.g. A3"
                className="col-span-3"
                {...register("bedNumber", { required: true })}
              />
              {errors.bedNumber && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  Bed number is required
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="doctor" className="text-right">
                Doctor
              </Label>
              <Input
                id="doctor"
                placeholder="Allocated doctor"
                className="col-span-3"
                {...register("doctor", { required: true })}
              />
              {errors.doctor && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  Doctor is required
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Task
              </Label>
              <Textarea
                id="description"
                placeholder="Task description"
                className="col-span-3"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm col-start-2 col-span-3">
                  Task description is required
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select
                onValueChange={(value: TaskPriority) =>
                  setValue("priority", value)
                }
                defaultValue={editTask?.priority || "medium"}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="datetime-local"
                className="col-span-3"
                {...register("dueDate")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Tags</Label>
              <div className="flex flex-col gap-2 col-span-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tag-practical"
                    checked={selectedTags.includes("practical")}
                    onCheckedChange={() => handleTagToggle("practical")}
                  />
                  <label
                    htmlFor="tag-practical"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Practical
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tag-prescribing"
                    checked={selectedTags.includes("prescribing")}
                    onCheckedChange={() => handleTagToggle("prescribing")}
                  />
                  <label
                    htmlFor="tag-prescribing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Prescribing
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tag-referrals"
                    checked={selectedTags.includes("referrals")}
                    onCheckedChange={() => handleTagToggle("referrals")}
                  />
                  <label
                    htmlFor="tag-referrals"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Referrals
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tag-discharge"
                    checked={selectedTags.includes("discharge")}
                    onCheckedChange={() => handleTagToggle("discharge")}
                  />
                  <label
                    htmlFor="tag-discharge"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Discharge Summaries
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Additional notes"
                className="col-span-3"
                {...register("notes")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{editTask ? "Update" : "Add"} Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
