import { useState } from "react";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import LeaveTable from "./components/LeaveTable";
import LeaveForm from "./components/LeaveForm";
import { LayoutDashboard, Users, FileText, PlusCircle } from "lucide-react";

function MenuItem({ icon, label, value, page, setPage }) {
  return (
    <button
      onClick={() => setPage(value)}
      className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg mb-2 transition ${
        page === value
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Leave System
        </h1>

        <MenuItem icon={<LayoutDashboard size={18} />} label="Dashboard" value="dashboard" page={page} setPage={setPage}/>
        <MenuItem icon={<Users size={18} />} label="Employees" value="employees" page={page} setPage={setPage}/>
        <MenuItem icon={<FileText size={18} />} label="Leaves" value="leaves" page={page} setPage={setPage}/>
        <MenuItem icon={<PlusCircle size={18} />} label="Apply Leave" value="apply" page={page} setPage={setPage}/>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">

        

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {page === "dashboard" && <Dashboard />}
          {page === "employees" && <EmployeeList />}
          {page === "leaves" && <LeaveTable />}
          {page === "apply" && <LeaveForm />}
        </div>

      </div>
    </div>
  );
}