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

  // ✅ Simulated logged-in user
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "John",
    role: "employee"
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">

        <h1 className="text-xl font-bold mb-6 text-gray-800">
          Leave System
        </h1>

        {/* ✅ User Selector (simulates login) */}
        <select
          onChange={(e) => {
            const users = [
              { id: 1, name: "John", role: "employee" },
              { id: 2, name: "Jane", role: "manager" },
              { id: 3, name: "Smith", role: "employee" }
            ];

            const selected = users.find(
              u => u.id === Number(e.target.value)
            );
            setCurrentUser(selected);
          }}
          className="border p-2 rounded mb-6"
        >
          <option value={1}>John (Employee)</option>
          <option value={2}>Jane (Manager)</option>
          <option value={3}>Smith (Employee)</option>
        </select>

        {/* Navigation */}
        <div className="flex-1">

          {currentUser.role === "manager" && (
            <MenuItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              value="dashboard"
              page={page}
              setPage={setPage}
            />
          )}

          {currentUser.role === "manager" && (
            <MenuItem
              icon={<Users size={18} />}
              label="Employees"
              value="employees"
              page={page}
              setPage={setPage}
            />
          )}

          <MenuItem
            icon={<FileText size={18} />}
            label="Leaves"
            value="leaves"
            page={page}
            setPage={setPage}
          />

          {currentUser.role === "employee" && (
            <MenuItem
              icon={<PlusCircle size={18} />}
              label="Apply Leave"
              value="apply"
              page={page}
              setPage={setPage}
            />
          )}

        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">

        {page === "dashboard" && currentUser.role === "manager" && (
          <Dashboard />
        )}

        {page === "employees" && currentUser.role === "manager" && (
          <EmployeeList />
        )}

        {page === "leaves" && (
          <LeaveTable role={currentUser.role} user={currentUser} />
        )}

        {page === "apply" && currentUser.role === "employee" && (
          <LeaveForm user={currentUser} role={currentUser.role} />
        )}

      </div>
    </div>
  );
}