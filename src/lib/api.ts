import type { App, NodeData } from "@/types";
import type { Edge, Node } from "@xyflow/react";

export interface GraphData {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

import { useStore } from "@/lib/store";

export const fetchApps = async (): Promise<App[]> => {
  if (useStore.getState().isErrorSimulationMode) {
    throw new Error("Simulated API Error");
  }
  const res = await fetch("/api/apps");
  if (!res.ok) throw new Error("Failed to fetch apps");
  return res.json();
};

export const fetchGraph = async (appId: string): Promise<GraphData> => {
  if (useStore.getState().isErrorSimulationMode) {
    throw new Error("Simulated API Error");
  }
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) throw new Error("Failed to fetch graph");
  return res.json();
};
