// client/src/components/layouts/DashboardLayout.tsx

import React from 'react';
import Sidebar from "../../components/Sidebar"; // Import the layout
import Header from "../../components/Header"; // Import the layout

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";

interface DashboardLayoutProps {
	children: React.ReactNode; // This will hold the content of the subpages
	pageTitle: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, pageTitle }) => {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Sidebar></Sidebar>
			<div className="flex flex-col">
				<Header></Header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					<div className="flex items-center">
						<Breadcrumb className="hidden md:flex">
							<BreadcrumbList>
								{/* Conditionally render this BreadcrumbItem if pageTitle is 'Dashboard' */}
								{pageTitle === 'Dashboard' ? (
									<React.Fragment>
										<BreadcrumbItem>
											<BreadcrumbLink asChild>
												<BreadcrumbPage>{pageTitle}</BreadcrumbPage>
											</BreadcrumbLink>
										</BreadcrumbItem>
									</React.Fragment>
								) : (
									<React.Fragment>
										<BreadcrumbItem>
											<BreadcrumbLink asChild>
												<a href="/dashboard">Dashboard</a>
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbPage>{pageTitle}</BreadcrumbPage>
										</BreadcrumbItem>
									</React.Fragment>
								)}
								{/* <BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<a href="#">Products</a>
									</BreadcrumbLink>
								</BreadcrumbItem> */}

							</BreadcrumbList>
						</Breadcrumb>
						{/* <h1 className="text-lg font-semibold md:text-2xl"></h1> */}
					</div>
					<div
						className="flex flex-1 rounded-lg border border-dashed shadow-sm px-3" x-chunk="dashboard-02-chunk-1"
					>
						<div id="comp-load" className="w-full flex flex-col gap-1">
							{children}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
