
import React, { useRef, useState } from "react";
import { Task, TaskTag, TaskPriority } from "@/types/task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ChevronLeft, ChevronRight, FileText, Download, Printer, FlaskConical, FileOutput, Droplets } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import html2pdf from "html2pdf.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface TaskTemplate {
  name: string;
  description: string;
  priority: TaskPriority;
  tags: TaskTag[];
  notes?: string;
}

export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    name: "Liver Screen Bloods",
    description: "Liver screen bloods - LFTs, Coag, Hep B/C, HIV, Ferritin, Caeruloplasmin, A1AT, ANA, SMA, AMA, Immunoglobulins",
    priority: "medium",
    tags: ["practical"],
    notes: "Fasting sample preferred. Check hepatology guidelines for additional tests if indicated."
  },
  {
    name: "Discharge Summary",
    description: "Complete discharge summary for patient",
    priority: "high",
    tags: ["discharge"],
    notes: "Include: diagnosis, investigations, treatment, follow-up plan, GP actions, medications on discharge."
  },
  {
    name: "Blood Cultures",
    description: "Blood cultures x2 sets from different sites",
    priority: "high",
    tags: ["practical"],
    notes: "Take before antibiotics if possible. Peripheral and central line if applicable."
  }
];

export interface PatientInfo {
  id: string;
  name: string;
  bedNumber: string;
  doctor: string;
}

interface PatientTaskGridProps {
  tasks: Task[];
  onAddTaskForPatient: (patientInfo: PatientInfo, template?: TaskTemplate) => void;
  onEditTask: (task: Task) => void;
}

export const PatientTaskGrid: React.FC<PatientTaskGridProps> = ({ 
  tasks, 
  onAddTaskForPatient,
  onEditTask
}) => {
  // Group tasks by patient
  const tasksByPatient: Record<string, Task[]> = {};
  
  tasks.forEach(task => {
    if (!tasksByPatient[task.patientId]) {
      tasksByPatient[task.patientId] = [];
    }
    tasksByPatient[task.patientId].push(task);
  });

  const isMobile = useIsMobile();
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const scroll = (patientId: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[patientId];
    if (container) {
      const scrollAmount = 150;
      container.scrollBy({
        top: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getHandoverHTML = () => {
    const date = new Date().toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <div style="font-family: Arial, sans-serif; font-size: 11px; padding: 10px;">
        <h1 style="font-size: 16px; margin-bottom: 5px;">Patient Handover</h1>
        <p style="color: #666; margin-bottom: 10px; font-size: 10px;">Generated: ${date}</p>
        
        ${Object.entries(tasksByPatient).map(([patientId, patientTasks]) => {
          const patient = patientTasks[0];
          return `
            <div style="margin-bottom: 12px; page-break-inside: avoid;">
              <div style="background: #f3f4f6; padding: 6px 10px; border-radius: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: bold; font-size: 12px;">${patient.patientName}</span>
                <span style="color: #666; font-size: 10px;">Bed: ${patient.bedNumber} | Dr: ${patient.doctor}</span>
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
                <thead>
                  <tr>
                    <th style="background: #e5e7eb; padding: 5px 8px; text-align: left; font-weight: 600; border: 1px solid #d1d5db; width: 5%;">#</th>
                    <th style="background: #e5e7eb; padding: 5px 8px; text-align: left; font-weight: 600; border: 1px solid #d1d5db; width: 35%;">Task</th>
                    <th style="background: #e5e7eb; padding: 5px 8px; text-align: left; font-weight: 600; border: 1px solid #d1d5db; width: 10%;">Priority</th>
                    <th style="background: #e5e7eb; padding: 5px 8px; text-align: left; font-weight: 600; border: 1px solid #d1d5db; width: 10%;">Status</th>
                    <th style="background: #e5e7eb; padding: 5px 8px; text-align: left; font-weight: 600; border: 1px solid #d1d5db; width: 20%;">Tags</th>
                    <th style="background: #e5e7eb; padding: 5px 8px; text-align: left; font-weight: 600; border: 1px solid #d1d5db; width: 20%;">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  ${patientTasks.map((task, index) => {
                    const priorityColor = task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#f59e0b' : '#22c55e';
                    const statusBg = task.status === 'complete' ? '#dcfce7' : task.status === 'progress' ? '#dbeafe' : '#fef3c7';
                    const statusColor = task.status === 'complete' ? '#166534' : task.status === 'progress' ? '#1e40af' : '#92400e';
                    return `
                      <tr>
                        <td style="padding: 5px 8px; border: 1px solid #d1d5db; vertical-align: top;">${index + 1}</td>
                        <td style="padding: 5px 8px; border: 1px solid #d1d5db; vertical-align: top;">${task.description}</td>
                        <td style="padding: 5px 8px; border: 1px solid #d1d5db; vertical-align: top; color: ${priorityColor}; font-weight: ${task.priority === 'high' ? 'bold' : 'normal'};">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</td>
                        <td style="padding: 5px 8px; border: 1px solid #d1d5db; vertical-align: top;"><span style="background: ${statusBg}; color: ${statusColor}; padding: 2px 6px; border-radius: 3px; font-size: 9px;">${task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span></td>
                        <td style="padding: 5px 8px; border: 1px solid #d1d5db; vertical-align: top;">${task.tags.map(tag => `<span style="background: #e0e7ff; color: #3730a3; padding: 1px 5px; border-radius: 3px; font-size: 9px; margin-right: 4px;">${tag}</span>`).join('')}</td>
                        <td style="padding: 5px 8px; border: 1px solid #d1d5db; vertical-align: top;">${task.notes || '-'}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `;
        }).join('')}
      </div>
    `;
  };

  const handlePrint = () => {
    const date = new Date().toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Please allow popups to print handover");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Patient Handover - ${date}</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; font-size: 11px; padding: 10px; }
          .no-print { margin-bottom: 10px; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="no-print">
          <button onclick="window.print()" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 8px;">Print</button>
          <button onclick="window.close()" style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
        </div>
        ${getHandoverHTML()}
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    toast.success("Handover ready to print!");
  };

  const handleExportPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = getHandoverHTML();
    
    const date = new Date().toISOString().split('T')[0];
    const filename = `patient-handover-${date}.pdf`;

    const opt = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    toast.loading("Generating PDF...", { id: 'pdf-export' });
    
    html2pdf().set(opt).from(element).save().then(() => {
      toast.success("PDF downloaded successfully!", { id: 'pdf-export' });
    }).catch(() => {
      toast.error("Failed to generate PDF", { id: 'pdf-export' });
    });
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        {Object.entries(tasksByPatient).map(([patientId, patientTasks]) => (
          <Card key={patientId} className="shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-bold">{patientTasks[0].patientName}</CardTitle>
                    <Badge variant="outline" className="text-xs">{patientTasks[0].bedNumber}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{patientTasks[0].doctor}</p>
                </div>
                <DropdownMenu onOpenChange={(open) => setOpenDropdownId(open ? patientId : null)}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-8 w-8 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background z-50 w-56">
                    <DropdownMenuItem 
                      onClick={() => onAddTaskForPatient({ id: patientId, name: patientTasks[0].patientName, bedNumber: patientTasks[0].bedNumber, doctor: patientTasks[0].doctor })}
                      className="cursor-pointer font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Custom Task
                    </DropdownMenuItem>
                    <div className="h-px bg-border my-1" />
                    {TASK_TEMPLATES.map((template) => (
                      <DropdownMenuItem 
                        key={template.name}
                        onClick={() => onAddTaskForPatient({ id: patientId, name: patientTasks[0].patientName, bedNumber: patientTasks[0].bedNumber, doctor: patientTasks[0].doctor }, template)}
                        className="cursor-pointer"
                      >
                        {template.name === "Liver Screen Bloods" && <FlaskConical className="h-4 w-4 mr-2" />}
                        {template.name === "Discharge Summary" && <FileOutput className="h-4 w-4 mr-2" />}
                        {template.name === "Blood Cultures" && <Droplets className="h-4 w-4 mr-2" />}
                        {template.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className={`pb-3 transition-all duration-200 ${openDropdownId === patientId ? 'blur-sm opacity-50' : ''}`}>
              <div className="flex gap-2">
                <div 
                  ref={(el) => scrollRefs.current[patientId] = el}
                  className="flex-1 flex flex-col gap-3 overflow-y-auto snap-y snap-mandatory scrollbar-hide max-h-[200px]"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {patientTasks.map(task => (
                    <div key={task.id} className="snap-start">
                      <TaskCard 
                        task={task} 
                        onEdit={onEditTask} 
                        hidePatientInfo={true}
                        compact={true} 
                      />
                    </div>
                  ))}
                </div>
                {patientTasks.length > 1 && (
                  <div className="flex flex-col justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full"
                      onClick={() => scroll(patientId, 'left')}
                    >
                      <ChevronLeft className="h-4 w-4 rotate-90" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full"
                      onClick={() => scroll(patientId, 'right')}
                    >
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {Object.keys(tasksByPatient).length > 0 && (
          <div className="flex gap-2">
            <Button 
              onClick={handlePrint}
              className="flex-1"
              variant="outline"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Handover
            </Button>
            <Button 
              onClick={handleExportPDF}
              className="flex-1"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(tasksByPatient).map(([patientId, patientTasks]) => (
          <Card key={patientId} className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg font-bold">{patientTasks[0].patientName}</CardTitle>
                    <Badge variant="outline">{patientTasks[0].bedNumber}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{patientTasks[0].doctor}</p>
                </div>
                <DropdownMenu onOpenChange={(open) => setOpenDropdownId(open ? patientId : null)}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-8 w-8 rounded-full"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background z-50 w-56">
                    <DropdownMenuItem 
                      onClick={() => onAddTaskForPatient({ id: patientId, name: patientTasks[0].patientName, bedNumber: patientTasks[0].bedNumber, doctor: patientTasks[0].doctor })}
                      className="cursor-pointer font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Custom Task
                    </DropdownMenuItem>
                    <div className="h-px bg-border my-1" />
                    {TASK_TEMPLATES.map((template) => (
                      <DropdownMenuItem 
                        key={template.name}
                        onClick={() => onAddTaskForPatient({ id: patientId, name: patientTasks[0].patientName, bedNumber: patientTasks[0].bedNumber, doctor: patientTasks[0].doctor }, template)}
                        className="cursor-pointer"
                      >
                        {template.name === "Liver Screen Bloods" && <FlaskConical className="h-4 w-4 mr-2" />}
                        {template.name === "Discharge Summary" && <FileOutput className="h-4 w-4 mr-2" />}
                        {template.name === "Blood Cultures" && <Droplets className="h-4 w-4 mr-2" />}
                        {template.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className={`transition-all duration-200 ${openDropdownId === patientId ? 'blur-sm opacity-50' : ''}`}>
              <div className="flex gap-2">
                <div 
                  ref={(el) => scrollRefs.current[patientId] = el}
                  className="flex-1 flex flex-col gap-3 overflow-y-auto snap-y snap-mandatory scrollbar-hide max-h-[250px]"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {patientTasks.map(task => (
                    <div key={task.id} className="snap-start">
                      <TaskCard 
                        task={task} 
                        onEdit={onEditTask} 
                        hidePatientInfo={true}
                      />
                    </div>
                  ))}
                </div>
                {patientTasks.length > 1 && (
                  <div className="flex flex-col justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full"
                      onClick={() => scroll(patientId, 'left')}
                    >
                      <ChevronLeft className="h-4 w-4 rotate-90" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 rounded-full"
                      onClick={() => scroll(patientId, 'right')}
                    >
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {Object.keys(tasksByPatient).length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <Button 
            onClick={handlePrint}
            variant="outline"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Handover
          </Button>
          <Button 
            onClick={handleExportPDF}
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      )}
    </div>
  );
};
