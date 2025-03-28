import React from 'react';
import { Link } from 'react-router-dom';
import {
	Bell,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	Search,
	ShoppingCart,
	Users,
} from "lucide-react"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card"

import { Button } from "../components/ui/button"
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom'; 


const Sidebar = () => {
    const location = useLocation(); // Get the current URL
    const isActive = (path: string) => location.pathname.startsWith(path);
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <a href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className=""><b>Spectrum App</b></span>
                    </a>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <a
                            href="/dashboard"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('/dashboard') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                            // className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                            <Home className="h-4 w-4" />
                            Dashboard
                        </a>
                        <a
                            href="/customers"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('/customers') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                        >
                            <Users className="h-4 w-4" />
                            Customers
                        </a>
                        <a
                            href="#"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('/estimates') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                        >
                            <LineChart className="h-4 w-4" />
                            Estimates
                            {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge> */}
                        </a>
                        <a
                            href="#"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive('/products') ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                        >
                            <Package className="h-4 w-4" />
                            Products{" "}
                        </a>
                        {/* <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                        <ShoppingCart className="h-4 w-4" />Analytics</a> */}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    {/* <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card> */}
                    <Footer />
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
