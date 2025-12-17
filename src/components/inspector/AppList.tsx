import { useQuery } from '@tanstack/react-query';
import { fetchApps } from '@/lib/api';
import { useStore } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AppList() {
    const { data: apps, isLoading, error } = useQuery({
        queryKey: ['apps'],
        queryFn: fetchApps,
    });

    const { selectedAppId, setSelectedAppId } = useStore();

    if (isLoading) {
        return (
            <div className="space-y-3 p-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-destructive">
                <p>Error loading apps. Is the mock server running?</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 p-4">
            <h2 className="text-lg font-semibold tracking-tight">Applications</h2>
            {apps?.map((app) => (
                <Card
                    key={app.id}
                    className={`cursor-pointer transition-all hover:bg-muted/50 ${selectedAppId === app.id ? 'border-primary ring-1 ring-primary' : ''}`}
                    onClick={() => setSelectedAppId(app.id)}
                >
                    <CardHeader className="p-4">
                        <CardTitle className="text-base">{app.name}</CardTitle>
                        <CardDescription className="text-xs">ID: {app.id}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
