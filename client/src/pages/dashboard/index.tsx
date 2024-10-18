
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="flex flex-1 rounded-lg border border-dashed shadow-sm px-3" x-chunk="dashboard-02-chunk-1">
        <div id="comp-load" className="w-full flex flex-col gap-1">
          <div className="text-center h-full flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Dashboard is empty
            </h3>
            <p className="text-sm text-muted-foreground">
              Coming soon!
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
};

export default Dashboard;
