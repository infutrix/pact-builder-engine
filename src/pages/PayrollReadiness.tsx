import { useState } from "react";
import {
  DollarSign,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileSpreadsheet,
  RefreshCw,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const payrollData = [
  {
    id: "PR-001",
    employee: "John Smith",
    department: "Engineering",
    regularHours: 160,
    overtime: 12,
    totalPay: 8420.0,
    status: "ready",
  },
  {
    id: "PR-002",
    employee: "Sarah Johnson",
    department: "Marketing",
    regularHours: 160,
    overtime: 0,
    totalPay: 6200.0,
    status: "ready",
  },
  {
    id: "PR-003",
    employee: "Mike Chen",
    department: "Engineering",
    regularHours: 152,
    overtime: 8,
    totalPay: 7680.0,
    status: "pending",
  },
  {
    id: "PR-004",
    employee: "Emily Davis",
    department: "Finance",
    regularHours: 160,
    overtime: 4,
    totalPay: 7100.0,
    status: "exception",
  },
  {
    id: "PR-005",
    employee: "Robert Wilson",
    department: "Operations",
    regularHours: 160,
    overtime: 20,
    totalPay: 6840.0,
    status: "ready",
  },
];

const reconciliationItems = [
  { category: "Total Regular Hours", submitted: 792, validated: 792, match: true },
  { category: "Total Overtime Hours", submitted: 44, validated: 44, match: true },
  { category: "Total Employees", submitted: 5, validated: 5, match: true },
  { category: "Total Gross Pay", submitted: 36240, validated: 36240, match: true },
];

export default function PayrollReadiness() {
  const [selectedPeriod, setSelectedPeriod] = useState("jan-2024");
  const [isExporting, setIsExporting] = useState(false);

  const readyCount = payrollData.filter((p) => p.status === "ready").length;
  const pendingCount = payrollData.filter((p) => p.status === "pending").length;
  const exceptionCount = payrollData.filter((p) => p.status === "exception").length;
  const readinessPercent = Math.round((readyCount / payrollData.length) * 100);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ready
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "exception":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/20">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Exception
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payroll Readiness</h1>
          <p className="text-muted-foreground mt-1">
            Review and export validated timesheets for payroll processing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jan-2024">January 2024</SelectItem>
              <SelectItem value="dec-2023">December 2023</SelectItem>
              <SelectItem value="nov-2023">November 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-primary hover:bg-primary/90"
          >
            {isExporting ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export to OCS
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Readiness</p>
                <p className="text-2xl font-bold text-foreground mt-1">{readinessPercent}%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={readinessPercent} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ready for Export</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{readyCount}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Exceptions</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{exceptionCount}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Data Table */}
        <Card className="lg:col-span-2 bg-card border-border shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                Payroll Summary
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <ArrowUpDown className="h-3.5 w-3.5 mr-1.5" />
                  Sort
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Employee</TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold text-right">Regular</TableHead>
                    <TableHead className="font-semibold text-right">OT</TableHead>
                    <TableHead className="font-semibold text-right">Total Pay</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollData.map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{row.employee}</TableCell>
                      <TableCell className="text-muted-foreground">{row.department}</TableCell>
                      <TableCell className="text-right">{row.regularHours}h</TableCell>
                      <TableCell className="text-right">{row.overtime}h</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${row.totalPay.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(row.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Reconciliation Panel */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Reconciliation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reconciliationItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.category}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Submitted: {item.submitted.toLocaleString()} | Validated:{" "}
                      {item.validated.toLocaleString()}
                    </p>
                  </div>
                  {item.match ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <p className="text-sm font-medium text-emerald-700">All data reconciled</p>
              </div>
              <p className="text-xs text-emerald-600/80 mt-1">
                Timesheet data matches across all validation checkpoints
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
