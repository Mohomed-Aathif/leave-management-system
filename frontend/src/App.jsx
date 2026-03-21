import { useEffect, useState } from "react";
import axios from "axios";

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

  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load employees globally
  const loadEmployees = () => {
    axios.get("http://localhost:8080/employees")
      .then(res => {
        setEmployees(res.data);
        if (!currentUser) {
          setCurrentUser(res.data[0]);
        }
      });
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 p-6 flex flex-col">

        <h1 className="text-xl font-bold mb-6 text-gray-800">
          Leave System
        </h1>

        {/* Dynamic User Selector */}
        <select
          value={currentUser?.id || ""}
          onChange={(e) => {
            const selected = employees.find(
              emp => emp.id === Number(e.target.value)
            );
            setCurrentUser(selected);
          }}
          className="border p-2 rounded mb-6"
        >
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.role})
            </option>
          ))}
        </select>

        {/* Navigation */}
        <div className="flex-1">

          {currentUser?.role === "manager" && (
            <MenuItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              value="dashboard"
              page={page}
              setPage={setPage}
            />
          )}

          {currentUser?.role === "manager" && (
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

          {currentUser?.role === "employee" && (
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
      <div className="flex-1 p-3 md:p-6 overflow-y-auto">

        {page === "dashboard" && currentUser?.role === "manager" && (
          <Dashboard />
        )}

        {page === "employees" && currentUser?.role === "manager" && (
          <EmployeeList
            employees={employees}
            loadEmployees={loadEmployees}
          />
        )}

        {page === "leaves" && currentUser && (
          <LeaveTable role={currentUser.role} user={currentUser} />
        )}

        {page === "apply" && currentUser?.role === "employee" && (
          <LeaveForm user={currentUser} role={currentUser.role} />
        )}

      </div>
    </div>
  );
}