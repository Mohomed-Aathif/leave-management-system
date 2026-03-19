import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [role, setRole] = useState("employee");

  const [dashboard, setDashboard] = useState(null);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "employee"
  });

  const [leaves, setLeaves] = useState([]);
  const [leaveForm, setLeaveForm] = useState({
    employee_id: "",
    start_date: "",
    end_date: "",
    reason: ""
  });

  // Load dashboard
  useEffect(() => {
    axios.get("http://localhost:8080/dashboard")
      .then(res => setDashboard(res.data));
  }, []);

  // Load employees
  const loadEmployees = () => {
    axios.get("http://localhost:8080/employees")
      .then(res => setEmployees(res.data));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Load leaves
  const loadLeaves = () => {
    axios.get("http://localhost:8080/leaves")
      .then(res => setLeaves(res.data));
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  // Employee form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/employees", form)
      .then(() => {
        loadEmployees();
        setForm({ name: "", email: "", role: "employee" });
      });
  };

  // Leave form
  const handleLeaveChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const submitLeave = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/leaves", leaveForm)
      .then(() => {
        loadLeaves();
        setLeaveForm({
          employee_id: "",
          start_date: "",
          end_date: "",
          reason: ""
        });
      });
  };

  // Approve / Reject
  const approveLeave = (id) => {
    axios.put(`http://localhost:8080/leaves/approve?id=${id}&manager_id=2`)
      .then(() => loadLeaves());
  };

  const rejectLeave = (id) => {
    axios.put(`http://localhost:8080/leaves/reject?id=${id}&manager_id=2`)
      .then(() => loadLeaves());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Leave Management System</h1>

      {/* Role Selector */}
      <h2>Select Role</h2>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>

      {/* Dashboard (Manager only) */}
      {role === "manager" && (
        <>
          <h2>Dashboard</h2>
          {dashboard && (
            <div>
              <p>Total Employees: {dashboard.total_employees}</p>
              <p>Total Leaves: {dashboard.total_leaves}</p>
              <p>Pending: {dashboard.pending}</p>
              <p>Approved: {dashboard.approved}</p>
              <p>Rejected: {dashboard.rejected}</p>
            </div>
          )}
        </>
      )}

      {/* Employee Management (Manager only) */}
      {role === "manager" && (
        <>
          <h2>Add Employee</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            <button type="submit">Add</button>
          </form>

          <h2>Employees</h2>
          <ul>
            {employees.map(emp => (
              <li key={emp.id}>
                {emp.name} - {emp.email} ({emp.role})
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Apply Leave (Employee only) */}
      {role === "employee" && (
        <>
          <h2>Apply Leave</h2>
          <form onSubmit={submitLeave}>
            <input
              name="employee_id"
              placeholder="Employee ID"
              value={leaveForm.employee_id}
              onChange={handleLeaveChange}
            />
            <input
              name="start_date"
              type="date"
              value={leaveForm.start_date}
              onChange={handleLeaveChange}
            />
            <input
              name="end_date"
              type="date"
              value={leaveForm.end_date}
              onChange={handleLeaveChange}
            />
            <input
              name="reason"
              placeholder="Reason"
              value={leaveForm.reason}
              onChange={handleLeaveChange}
            />
            <button type="submit">Apply</button>
          </form>
        </>
      )}

      {/* Leave Requests (Both roles, but actions only for manager) */}
      <h2>Leave Requests</h2>
      <ul>
        {leaves.map(leave => (
          <li key={leave.id}>
            Employee {leave.employee_id} | {leave.start_date} → {leave.end_date} | {leave.status}

            {role === "manager" && leave.status === "pending" && (
              <>
                <button onClick={() => approveLeave(leave.id)}>Approve</button>
                <button onClick={() => rejectLeave(leave.id)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;