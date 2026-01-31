import { AlertTriangle, Clock, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const exceptions = [
  {
    type: "Overtime Anomaly",
    count: 8,
    severity: "high",
    icon: Clock,
    description: "Hours exceed standard weekly limit",
  },
  {
    type: "Rate Mismatch",
    count: 5,
    severity: "medium",
    icon: DollarSign,
    description: "Bill rate doesn't match contract",
  },
  {
    type: "Missing Approval",
    count: 12,
    severity: "medium",
    icon: Users,
    description: "Timesheet pending supervisor sign-off",
  },
  {
    type: "Low Confidence",
    count: 3,
    severity: "low",
    icon: AlertTriangle,
    description: "OCR confidence below threshold",
  },
];

const severityClasses = {
  high: "bg-destructive/10 text-destructive border-destructive/30",
  medium: "bg-warning/10 text-warning border-warning/30",
  low: "bg-accent/10 text-accent border-accent/30",
};

export function ExceptionsSummary() {
  const totalExceptions = exceptions.reduce((acc, e) => acc + e.count, 0);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground tracking-tight">Active Exceptions</h3>
          <p className="text-sm text-muted-foreground">{totalExceptions} items require attention</p>
        </div>
        <Button variant="outline" size="sm">
          Review All
        </Button>
      </div>

      <div className="space-y-3">
        {exceptions.map((exception) => (
          <div
            key={exception.type}
            className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:-translate-x-1 ${severityClasses[exception.severity]}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/50">
                <exception.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{exception.type}</p>
                <p className="text-xs opacity-75">{exception.description}</p>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background font-bold text-sm">
              {exception.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
