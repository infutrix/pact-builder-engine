import { Upload, ClipboardCheck, FileDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    label: "Upload Timesheets",
    description: "Import new timesheet files",
    icon: Upload,
    variant: "default" as const,
    className: "gradient-primary text-primary-foreground hover:opacity-90",
  },
  {
    label: "Run Validation",
    description: "Validate pending timesheets",
    icon: ClipboardCheck,
    variant: "outline" as const,
    className: "",
  },
  {
    label: "Export to OCS",
    description: "Sync approved timesheets",
    icon: FileDown,
    variant: "outline" as const,
    className: "",
  },
  {
    label: "Refresh Data",
    description: "Pull latest updates",
    icon: RefreshCw,
    variant: "outline" as const,
    className: "",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card animate-slide-up">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className={`h-auto flex-col items-start gap-1 p-4 ${action.className}`}
          >
            <div className="flex items-center gap-2">
              <action.icon className="h-4 w-4" />
              <span className="font-medium">{action.label}</span>
            </div>
            <span className="text-xs opacity-80">{action.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
