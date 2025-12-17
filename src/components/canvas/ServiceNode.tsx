import { memo, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Node, NodeProps } from "@xyflow/react";
import type { NodeData } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Server,
  Globe,
  Cpu,
  HardDrive,
  MemoryStick,
  Settings,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin,
  Leaf as LeafIcon,
  Box as BoxIcon,
  Cloud,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const PostgresIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-blue-400"
  >
    <path d="M12 2a10 10 0 1 0 10 10" />
    <path d="M12 12v6" />
    <path d="M9 15h6" />
    <path d="M7 9a4 4 0 0 1 8 0" />
  </svg>
);

const RedisIcon = () => <BoxIcon className="w-5 h-5 text-red-500" />;

const MongoIcon = () => <LeafIcon className="w-5 h-5 text-green-500" />;

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "healthy":
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case "degraded":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case "down":
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Settings className="w-4 h-4 text-muted-foreground" />;
  }
};

const CloudProviderIcon = () => (
  <div className="flex items-center gap-1.5 opacity-80">
    <span className="text-[10px] font-bold text-muted-foreground">AWS</span>
    <Cloud className="w-4 h-4 text-muted-foreground" />
  </div>
);

export const ServiceNode = memo(
  ({ id, data, selected }: NodeProps<Node<NodeData>>) => {
    const updateNodeData = useStore((state) => state.updateNodeData);
    const [activeTab, setActiveTab] = useState<
      "cpu" | "mem" | "disk" | "region"
    >("cpu");

    let Icon = Server;
    if (data.type === "postgres") Icon = PostgresIcon as any;
    else if (data.type === "redis") Icon = RedisIcon as any;
    else if (data.type === "mongo") Icon = MongoIcon as any;
    else if (data.label.toLowerCase().includes("db"))
      Icon = PostgresIcon as any;
    else if (data.label.toLowerCase().includes("gateway")) Icon = Globe;

    const tabs = [
      { id: "cpu", label: "CPU", icon: Cpu },
      { id: "mem", label: "Memory", icon: MemoryStick },
      { id: "disk", label: "Disk", icon: HardDrive },
      { id: "region", label: "Region", icon: MapPin },
    ] as const;

    return (
      <Card
        className={cn(
          "w-[340px] bg-[#0A0A0A] border-[1px] shadow-2xl transition-all duration-200",
          selected ? "border-primary ring-1 ring-primary/50" : "border-white/10"
        )}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-primary border-2 border-background"
        />

        <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white/5 text-primary border border-white/5">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">{data.label}</div>
              <div className="text-[10px] text-muted-foreground font-mono tracking-tight text-white/50">
                us-east-1a
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-500 border-green-500/20 font-mono text-[10px] px-2 py-0.5 pointer-events-none"
            >
              $0.03/HR
            </Badge>
            <button className="text-muted-foreground hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2 space-y-4">
          <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[10px] font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-white text-black shadow-sm"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                {activeTab === "cpu"
                  ? "Allocation"
                  : activeTab === "mem"
                  ? "Usage"
                  : activeTab === "disk"
                  ? "I/O Rate"
                  : "Latency"}
              </span>
              <span className="text-xs font-mono text-white">
                {activeTab === "cpu"
                  ? `${data.config}%`
                  : activeTab === "mem"
                  ? "1.2 GB"
                  : "450 IOPS"}
              </span>
            </div>

            <Slider
              value={activeTab === "cpu" ? [data.config] : [50]}
              max={100}
              step={1}
              onValueChange={(vals) =>
                activeTab === "cpu" && updateNodeData(id, { config: vals[0] })
              }
              className={cn(
                "[&>.relative>.absolute]:bg-gradient-to-r",
                activeTab === "cpu"
                  ? "[&>.relative>.absolute]:from-blue-500 [&>.relative>.absolute]:to-indigo-500"
                  : activeTab === "mem"
                  ? "[&>.relative>.absolute]:from-orange-500 [&>.relative>.absolute]:to-red-500"
                  : "[&>.relative>.absolute]:from-emerald-500 [&>.relative>.absolute]:to-teal-500"
              )}
              disabled={activeTab !== "cpu"}
            />
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-2 pb-4 flex justify-between items-center bg-white/0">
          <div className="flex items-center gap-2">
            <StatusIcon status={data.status} />
            <span
              className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                data.status === "healthy"
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : data.status === "degraded"
                  ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  : "bg-muted/20 text-muted-foreground border-border"
              )}
            >
              {data.status === "healthy"
                ? "Success"
                : data.status === "degraded"
                ? "Warning"
                : "Unknown"}
            </span>
          </div>
          <CloudProviderIcon />
        </CardFooter>

        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-primary border-2 border-background"
        />
      </Card>
    );
  }
);

ServiceNode.displayName = "ServiceNode";
