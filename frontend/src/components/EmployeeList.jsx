import { useState } from "react";
import axios from "axios";

export default function EmployeeList({ employees, loadEmployees }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "employee"
  });

  const [editing, setEditing] = useState(null);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:8080/employees", form)
      .then(() => {
        loadEmployees();
        setForm({ name: "", email: "", role: "employee" });
      });
  };

  // Start editing
  const startEdit = (emp) => {
    setEditing(emp.id);
    setForm({
      id: emp.id,
      name: emp.name,
      email: emp.email,
      role: emp.role
    });
  };

  // Update employee
  const updateEmployee = (e) => {
    e.preventDefault();

    axios.put("http://localhost:8080/employees/update", form)
      .then(() => {
        loadEmployees();
        setEditing(null);
        setForm({ name: "", email: "", role: "employee" });
      });
  };

  // Delete employee with confirmation
  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    axios.delete(`http://localhost:8080/employees/delete?id=${id}`)
      .then(() => {
        loadEmployees();
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Employees</h1>

      {/* Add / Edit Form */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editing ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={editing ? updateEmployee : handleSubmit} className="flex gap-3 flex-wrap">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-48"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded w-60"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-t">
                <td className="p-3">{emp.name}</td>
                <td>{emp.email}</td>
                <td>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                    {emp.role}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => startEdit(emp)}
                    className="text-blue-600 mr-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}