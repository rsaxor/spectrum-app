import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Customer, NewCustomer, User } from '../../types';
import axios from 'axios';
import {
	File,
	ListFilter,
	MoreHorizontal,
	PlusCircle,
} from "lucide-react"

import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs"

const Customers = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

	useEffect(() => {
		const fetchCustomers = async () => {
			const response = await axios.get<Customer[]>(`${apiURL}/customers`);
			setCustomers(response.data);
		};
		fetchCustomers();
	}, []);

	const handleDeleteCustomer = async (id: string) => {
		await axios.delete(`${apiURL}/customers/${id}`);
		setCustomers(customers.filter(customers => customers._id !== id));
	};

	return (
		<DashboardLayout pageTitle="Customers">
			<div className="grid flex-1 items-start gap-4 py-4 sm:py-0 md:gap-8">
				<Tabs defaultValue="all">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="active">Active</TabsTrigger>
							{/* <TabsTrigger value="draft">Draft</TabsTrigger>
                            <TabsTrigger value="archived" className="hidden sm:flex">
                                Archived
                            </TabsTrigger> */}
						</TabsList>
						<div className="ml-auto flex items-center gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm" className="h-7 gap-1">
										<ListFilter className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Filter
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filter by</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuCheckboxItem checked>
										Active
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem>
										Archived
									</DropdownMenuCheckboxItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<Button size="sm" variant="outline" className="h-7 gap-1">
								<File className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Export
								</span>
							</Button>
							<Button size="sm" className="h-7 gap-1">
								<PlusCircle className="h-3.5 w-3.5" />
								<a href="/customers/manage">
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Add customer
									</span>
								</a>
							</Button>
						</div>
					</div>
					<TabsContent value="all">
						<Card x-chunk="dashboard-06-chunk-0">
							<CardHeader>
								<CardTitle>Customers</CardTitle>
								<CardDescription>
									Manage your customers.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Account Code</TableHead>
											<TableHead>Company</TableHead>
											<TableHead>Email</TableHead>
											<TableHead>Trade</TableHead>
											<TableHead>Sales Rep.</TableHead>
											{/* <TableHead className="hidden md:table-cell">
                                                Total Sales
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Created at
                                            </TableHead> */}
											<TableHead>
												<span className="sr-only">Actions</span>
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{customers.map((customer) => (
											<TableRow key={customer._id}>
												<TableCell className="font-medium">
													{customer.acctcode}
												</TableCell>
												<TableCell>
													{customer.company}
												</TableCell>
												<TableCell>
													{customer.email}
												</TableCell>
												<TableCell>
													<Badge variant="outline">{customer.trade}</Badge>
												</TableCell>
												<TableCell>
													{customer.salesrep}
												</TableCell>
												{/* <TableCell className="hidden md:table-cell">
																									25
																							</TableCell>
																							<TableCell className="hidden md:table-cell">
																									2023-07-12 10:42 AM
																							</TableCell> */}
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
															<DropdownMenuItem asChild>
																<a href={`/customers/manage/${customer._id}`}>Edit</a>
															</DropdownMenuItem>
															<DropdownMenuItem onClick={() => handleDeleteCustomer(customer._id)}>
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
									Showing <strong>{customers.length}</strong> of <strong>{customers.length}</strong> customer/s
								</div>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</DashboardLayout>
	);
}
export default Customers;