import { Layout } from "./components/layout/Layout";
import { RightPanel } from "./components/layout/RightPanel";
import { FlowCanvas } from "./components/canvas/FlowCanvas";
import { AppOverlay } from "./components/canvas/AppOverlay";
import { Toaster } from "@/components/ui/sonner";
import { useStore } from "./lib/store";
import "@xyflow/react/dist/style.css";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";

function App() {
  const { selectedAppId, theme } = useStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (
      !document.documentElement.classList.contains("dark") &&
      !document.documentElement.classList.contains("light")
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <ReactFlowProvider>
      <Layout rightPanel={<RightPanel />}>
        {selectedAppId && (
          <div className="h-full w-full">
            <FlowCanvas />
          </div>
        )}
        <AppOverlay />
        <Toaster />
      </Layout>
    </ReactFlowProvider>
  );
}

export default App;
