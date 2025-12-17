import {
  Bell,
  Share2,
  MoreHorizontal,
  Slash,
  Menu,
  Home,
  Layers,
  Users,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const { toggleTheme, theme } = useStore();

  return (
    <header className="h-14 border-b bg-background/50 backdrop-blur-md px-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="md:hidden mr-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="start"
              className="w-16 p-2 flex flex-col items-center gap-4 bg-background/95 backdrop-blur-xl border-white/10"
            >
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Layers className="h-5 w-5" />
              </div>
              <nav className="flex flex-col gap-2 w-full items-center">
                <button className="h-9 w-9 rounded-lg hover:bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Home className="h-5 w-5" />
                </button>
                <button className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-colors">
                  <Layers className="h-5 w-5" />
                </button>
                <button className="h-9 w-9 rounded-lg hover:bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <Users className="h-5 w-5" />
                </button>
              </nav>
              <div className="h-px w-full bg-border/50" />
              <button
                onClick={toggleTheme}
                className="h-9 w-9 rounded-lg hover:bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2 hover:text-foreground cursor-pointer transition-colors">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full" />
          </div>
          <span className="font-medium hidden sm:inline">
            supertokens-golang
          </span>
          <span className="font-medium sm:hidden">App</span>
        </div>
        <Slash className="w-3 h-3 text-muted-foreground/50 -rotate-12" />
        <div className="flex items-center gap-2 text-foreground font-medium">
          <span className="hidden sm:inline">dev</span>
          <Badge
            variant="secondary"
            className="text-[10px] h-5 px-1.5 bg-muted text-muted-foreground"
          >
            v1.2.0
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => useStore.getState().toggleErrorSimulation()}
          className={cn(
            "h-8 text-xs font-medium border border-transparent",
            useStore((state: any) => state.isErrorSimulationMode)
              ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {useStore((state: any) => state.isErrorSimulationMode)
            ? "Error Mode: ON"
            : "Simulate Error"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 bg-muted/50 border-white/10 text-muted-foreground hover:text-foreground"
          onClick={() => {
            window.navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
          }}
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={() => alert("No new notifications")}
        >
          <Bell className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
