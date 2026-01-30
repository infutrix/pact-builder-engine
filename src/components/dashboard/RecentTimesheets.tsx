import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";

const timesheets = [
  {
    id: "TS-001",
    employee: "Sarah Johnson",
    client: "Acme Corp",
    period: "Jan 20-26, 2026",
    hours: 42.5,
    status: "pending",
    confidence: 98,
  },
  {
    id: "TS-002",
    employee: "Michael Chen",
    client: "TechStart Inc",
    period: "Jan 20-26, 2026",
    hours: 40.0,
    status: "validated",
    confidence: 100,
  },
  {
    id: "TS-003",
    employee: "Emily Davis",
    client: "Global Solutions",
    period: "Jan 20-26, 2026",
    hours: 38.5,
    status: "exception",
    confidence: 72,
  },
  {
    id: "TS-004",
    employee: "James Wilson",
    client: "Acme Corp",
    period: "Jan 20-26, 2026",
    hours: 45.0,
    status: "approved",
    confidence: 95,
  },
  {
    id: "TS-005",
    employee: "Lisa Thompson",
    client: "Retail Plus",
    period: "Jan 20-26, 2026",
    hours: 40.0,
    status: "pending",
    confidence: 88,
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "outline" as const,
    icon: Clock,
    className: "border-warning text-warning",
  },
  validated: {
    label: "Validated",
    variant: "outline" as const,
    icon: CheckCircle,
    className: "border-accent text-accent",
  },
  exception: {
    label: "Exception",
    variant: "destructive" as const,
    icon: XCircle,
    className: "",
  },
  approved: {
    label: "Approved",
    variant: "outline" as const,
    icon: CheckCircle,
    className: "border-success text-success",
  },
};

export function RecentTimesheets() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card animate-slide-up">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Recent Timesheets</h3>
          <p className="text-sm text-muted-foreground">Latest processed submissions</p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="divide-y divide-border">
        {timesheets.map((timesheet) => {
          const config = statusConfig[timesheet.status as keyof typeof statusConfig];
          const StatusIcon = config.icon;
          
          return (
            <div
              key={timesheet.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
                  {timesheet.employee.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{timesheet.employee}</p>
                  <p className="text-sm text-muted-foreground">
                    {timesheet.client} • {timesheet.period}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-card-foreground">{timesheet.hours}h</p>
                  <p className="text-xs text-muted-foreground">
                    {timesheet.confidence}% confidence
                  </p>
                </div>
                
                <Badge variant={config.variant} className={config.className}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {config.label}
                </Badge>
                
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
