import { Home, Layers, Users, Sun, Moon } from "lucide-react";
import { useStore } from "@/lib/store";

export function Sidebar() {
  const { toggleTheme, theme } = useStore();
  return (
    <aside className="hidden md:flex w-16 border-r bg-muted/10 flex-col items-center py-4 gap-6">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Layers className="h-6 w-6" />
      </div>

      <nav className="flex flex-col gap-4">
        <button className="h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Home className="h-5 w-5" />
        </button>
        <button className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-colors">
          <Layers className="h-5 w-5" />
        </button>
        <button className="h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Users className="h-5 w-5" />
        </button>
      </nav>

      <div className="mt-auto">
        <button
          onClick={toggleTheme}
          className="h-10 w-10 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
