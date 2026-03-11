import { Wifi, Users, Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  type?: "connection" | "users" | "views" | "time";
  count?: number;
  label?: string;
  className?: string;
}

export function LiveIndicator({
  type = "connection",
  count,
  label,
  className,
}: LiveIndicatorProps) {
  const icons = {
    connection: Wifi,
    users: Users,
    views: Eye,
    time: Clock,
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <Icon className="h-3 w-3 text-green-600 dark:text-green-400" />
      {count !== undefined && (
        <span className="text-green-700 dark:text-green-300 font-semibold">
          {count.toLocaleString()}
        </span>
      )}
      {label && (
        <span className="text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}

interface LiveStatsCardProps {
  activeUsers: number;
  totalViews: number;
  applicationsToday: number;
  lastUpdated: string;
  className?: string;
}

export function LiveStatsCard({
  activeUsers,
  totalViews,
  applicationsToday,
  lastUpdated,
  className,
}: LiveStatsCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-4 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-foreground text-sm">
          Live Activity
        </h3>
        <LiveIndicator type="connection" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <LiveIndicator type="users" count={activeUsers} />
          <p className="text-xs text-muted-foreground mt-1">Active Users</p>
        </div>
        <div className="text-center">
          <LiveIndicator type="views" count={totalViews} />
          <p className="text-xs text-muted-foreground mt-1">Total Views</p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-xs">
            <span className="text-amber-600 font-semibold">
              {applicationsToday}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Applications</p>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground text-center mt-3">
        Updated {new Date(lastUpdated).toLocaleTimeString()}
      </p>
    </div>
  );
}

export default LiveIndicator;

