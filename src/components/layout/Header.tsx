import { Bell, Search, User, Settings, LogOut, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <Input
          placeholder="Search timesheets, employees, or type a command..."
          className="pl-10 h-9 bg-muted/30 border-0 rounded-full text-sm placeholder:text-muted-foreground/50 focus:bg-muted/50 focus:ring-1 focus:ring-accent/30 transition-all"
        />
      </div>

      <div className="flex items-center gap-1">
        {/* Help */}
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50">
          <HelpCircle className="h-[18px] w-[18px]" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent animate-pulse" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl shadow-xl border-border/50">
            <DropdownMenuLabel className="font-semibold text-foreground">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer rounded-lg mx-1 focus:bg-muted/50">
              <span className="font-medium text-sm">12 timesheets pending validation</span>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer rounded-lg mx-1 focus:bg-muted/50">
              <span className="font-medium text-sm">Exception detected: Overtime anomaly</span>
              <span className="text-xs text-muted-foreground">15 minutes ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer rounded-lg mx-1 focus:bg-muted/50">
              <span className="font-medium text-sm">Payroll batch ready for export</span>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-accent font-medium cursor-pointer rounded-lg mx-1 focus:bg-muted/50">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-border/50 mx-2" />

        {/* User Menu - Corner Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2.5 h-9 pl-1.5 pr-3 rounded-full hover:bg-muted/50 transition-colors">
              <Avatar className="h-7 w-7 ring-2 ring-accent/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium leading-tight">John Doe</span>
                <span className="text-[10px] text-muted-foreground leading-tight">Administrator</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-border/50">
            <div className="px-3 py-3 border-b border-border/50">
              <p className="font-semibold text-sm">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@kuiper.com</p>
            </div>
            <div className="p-1">
              <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-muted/50">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-muted/50">
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                Settings
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <div className="p-1">
              <DropdownMenuItem className="text-destructive cursor-pointer rounded-lg focus:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
