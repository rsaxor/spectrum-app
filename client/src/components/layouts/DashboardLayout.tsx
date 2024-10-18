import React from 'react';
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useLocation, Link } from 'react-router-dom';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";

interface DashboardLayoutProps {
	children: React.ReactNode;
	pageTitle: string;
}

// Utility function to convert dashed format to capitalized words
const formatSegment = (segment: string) => {
	return segment
		.split('-') // Split the dashed string
		.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
		.join(' '); // Join words with spaces
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, pageTitle }) => {
	const location = useLocation();

	// Split the current path into segments and filter out empty segments
	const pathSegments = location.pathname.split('/').filter(Boolean);

	// Construct breadcrumb items
	const breadcrumbs = pathSegments.map((segment, index) => {
		const isLast = index === pathSegments.length - 1;
		const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

		return (
			<React.Fragment key={index}>
				<BreadcrumbItem>
					{/* If it's the last item, show it as a page without a link */}
					{isLast ? (
						<BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
					) : (
						<BreadcrumbLink asChild>
							<Link to={path}>
								{formatSegment(segment)}
							</Link>
						</BreadcrumbLink>
					)}
				</BreadcrumbItem>
				{!isLast && <BreadcrumbSeparator />}
			</React.Fragment>
		);
	});

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<Sidebar />
			<div className="flex flex-col">
				<Header />
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					<div className="flex items-center">
						<Breadcrumb className="hidden md:flex">
							<BreadcrumbList>
								{breadcrumbs}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					{children}
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;