import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const stages = [
  { label: "Ingested", count: 156, total: 156, complete: true },
  { label: "Validated", count: 142, total: 156, complete: false },
  { label: "Approved", count: 128, total: 156, complete: false },
  { label: "OCS Synced", count: 118, total: 156, complete: false },
];

export function PayrollProgress() {
  const totalProgress = Math.round((118 / 156) * 100);
  
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-card-foreground">Payroll Cycle Progress</h3>
          <span className="text-2xl font-bold text-accent">{totalProgress}%</span>
        </div>
        <p className="text-sm text-muted-foreground">Week of Jan 20-26, 2026</p>
      </div>
      
      <div className="relative mb-6">
        <Progress value={totalProgress} className="h-3" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-soft pointer-events-none rounded-full" />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage, index) => {
          const percentage = Math.round((stage.count / stage.total) * 100);
          const isComplete = stage.count === stage.total;
          const hasIssues = percentage < 80 && !isComplete;
          
          return (
            <div key={stage.label} className="text-center">
              <div className="flex justify-center mb-2">
                {isComplete ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                ) : hasIssues ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-card-foreground">{stage.label}</p>
              <p className="text-xs text-muted-foreground">
                {stage.count}/{stage.total}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
