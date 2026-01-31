import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  variant?: "default" | "primary" | "accent" | "success" | "warning";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const iconBgClasses = {
    default: "bg-secondary",
    primary: "gradient-primary",
    accent: "gradient-accent",
    success: "gradient-success",
    warning: "bg-warning",
  };

  const trendClasses = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  const TrendIcon = trend?.direction === "up" ? TrendingUp : trend?.direction === "down" ? TrendingDown : Minus;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground tracking-wide">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-card-foreground">{value}</p>
          {(subtitle || trend) && (
            <div className="flex items-center gap-2">
              {trend && (
                <div className={cn("flex items-center gap-1 text-sm font-medium", trendClasses[trend.direction])}>
                  <TrendIcon className="h-4 w-4" />
                  <span>{Math.abs(trend.value)}%</span>
                </div>
              )}
              {subtitle && (
                <span className="text-sm text-muted-foreground">{subtitle}</span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground shadow-sm",
            iconBgClasses[variant]
          )}
        >
          {icon}
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
