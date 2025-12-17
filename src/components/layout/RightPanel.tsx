import { useStore } from "@/lib/store";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NodeInspector } from "@/components/inspector/NodeInspector";

export function RightPanel() {
  const { isMobilePanelOpen, setMobilePanelOpen, selectedNodeId } = useStore();

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-[60] w-80 bg-background/80 backdrop-blur-xl border-l transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col",
        isMobilePanelOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
        <span className="font-semibold text-sm">
          {selectedNodeId ? "Node Inspector" : "Details"}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobilePanelOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto bg-muted/5">
        {selectedNodeId ? (
          <NodeInspector />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center space-y-2">
            <p className="font-medium">No Node Selected</p>
            <p className="text-xs text-muted-foreground/50">
              Select a service node on the canvas to view its configuration and
              metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
