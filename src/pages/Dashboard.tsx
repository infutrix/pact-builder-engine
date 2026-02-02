import { FileSpreadsheet, ClipboardCheck, AlertTriangle, DollarSign, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTimesheets } from "@/components/dashboard/RecentTimesheets";
import { PayrollProgress } from "@/components/dashboard/PayrollProgress";
import { ExceptionsSummary } from "@/components/dashboard/ExceptionsSummary";
import { QuickActions } from "@/components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-accent mb-1">Welcome back, John 👋</p>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your timesheets today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
          <Clock className="h-3.5 w-3.5" />
          <span>Updated 2 min ago</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Timesheets"
          value="156"
          subtitle="This week"
          icon={<FileSpreadsheet className="h-6 w-6" />}
          trend={{ value: 12, direction: "up" }}
          variant="primary"
        />
        <StatCard
          title="Validated"
          value="142"
          subtitle="91% complete"
          icon={<ClipboardCheck className="h-6 w-6" />}
          trend={{ value: 8, direction: "up" }}
          variant="accent"
        />
        <StatCard
          title="Exceptions"
          value="28"
          subtitle="Require review"
          icon={<AlertTriangle className="h-6 w-6" />}
          trend={{ value: 5, direction: "down" }}
          variant="warning"
        />
        <StatCard
          title="Payroll Ready"
          value="$248.5K"
          subtitle="118 approved"
          icon={<DollarSign className="h-6 w-6" />}
          trend={{ value: 15, direction: "up" }}
          variant="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Timesheets - Full Width on Mobile, 2 Cols on Desktop */}
        <div className="lg:col-span-2">
          <RecentTimesheets />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <ExceptionsSummary />
        </div>
      </div>

      {/* Payroll Progress */}
      <PayrollProgress />
    </div>
  );
}
