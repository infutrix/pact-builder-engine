import { CheckCircle, Clock, User, ChevronRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ApprovalItem {
  id: string;
  employee: string;
  client: string;
  period: string;
  hours: number;
  amount: number;
  submittedAt: string;
  stages: {
    name: string;
    status: "complete" | "current" | "pending";
    approver?: string;
    date?: string;
  }[];
}

const approvals: ApprovalItem[] = [
  {
    id: "A-001",
    employee: "Sarah Johnson",
    client: "Acme Corp",
    period: "Jan 20-26, 2026",
    hours: 42.5,
    amount: 3612.5,
    submittedAt: "2h ago",
    stages: [
      { name: "Submitted", status: "complete", approver: "System", date: "Jan 27" },
      { name: "Supervisor", status: "complete", approver: "John Manager", date: "Jan 27" },
      { name: "Finance", status: "current", approver: "Pending" },
      { name: "Final", status: "pending" },
    ],
  },
  {
    id: "A-002",
    employee: "Michael Chen",
    client: "TechStart Inc",
    period: "Jan 20-26, 2026",
    hours: 40,
    amount: 3800,
    submittedAt: "4h ago",
    stages: [
      { name: "Submitted", status: "complete", approver: "System", date: "Jan 27" },
      { name: "Supervisor", status: "current", approver: "Pending" },
      { name: "Finance", status: "pending" },
      { name: "Final", status: "pending" },
    ],
  },
  {
    id: "A-003",
    employee: "Emily Davis",
    client: "Global Solutions",
    period: "Jan 20-26, 2026",
    hours: 38.5,
    amount: 2887.5,
    submittedAt: "1d ago",
    stages: [
      { name: "Submitted", status: "complete", approver: "System", date: "Jan 26" },
      { name: "Supervisor", status: "complete", approver: "Lisa Lead", date: "Jan 26" },
      { name: "Finance", status: "complete", approver: "Mark CFO", date: "Jan 27" },
      { name: "Final", status: "complete", approver: "Auto", date: "Jan 27" },
    ],
  },
];

export default function Approvals() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Approval Workflow</h1>
          <p className="text-muted-foreground">
            Track and manage timesheet approvals through the workflow stages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-warning text-warning px-3 py-1">
            <Clock className="mr-1.5 h-3 w-3" />
            12 Pending
          </Badge>
          <Badge variant="outline" className="border-success text-success px-3 py-1">
            <CheckCircle className="mr-1.5 h-3 w-3" />
            45 Approved
          </Badge>
        </div>
      </div>

      {/* Approval Cards */}
      <div className="space-y-4">
        {approvals.map((approval) => {
          const currentStage = approval.stages.find((s) => s.status === "current");
          const isComplete = approval.stages.every((s) => s.status === "complete");

          return (
            <div
              key={approval.id}
              className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {approval.employee.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{approval.employee}</h3>
                    <p className="text-sm text-muted-foreground">
                      {approval.client} • {approval.period}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-card-foreground">
                    ${approval.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{approval.hours}h total</p>
                </div>
              </div>

              {/* Workflow Stages */}
              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {approval.stages.map((stage, index) => (
                  <div key={stage.name} className="flex items-center shrink-0">
                    <div
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all ${
                        stage.status === "complete"
                          ? "bg-success/10 text-success"
                          : stage.status === "current"
                          ? "bg-accent/10 text-accent border border-accent/30 shadow-sm"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {stage.status === "complete" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : stage.status === "current" ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <div className="text-sm">
                        <p className="font-medium">{stage.name}</p>
                        {stage.approver && (
                          <p className="text-xs opacity-75">{stage.approver}</p>
                        )}
                      </div>
                    </div>
                    {index < approval.stages.length - 1 && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground mx-1.5" />
                    )}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">
                  Submitted {approval.submittedAt}
                </span>
                {!isComplete && currentStage && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">
                      <X className="mr-1.5 h-4 w-4" />
                      Reject
                    </Button>
                    <Button size="sm" className="gradient-accent text-accent-foreground shadow-sm">
                      <Check className="mr-1.5 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                )}
                {isComplete && (
                  <Badge className="bg-success text-success-foreground px-3 py-1">
                    <CheckCircle className="mr-1.5 h-3 w-3" />
                    Fully Approved
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
