import { http, HttpResponse, delay } from "msw";

export interface App {
  id: string;
  name: string;
  type: "go" | "java" | "python" | "ruby" | "node";
}

const apps: App[] = [
  { id: "app-1", name: "supertokens-golang", type: "go" },
  { id: "app-2", name: "supertokens-java", type: "java" },
  { id: "app-3", name: "supertokens-python", type: "python" },
  { id: "app-4", name: "supertokens-ruby", type: "ruby" },
  { id: "app-5", name: "supertokens-node", type: "node" },
];

const getGraphData = (appId: string) => {
  const suffix = appId.includes("-") ? appId.split("-")[1] : appId;

  return {
    nodes: [
      {
        id: "1",
        position: { x: 50, y: 50 },
        data: {
          label: `Auth Service (${suffix})`,
          status: Math.random() > 0.3 ? "healthy" : "degraded",
          config: 80,
          runtime: 20,
          type: "service",
        },
        type: "serviceNode",
      },
      {
        id: "2",
        position: { x: 450, y: 150 },
        data: {
          label: `Worker (${suffix})`,
          status: Math.random() > 0.5 ? "healthy" : "degraded",
          config: 50,
          runtime: 50,
          type: "redis",
        },
        type: "serviceNode",
      },
      {
        id: "3",
        position: { x: 850, y: 50 },
        data: {
          label: `Primary DB (${suffix})`,
          status: "healthy",
          config: 90,
          runtime: 10,
          type: "mongo",
        },
        type: "serviceNode",
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
    ],
  };
};

export const handlers = [
  http.get("/api/apps", async () => {
    await delay(300);
    return HttpResponse.json(apps);
  }),

  http.get("/api/apps/:appId/graph", async ({ params }) => {
    await delay(500);
    const { appId } = params;
    return HttpResponse.json(getGraphData(appId as string));
  }),
];
