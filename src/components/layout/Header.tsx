import { Bell, Share2, MoreHorizontal, Slash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="h-14 border-b bg-background/50 backdrop-blur-md px-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 hover:text-foreground cursor-pointer transition-colors">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-primary rounded-full" />
          </div>
          <span className="font-medium">supertokens-golang</span>
        </div>
        <Slash className="w-3 h-3 text-muted-foreground/50 -rotate-12" />
        <div className="flex items-center gap-2 text-foreground font-medium">
          <span>dev</span>
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
