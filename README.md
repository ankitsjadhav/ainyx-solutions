# Infrastructure Visualizer

A premium, ReactFlow based application for visualizing and editing cloud service infrastructure. Built with React, TypeScript, Vite, Tailwind CSS, and Zustand.

## Getting Started

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Run Development Server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:5173](http://localhost:5173) in your browser.

3.  **Run Tests & Linting**

    ```bash
    npm run typecheck
    npm run lint
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

## Key Features

- **Interactive Graph**: Drag, select, and delete nodes (Backspace/Delete key).
- **App Overlay**: Switch between different applications with a fetched list.
- **Node Inspector**: Details panel that slides in (mobile) or stays fixed (desktop) to edit node config.
- **Error Simulation**: Toggle "Simulate Error" in the header to test API failure states.
- **Theme Support**: Dark mode by default (premium aesthetic).

## Architecture

For a deep dive into the technical decisions, state management, and component structure, please read [reasoning.md](./reasoning.md).
