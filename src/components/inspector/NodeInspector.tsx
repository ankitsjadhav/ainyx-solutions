import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SyncedSliderInput } from "./SyncedSliderInput";
import { cn } from "@/lib/utils";

export function NodeInspector() {
  const {
    selectedNodeId,
    nodes,
    updateNodeData,
    activeInspectorTab,
    setActiveInspectorTab,
  } = useStore();

  const node = nodes.find((n) => n.id === selectedNodeId);

  if (!node)
    return <div className="p-4 text-muted-foreground">Node not found</div>;

  const { label, status, config, runtime } = node.data;

  const handleStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500 hover:bg-green-600";
      case "degraded":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "down":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-muted-foreground">Status</Label>
          <Badge className={cn("capitalize", handleStatusColor(status))}>
            {status}
          </Badge>
        </div>

        <div className="space-y-2">
          <Label>Node Name</Label>
          <Input
            value={label}
            onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
          />
        </div>
      </div>

      <Tabs
        value={activeInspectorTab}
        onValueChange={setActiveInspectorTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>
        <TabsContent value="config" className="space-y-4 pt-4">
          <SyncedSliderInput
            label="Confidence Threshold"
            value={config}
            onChange={(val) => updateNodeData(node.id, { config: val })}
          />
          <div className="text-xs text-muted-foreground">
            Adjust the confidence threshold for this service.
          </div>
        </TabsContent>
        <TabsContent value="runtime" className="space-y-4 pt-4">
          <SyncedSliderInput
            label="Memory Usage (%)"
            value={runtime}
            onChange={(val) => updateNodeData(node.id, { runtime: val })}
          />
          <div className="text-xs text-muted-foreground">
            Simulated runtime memory usage override.
          </div>
        </TabsContent>
      </Tabs>
      <div className="pt-4 border-t">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => {
            const { setNodes, nodes, setSelectedNodeId } = useStore.getState();
            setNodes(nodes.filter((n) => n.id !== node.id));
            setSelectedNodeId(null);
          }}
        >
          Delete Node
        </Button>
      </div>
    </div>
  );
}
