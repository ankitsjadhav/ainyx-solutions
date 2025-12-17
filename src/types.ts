export interface App {
    id: string;
    name: string;
    type?: 'go' | 'java' | 'python' | 'ruby' | 'node';
}

export interface NodeData extends Record<string, unknown> {
    label: string;
    status: 'healthy' | 'degraded' | 'down';
    config: number;
    runtime: number;
    type?: string;
}
