# Reasoning & Approach

## Architectural Decisions

### State Management: Zustand vs. Context

I chose **Zustand** for global state management because it provides a much simpler API and better performance through granular selectors when compared to React Context.

- **Store Structure:** The store contains both UI related state (`selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`) and the graph state (`nodes`, `edges`).
- **Why Centralized Graph State?:** Keeping nodes and edges centralized in Zustand makes it easy to keep the `FlowCanvas` (visualization) and `NodeInspector` (editing) perfectly in sync. Any updates made in the Inspector using `updateNodeData` are immediately reflected in the Canvas without prop drilling or complicated Context wiring.

### Data Fetching: TanStack Query

**TanStack Query** is used to manage server state throughout the application.

- **Mocking:** **MSW (Mock Service Worker)** intercepts requests to `/api/*`, simulating network delays and creating a realistic asynchronous environment.
- **Caching:** Queries are cached using key value pairs like `['graph', appId]`, which allows fast app switching while preserving data during navigation.

### Component Structure

- **Layout:** The app is broken down into `Layout`, `Header`, `Sidebar`, and `RightPanel` to keep responsibilities clear and the codebase easy to maintain.
- **AppProviders:** This wrapper encapsulates `QueryClientProvider` and `ReactFlowProvider`, keeping infrastructure concerns separate from UI logic.

### ReactFlow Integration

- **Controlled vs. Uncontrolled:** I opted for a store driven approach where nodes and edges are sourced directly from Zustand. This gives full control over the graph state outside of the Canvas itself.
- **Selection & Deletion:** Node selection is handled via ReactFlow’s `onNodeClick`. Deletions are processed through `onNodesChange`, and the selected node is automatically cleared from the store to avoid stale UI states.

### Styling & UI

- **shadcn/ui:** Used for accessible and well structured UI primitives like Tabs, Slider, Input, and Badge.
- **Tailwind CSS:** Handles layout and custom styling while maintaining a consistent design system.
- **Responsiveness:** On smaller screens, the `RightPanel` becomes a slide over drawer using `md:hidden`, controlled by the `isMobilePanelOpen` state.

### Key Design Choices

- **Synced Inputs:** The `SyncedSliderInput` component ensures two way binding between a slider and a numeric input, which is essential for precise configuration controls.
- **Types:** Shared generic types (`NodeData`) are used across the API layer, Zustand store, and components to maintain strong type safety.

---

## Project Walkthrough (End to End)

### 1. The Goal

The objective was to build a “ReactFlow App Graph Builder” that feels like a premium SaaS tool. Users can browse applications, visualize their infrastructure as a graph, and inspect or edit service configurations.

### 2. Static vs. Dynamic

**What’s Static? (Mostly visual elements)**

- **Sidebar:** Navigation icons (Home, Grid, Users) act as visual placeholders to establish the app shell.
- **Header Actions:** The Bell and More buttons are simplified for demo purposes, while Share remains functional.
- **Users:** Mock avatars (User A, User B) were decorative only and were removed based on feedback.

**What’s Dynamic? (Core functionality)**

- **App Selection:** Selecting an app from the overlay triggers a TanStack Query fetch to load that app’s graph.
- **The Graph:** Nodes support dragging, selection, and deletion.
- **The Inspector:** Clicking a node dynamically renders the `NodeInspector` in the Right Panel.
- **Two Way Binding:** Adjusting a slider in the Inspector instantly updates the node data in the store, and those changes are immediately reflected in the graph.

### 3. Responsiveness

The layout adapts smoothly across devices:

- **Desktop:** The `RightPanel` (Inspector) remains permanently visible on the right.
- **Mobile:** The `RightPanel` is hidden by default and slides in from the right when a node is selected. This drawer behavior is controlled by the `isMobilePanelOpen` state in Zustand.

### 4. Data Flow (How It Works)

1.  **Fetch:** `AppOverlay` requests `/api/apps`.
2.  **Select:** The user selects an app, triggering `setSelectedAppId(id)`.
3.  **Graph Load:** `FlowCanvas` reacts to the ID change, fetches `/api/apps/:id/graph`, and populates `useStore.nodes`.
4.  **Interact:** ReactFlow renders the nodes and allows user interaction.
5.  **Update:** Adjusting a slider calls `updateNodeData`, updating the store and rerendering only the affected node in ReactFlow.
