// client/src/components/layouts/Settings.tsx

import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

interface SettingsProps {
    children: React.ReactNode; // This will hold the content of the subpages
    settingsTitle: string;
}

const Settings: React.FC<SettingsProps> = ({ children, settingsTitle }) => {
    const location = useLocation(); // Get the current URL
    const isActive = (path: string) => location.pathname === path;
    return (
        <>
            <div className="mx-auto grid w-full gap-2">
                <h2 className="text-3xl font-semibold mb-4">Settings</h2>
            </div>
            <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[180px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
                <a href="/dashboard/users" className={isActive('/dashboard/users') ? 'font-semibold text-primary' : ''}>
                        Add User
                    </a>
                    <a href="/dashboard/users-list" className={isActive('/dashboard/users-list') ? 'font-semibold text-primary' : ''}>
                        User List
                    </a>
                    {/* <a href="#">Support</a>
                    <a href="#">Organizations</a>
                    <a href="#">Advanced</a> */}
                </nav>
                <div className="grid gap-6">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Settings;
