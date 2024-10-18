import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Settings from "../../../components/layouts/Settings";
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../../components/ui/card";
import { User, NewUser } from '../../../types';
import {
	MoreHorizontal,
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
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../../components/ui/dialog"

const UserList = () => {
	const [editingUser, setEditingUser] = useState<User | null>(null); // State for the user being edited
	const [users, setUsers] = useState<User[]>([]);
	const [password, setPassword] = useState<string>(''); // Separate state for password
	const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await axios.get<User[]>(`${apiURL}/users`);
			setUsers(response.data);
		};
		fetchUsers();
	}, []);

	const handleDeleteUser = async (id: string) => {
		await axios.delete(`${apiURL}/users/${id}`);
		setUsers(users.filter(user => user._id !== id));
	};

	const handleEditUser = (user: User) => {
		setEditingUser(user);
		setPassword('');
	};

	const handleRoleChange = (newRole: string) => {
		if (editingUser) {
			setEditingUser({
				...editingUser,
				role: newRole,
			});
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (editingUser) {
			setEditingUser({
				...editingUser,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Create an object with the user updates
		const updatedUser = { ...editingUser };

		// If password is not empty, include it in the update, otherwise omit it
		if (password) {
			updatedUser.password = password;
		} else {
			delete updatedUser.password; // Remove the password key if it's empty
		}

		if (editingUser) {
			await axios.put(`${apiURL}/users/${editingUser._id}`, updatedUser);
			setUsers(
				users.map(user =>
					user._id === editingUser._id ? (updatedUser as User) : user
				)
			);
			setEditingUser(null); // Close the dialog
		}
	};

	return (
		<DashboardLayout pageTitle="User List">
			<div className="">
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
													src={`https://placehold.co/64?text=${user.username.charAt(0)}`}
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
														<DropdownMenuItem onClick={() => handleEditUser(user)}>
															Edit
														</DropdownMenuItem>
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
								Showing <strong>{users.length}</strong> of <strong>{users.length}</strong> user/s
							</div>
						</CardFooter>
					</Card>
				</Settings>
			</div>
			{editingUser && (
				<Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Edit profile</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSaveChanges}>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="email" className="text-right">
										Email
									</Label>
									<Input
										id="email"
										name="email"
										type="email"
										required
										value={editingUser.email}
										onChange={handleInputChange}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="username" className="text-right">
										Username
									</Label>
									<Input
										id="username"
										name="username"
										required
										value={editingUser.username}
										onChange={handleInputChange}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="password" className="text-right">
										Password
									</Label>
									<Input
										placeholder="leave blank to keep same password"
										id="password"
										name="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="" className="text-right">Role</Label>
									<Select onValueChange={handleRoleChange} defaultValue={editingUser.role}>
										<SelectTrigger>
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="user">User</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<DialogFooter>
								<Button type="button" onClick={() => setEditingUser(null)}>Cancel</Button>
								<Button type="submit">Save changes</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			)}
		</DashboardLayout>
	);
}
export default UserList;
