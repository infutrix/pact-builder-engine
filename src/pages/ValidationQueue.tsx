import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ValidationItem {
  id: string;
  employee: string;
  client: string;
  period: string;
  hours: number;
  rate: number;
  confidence: number;
  exceptions: string[];
  status: "pending" | "validated" | "rejected";
}

const mockData: ValidationItem[] = [
  {
    id: "V-001",
    employee: "Sarah Johnson",
    client: "Acme Corp",
    period: "Jan 20-26",
    hours: 42.5,
    rate: 85,
    confidence: 98,
    exceptions: [],
    status: "pending",
  },
  {
    id: "V-002",
    employee: "Michael Chen",
    client: "TechStart Inc",
    period: "Jan 20-26",
    hours: 48,
    rate: 95,
    confidence: 92,
    exceptions: ["Overtime exceeds limit"],
    status: "pending",
  },
  {
    id: "V-003",
    employee: "Emily Davis",
    client: "Global Solutions",
    period: "Jan 20-26",
    hours: 38.5,
    rate: 75,
    confidence: 72,
    exceptions: ["Low OCR confidence", "Missing supervisor"],
    status: "pending",
  },
  {
    id: "V-004",
    employee: "James Wilson",
    client: "Acme Corp",
    period: "Jan 20-26",
    hours: 40,
    rate: 80,
    confidence: 99,
    exceptions: [],
    status: "validated",
  },
  {
    id: "V-005",
    employee: "Lisa Thompson",
    client: "Retail Plus",
    period: "Jan 20-26",
    hours: 35,
    rate: 70,
    confidence: 45,
    exceptions: ["Rate mismatch", "Unreadable signature"],
    status: "pending",
  },
];

export default function ValidationQueue() {
  const [items] = useState<ValidationItem[]>(mockData);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === items.length) {
      setSelected([]);
    } else {
      setSelected(items.map((i) => i.id));
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Validation Queue</h1>
          <p className="text-muted-foreground">
            Review and validate extracted timesheet data before approval.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="exceptions">With Exceptions</SelectItem>
              <SelectItem value="low-confidence">Low Confidence</SelectItem>
              <SelectItem value="pending">Pending Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg bg-accent/10 border border-accent/20 p-4 animate-scale-in">
          <span className="font-medium text-accent">{selected.length} selected</span>
          <div className="flex-1" />
          <Button variant="outline" size="sm" className="border-success text-success hover:bg-success/10">
            <CheckCircle className="mr-2 h-4 w-4" />
            Validate All
          </Button>
          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">
            <XCircle className="mr-2 h-4 w-4" />
            Reject All
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-4 text-left">
                <Checkbox
                  checked={selected.length === items.length}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Employee</th>
              <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Client</th>
              <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Period</th>
              <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Hours</th>
              <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Rate</th>
              <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Confidence</th>
              <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Exceptions</th>
              <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-muted/30 transition-colors ${
                  selected.includes(item.id) ? "bg-accent/5" : ""
                }`}
              >
                <td className="p-4">
                  <Checkbox
                    checked={selected.includes(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-semibold">
                      {item.employee.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-medium text-card-foreground">{item.employee}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{item.client}</td>
                <td className="p-4 text-muted-foreground">{item.period}</td>
                <td className="p-4 font-medium text-card-foreground">{item.hours}h</td>
                <td className="p-4 text-muted-foreground">${item.rate}/hr</td>
                <td className="p-4">
                  <span className={`font-semibold ${getConfidenceColor(item.confidence)}`}>
                    {item.confidence}%
                  </span>
                </td>
                <td className="p-4">
                  {item.exceptions.length > 0 ? (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <Badge variant="outline" className="border-warning text-warning">
                        {item.exceptions.length}
                      </Badge>
                    </div>
                  ) : (
                    <Badge variant="outline" className="border-success text-success">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Clear
                    </Badge>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
