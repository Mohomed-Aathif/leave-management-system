import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/employees")
      .then(res => setEmployees(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Employees</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-center">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}