import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../../components/layouts/DashboardLayout"; // Import the layout
import Settings from "../../../components/layouts/Settings"; // Import the layout
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { User, NewUser } from '../../../types';
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

const UserList = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState<'user' | 'admin'>('user');
	const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await axios.get<User[]>(`${apiURL}/users`);
			setUsers(response.data);
		};
		fetchUsers();
	}, []);

	const handleDeleteUser = async (id: string) => {
		const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

		await axios.delete(`${apiURL}/users/${id}`);
		setUsers(users.filter(user => user._id !== id));
	};
	

	return (
		<DashboardLayout pageTitle="User List"> {/* Wrap content inside the layout */}
			<div className="p-4">
				<Settings settingsTitle="Add User">
					<Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
							<CardTitle>Users list</CardTitle>
							<CardDescription>
								Manage all users of this app.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="hidden w-[100px] sm:table-cell">
											<span className="sr-only">Image</span>
										</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Username</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>
											<span className="sr-only">Actions</span>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map((user) => (
										<TableRow key={user._id}>
											<TableCell className="hidden sm:table-cell">
												<img
													alt="Image"
													className="aspect-square rounded-md object-cover"
													height="64"
													width="64"
													src={`https://place-hold.it/64?text=${user.username.charAt(0)}`}
												/>
											</TableCell>
											<TableCell className="font-medium">
												{user.email}
											</TableCell>
											<TableCell className="font-medium">
												{user.username}
											</TableCell>
											<TableCell>
												<Badge variant="outline">{user.role}</Badge>
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															aria-haspopup="true"
															size="icon"
															variant="ghost"
														>
															<MoreHorizontal className="h-4 w-4" />
															<span className="sr-only">Toggle menu</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>Edit</DropdownMenuItem>
														<DropdownMenuItem onClick={() => handleDeleteUser(user._id)}>
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter>
							<div className="text-xs text-muted-foreground">
								Showing <strong>{users.length}</strong> of <strong>{users.length}</strong> users
							</div>
						</CardFooter>
					</Card>
				</Settings>
			</div>
		</DashboardLayout>
	);
}
export default UserList;
