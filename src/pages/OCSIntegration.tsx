import { useState } from "react";
import { 
  Link2, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Server,
  Activity,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SyncRecord {
  id: string;
  type: "push" | "pull";
  entity: string;
  recordCount: number;
  status: "success" | "failed" | "pending" | "retrying";
  timestamp: string;
  duration: string;
  errorMessage?: string;
}

interface ApiLog {
  id: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  status: number;
  timestamp: string;
  responseTime: string;
}

const syncRecords: SyncRecord[] = [
  { id: "S-001", type: "push", entity: "Timesheets", recordCount: 156, status: "success", timestamp: "2 min ago", duration: "1.2s" },
  { id: "S-002", type: "push", entity: "Employees", recordCount: 42, status: "success", timestamp: "5 min ago", duration: "0.8s" },
  { id: "S-003", type: "pull", entity: "Pay Rates", recordCount: 89, status: "success", timestamp: "15 min ago", duration: "2.1s" },
  { id: "S-004", type: "push", entity: "Timesheets", recordCount: 23, status: "failed", timestamp: "1 hr ago", duration: "4.5s", errorMessage: "Connection timeout" },
  { id: "S-005", type: "pull", entity: "Clients", recordCount: 0, status: "retrying", timestamp: "1 hr ago", duration: "-" },
  { id: "S-006", type: "push", entity: "Approvals", recordCount: 118, status: "success", timestamp: "2 hr ago", duration: "3.2s" },
];

const apiLogs: ApiLog[] = [
  { id: "L-001", endpoint: "/api/v1/timesheets/batch", method: "POST", status: 200, timestamp: "10:45:32 AM", responseTime: "234ms" },
  { id: "L-002", endpoint: "/api/v1/employees", method: "GET", status: 200, timestamp: "10:45:30 AM", responseTime: "89ms" },
  { id: "L-003", endpoint: "/api/v1/rates/sync", method: "PUT", status: 200, timestamp: "10:30:15 AM", responseTime: "156ms" },
  { id: "L-004", endpoint: "/api/v1/timesheets/batch", method: "POST", status: 504, timestamp: "09:45:00 AM", responseTime: "30000ms" },
  { id: "L-005", endpoint: "/api/v1/clients", method: "GET", status: 503, timestamp: "09:44:30 AM", responseTime: "5000ms" },
];

const statusConfig = {
  success: { label: "Success", icon: CheckCircle, className: "bg-success/10 text-success border-success/20" },
  failed: { label: "Failed", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
  pending: { label: "Pending", icon: Clock, className: "bg-muted text-muted-foreground border-border" },
  retrying: { label: "Retrying", icon: RefreshCw, className: "bg-warning/10 text-warning border-warning/20" },
};

export default function OCSIntegration() {
  const [isRetrying, setIsRetrying] = useState<string | null>(null);

  const handleRetry = (id: string) => {
    setIsRetrying(id);
    setTimeout(() => setIsRetrying(null), 2000);
  };

  const successRate = Math.round((syncRecords.filter(r => r.status === "success").length / syncRecords.length) * 100);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">OCS Integration</h1>
          <p className="text-muted-foreground">
            Monitor and manage data synchronization with the Oracle Cloud Suite.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button size="sm" className="gradient-accent text-accent-foreground">
            <Zap className="mr-2 h-4 w-4" />
            Force Refresh
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10">
              <Server className="h-5 w-5 text-success" />
            </div>
            <Badge variant="outline" className="border-success text-success">Online</Badge>
          </div>
          <p className="mt-4 text-2xl font-bold text-card-foreground">Connected</p>
          <p className="text-sm text-muted-foreground">OCS API Status</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
              <Activity className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Last 24h</span>
          </div>
          <p className="mt-4 text-2xl font-bold text-card-foreground">{successRate}%</p>
          <p className="text-sm text-muted-foreground">Sync Success Rate</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary">
              <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Records</span>
          </div>
          <p className="mt-4 text-2xl font-bold text-card-foreground">316</p>
          <p className="text-sm text-muted-foreground">Pushed Today</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-accent">
              <ArrowDownLeft className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Records</span>
          </div>
          <p className="mt-4 text-2xl font-bold text-card-foreground">89</p>
          <p className="text-sm text-muted-foreground">Pulled Today</p>
        </div>
      </div>

      {/* Sync Status */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Sync History</h3>
            <p className="text-sm text-muted-foreground">Recent data synchronization operations</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-success text-success">
              <CheckCircle className="mr-1 h-3 w-3" />
              {syncRecords.filter(r => r.status === "success").length} Success
            </Badge>
            <Badge variant="outline" className="border-destructive text-destructive">
              <XCircle className="mr-1 h-3 w-3" />
              {syncRecords.filter(r => r.status === "failed").length} Failed
            </Badge>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Entity</TableHead>
              <TableHead className="font-semibold">Records</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Duration</TableHead>
              <TableHead className="font-semibold">Timestamp</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {syncRecords.map((record) => {
              const config = statusConfig[record.status];
              const StatusIcon = config.icon;

              return (
                <TableRow key={record.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {record.type === "push" ? (
                        <ArrowUpRight className="h-4 w-4 text-accent" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4 text-primary" />
                      )}
                      <span className="font-medium capitalize">{record.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-card-foreground">{record.entity}</TableCell>
                  <TableCell>{record.recordCount > 0 ? record.recordCount : "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={config.className}>
                      <StatusIcon className={`mr-1 h-3 w-3 ${record.status === "retrying" ? "animate-spin" : ""}`} />
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.duration}</TableCell>
                  <TableCell className="text-muted-foreground">{record.timestamp}</TableCell>
                  <TableCell className="text-right">
                    {(record.status === "failed" || record.status === "retrying") && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRetry(record.id)}
                        disabled={isRetrying === record.id}
                      >
                        <RefreshCw className={`mr-1 h-4 w-4 ${isRetrying === record.id ? "animate-spin" : ""}`} />
                        {isRetrying === record.id ? "Retrying..." : "Retry"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* API Logs */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">API Request Log</h3>
            <p className="text-sm text-muted-foreground">Recent API calls to OCS endpoints</p>
          </div>
          <Button variant="outline" size="sm">
            View Full Log
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold">Endpoint</TableHead>
              <TableHead className="font-semibold">Method</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Response Time</TableHead>
              <TableHead className="font-semibold">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiLogs.map((log) => {
              const isError = log.status >= 400;
              const methodColors: Record<string, string> = {
                GET: "bg-accent/10 text-accent",
                POST: "bg-success/10 text-success",
                PUT: "bg-warning/10 text-warning",
                DELETE: "bg-destructive/10 text-destructive",
              };

              return (
                <TableRow key={log.id} className="hover:bg-muted/30">
                  <TableCell>
                    <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                      {log.endpoint}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={methodColors[log.method]}>
                      {log.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-mono font-medium ${isError ? "text-destructive" : "text-success"}`}>
                      {log.status}
                    </span>
                  </TableCell>
                  <TableCell className={`text-muted-foreground ${parseInt(log.responseTime) > 1000 ? "text-warning font-medium" : ""}`}>
                    {log.responseTime}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
