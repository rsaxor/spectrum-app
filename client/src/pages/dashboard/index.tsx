import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import { Badge } from "../../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

import DashboardLayout from "../../components/layouts/DashboardLayout"; // Import the layout



const Dashboard = () => {
  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="text-center h-full flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Dashboard is empty
        </h3>
        <p className="text-sm text-muted-foreground">
          Coming soon!
        </p>
      </div>
    </DashboardLayout>
  )
};

export default Dashboard;
