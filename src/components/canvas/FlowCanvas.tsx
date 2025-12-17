import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
} from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { useQuery } from "@tanstack/react-query";
import { fetchGraph } from "@/lib/api";
import { useStore } from "@/lib/store";

import { ServiceNode } from "./ServiceNode";
import { toast } from "sonner";

const nodeTypes = {
  serviceNode: ServiceNode,
};

export function FlowCanvas() {
  const {
    selectedAppId,
    setSelectedNodeId,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setEdges,
  } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["graph", selectedAppId],
    queryFn: () =>
      selectedAppId ? fetchGraph(selectedAppId) : Promise.resolve(null),
    enabled: !!selectedAppId,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load graph data", {
        description: "This is a simulated error for testing purposes.",
        action: {
          label: "Retry",
          onClick: () => window.location.reload(),
        },
      });
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [data, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground animate-pulse">
        Loading graph...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-full text-red-500 bg-red-500/5">
        Failed to load graph
      </div>
    );

  const showControls = !!selectedAppId;

  return (
    <div className="h-full w-full bg-background/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        colorMode="dark"
        minZoom={0.5}
        maxZoom={2}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#333"
        />
        {showControls && (
          <Controls className="bg-muted border-muted-foreground/20" />
        )}
      </ReactFlow>
    </div>
  );
}
