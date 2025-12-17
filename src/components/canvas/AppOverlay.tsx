import { useStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "@/lib/api";
import { useState, useRef, useEffect } from "react";
import {
  ChevronsUpDown,
  Puzzle,
  Lightbulb,
  User,
  Settings,
  FileBox,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { App } from "@/types";

const TechIconBg = (type: string = "node") => {
  switch (type) {
    case "go":
      return "bg-cyan-500/20 text-cyan-500";
    case "java":
      return "bg-orange-500/20 text-orange-500";
    case "python":
      return "bg-yellow-500/20 text-yellow-500";
    case "ruby":
      return "bg-red-500/20 text-red-500";
    default:
      return "bg-purple-500/20 text-purple-500";
  }
};

const TechIcon = ({ type }: { type?: string }) => {
  const t = type || "node";
  switch (t) {
    case "go":
      return <Puzzle className="w-4 h-4" />;
    case "java":
      return <Settings className="w-4 h-4" />;
    case "python":
      return <FileBox className="w-4 h-4" />;
    case "ruby":
      return <Lightbulb className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

const FALLBACK_APPS: App[] = [
  { id: "app-1", name: "supertokens-golang", type: "go" },
  { id: "app-2", name: "supertokens-java", type: "java" },
  { id: "app-3", name: "supertokens-python", type: "python" },
  { id: "app-4", name: "supertokens-ruby", type: "ruby" },
  { id: "app-5", name: "supertokens-node", type: "node" },
];

export function AppOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const { selectedAppId, setSelectedAppId } = useStore();
  const {
    data: fetchedApps,
    isError,
    isLoading,
  } = useQuery({ queryKey: ["apps"], queryFn: fetchApps });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const apps =
    fetchedApps && fetchedApps.length > 0 ? fetchedApps : FALLBACK_APPS;

  const selectedApp = apps.find((app) => app.id === selectedAppId);

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setHighlightedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            Math.min(prev + 1, filteredApps.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredApps[highlightedIndex]) {
            setSelectedAppId(filteredApps[highlightedIndex].id);
            setIsOpen(false);
            setSearch("");
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredApps, highlightedIndex, setSelectedAppId]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="fixed top-24 left-24 z-[9999]"
      style={{ isolation: "isolate" }}
    >
      <div className="flex flex-col gap-1.5 w-[280px]" ref={dropdownRef}>
        <div className="flex items-center gap-2 px-1 justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Application
            </h2>
          </div>
          {isLoading && (
            <span
              className="h-1.5 w-1.5 bg-yellow-500 rounded-full animate-pulse"
              title="Syncing..."
            />
          )}
          {isError && (
            <span
              className="h-1.5 w-1.5 bg-red-500 rounded-full"
              title="Offline Mode"
            />
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-[#0A0A0A] border border-white/10 text-white px-3 py-2.5 rounded-md hover:bg-[#111] hover:border-white/20 transition-all shadow-lg ring-1 ring-white/5 disabled:opacity-50"
            disabled={isLoading && !apps.length}
          >
            <div className="flex items-center gap-3">
              {isLoading && !apps.length ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-white/10 animate-pulse" />
                  <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                </div>
              ) : selectedApp ? (
                <div
                  className={cn(
                    "h-8 w-8 rounded-md flex items-center justify-center transition-colors duration-300",
                    TechIconBg(selectedApp.type)
                  )}
                >
                  <TechIcon type={selectedApp.type} />
                </div>
              ) : (
                <div className="bg-white/10 p-1 rounded">
                  <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}

              <span className="font-medium text-sm truncate">
                {isLoading && !apps.length
                  ? ""
                  : selectedApp
                  ? selectedApp.name
                  : "Select Application..."}
              </span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-muted-foreground opacity-50" />
          </button>

          {isOpen && (
            <div
              className="absolute top-full left-0 mt-1.5 w-full bg-[#0A0A0A] border border-white/10 rounded-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top"
              style={{ zIndex: 10000 }}
            >
              <div className="px-3 py-2.5 border-b border-white/5 flex items-center gap-2 bg-white/[0.02]">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-muted-foreground/50 leading-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="max-h-[280px] overflow-y-auto p-1 custom-scrollbar">
                {filteredApps && filteredApps.length > 0 ? (
                  filteredApps.map((app: App, index: number) => (
                    <div
                      key={app.id}
                      onClick={() => {
                        setSelectedAppId(app.id);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-sm cursor-pointer transition-all mb-0.5",
                        selectedAppId === app.id || index === highlightedIndex
                          ? "bg-white/10 text-white"
                          : "text-muted-foreground hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <div
                        className={cn(
                          "p-1.5 rounded flex items-center justify-center",
                          TechIconBg(app.type)
                        )}
                      >
                        <TechIcon type={app.type} />
                      </div>
                      <span className="font-medium text-sm">{app.name}</span>
                      {selectedAppId === app.id && (
                        <div className="ml-auto">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]"></div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    No applications found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
