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
          <h3 className="text-lg font-semibold text-card-foreground tracking-tight">Payroll Cycle Progress</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-accent">{totalProgress}%</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Week of Jan 20-26, 2026</p>
      </div>
      
      <div className="relative mb-8">
        <Progress value={totalProgress} className="h-3" />
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        {stages.map((stage, index) => {
          const percentage = Math.round((stage.count / stage.total) * 100);
          const isComplete = stage.count === stage.total;
          const hasIssues = percentage < 80 && !isComplete;
          
          return (
            <div key={stage.label} className="text-center group">
              <div className="flex justify-center mb-3">
                {isComplete ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 transition-transform group-hover:scale-110">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                ) : hasIssues ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10 transition-transform group-hover:scale-110">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 transition-transform group-hover:scale-110">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                )}
              </div>
              <p className="text-sm font-semibold text-card-foreground">{stage.label}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {stage.count} of {stage.total}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
