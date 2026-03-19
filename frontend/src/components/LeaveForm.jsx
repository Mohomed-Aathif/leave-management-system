import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LeaveForm({ user, role }) {
  const [form, setForm] = useState({
    employee_id: "",
    start_date: "",
    end_date: "",
    reason: ""
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/employees")
      .then(res => setEmployees(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      employee_id:
        role === "manager"
          ? Number(form.employee_id)
          : user.id
    };

    if (!payload.employee_id || !form.start_date || !form.end_date) {
      toast.error("Please fill all fields");
      return;
    }

    axios.post("http://localhost:8080/leaves", payload)
      .then(() => {
        toast.success("Leave applied successfully");
        setForm({
          employee_id: "",
          start_date: "",
          end_date: "",
          reason: ""
        });
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Apply Leave</h1>

      <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow-sm space-y-4">

        {/* ✅ Role-based UI */}
        {role === "manager" ? (
          <select
            name="employee_id"
            value={form.employee_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        ) : (
          <div className="p-3 bg-gray-100 rounded text-sm">
            Applying as: <span className="font-medium">{user.name}</span>
          </div>
        )}

        <input type="date" name="start_date" className="w-full border p-2 rounded" onChange={handleChange} />
        <input type="date" name="end_date" className="w-full border p-2 rounded" onChange={handleChange} />
        <input name="reason" placeholder="Reason" className="w-full border p-2 rounded" onChange={handleChange} />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
          Submit Leave
        </button>
      </form>
    </div>
  );
}