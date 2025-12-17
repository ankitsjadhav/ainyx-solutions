import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    rightPanel: ReactNode;
}

export function Layout({ children, rightPanel }: LayoutProps) {
    return (
        <div className="flex h-screen w-full flex-col bg-background">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 relative overflow-hidden flex">
                    <div className="flex-1 relative">
                        {children}
                    </div>
                    {rightPanel}
                </main>
            </div>
        </div>
    );
}
