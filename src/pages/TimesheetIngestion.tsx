import { useState } from "react";
import { Upload, FileSpreadsheet, X, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "processing" | "complete" | "error";
  progress: number;
  confidence?: number;
}

const mockFiles: UploadedFile[] = [
  { id: "1", name: "Acme_Corp_Jan_Week3.xlsx", size: "245 KB", status: "complete", progress: 100, confidence: 98 },
  { id: "2", name: "TechStart_Timesheets.pdf", size: "1.2 MB", status: "complete", progress: 100, confidence: 95 },
  { id: "3", name: "GlobalSolutions_Jan2026.csv", size: "89 KB", status: "processing", progress: 65 },
];

export default function TimesheetIngestion() {
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Simulate file upload
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: "New_Timesheet.xlsx",
      size: "156 KB",
      status: "uploading",
      progress: 0,
    };
    setFiles([newFile, ...files]);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const statusConfig = {
    uploading: { label: "Uploading", icon: Clock, className: "border-muted-foreground text-muted-foreground" },
    processing: { label: "AI Processing", icon: Clock, className: "border-accent text-accent" },
    complete: { label: "Complete", icon: CheckCircle, className: "border-success text-success" },
    error: { label: "Error", icon: AlertCircle, className: "border-destructive text-destructive" },
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Timesheet Ingestion</h1>
        <p className="text-muted-foreground">
          Upload timesheets in any format — AI will extract and standardize the data.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragOver
            ? "border-accent bg-accent/5 scale-[1.01]"
            : "border-border bg-card hover:border-accent/50 hover:bg-muted/30"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
              isDragOver ? "gradient-accent scale-110 shadow-lg" : "bg-secondary"
            }`}
          >
            <Upload className={`h-8 w-8 transition-colors ${isDragOver ? "text-accent-foreground" : "text-muted-foreground"}`} />
          </div>
          <div>
            <p className="text-lg font-semibold text-card-foreground">
              {isDragOver ? "Drop files here" : "Drag & drop timesheets"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports Excel, PDF, CSV, images, and email attachments
            </p>
          </div>
          <div className="flex items-center gap-3 my-2">
            <div className="h-px w-12 bg-border" />
            <span className="text-xs text-muted-foreground font-medium">or</span>
            <div className="h-px w-12 bg-border" />
          </div>
          <Button className="gradient-primary text-primary-foreground shadow-sm hover:shadow-md transition-shadow">
            <Upload className="mr-2 h-4 w-4" />
            Browse Files
          </Button>
        </div>
      </div>

      {/* File List */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="border-b border-border p-5">
          <h3 className="text-lg font-semibold text-card-foreground tracking-tight">Recent Uploads</h3>
          <p className="text-sm text-muted-foreground">{files.length} files processed</p>
        </div>

        <div className="divide-y divide-border">
          {files.map((file) => {
            const config = statusConfig[file.status];
            const StatusIcon = config.icon;

            return (
              <div key={file.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                    <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-medium text-card-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{file.size}</p>
                    {file.status === "processing" && (
                      <Progress value={file.progress} className="h-1.5 w-48" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {file.confidence && (
                    <div className="text-right">
                      <p className="text-sm font-semibold text-card-foreground">{file.confidence}%</p>
                      <p className="text-xs text-muted-foreground">Confidence</p>
                    </div>
                  )}
                  <Badge variant="outline" className={config.className}>
                    <StatusIcon className={`mr-1 h-3 w-3 ${file.status === "processing" ? "animate-spin" : ""}`} />
                    {config.label}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)} className="hover:bg-destructive/10 hover:text-destructive">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
