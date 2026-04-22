
export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "complete" | "pending" | "progress";
export type TaskTag = "practical" | "prescribing" | "referrals" | "discharge";

export interface Task {
  id: string;
  patientName: string;
  patientId: string;
  bedNumber: string;
  doctor: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  tags: TaskTag[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  notes?: string;
}
