import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LeaveTable({ role, user }) {
  const [leaves, setLeaves] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const loadLeaves = () => {
    axios.get("http://localhost:8080/leaves")
      .then(res => {
        if (role === "manager") {
          setLeaves(res.data);
        } else {
          const filtered = res.data.filter(
            l => l.employee_id === user.id
          );
          setLeaves(filtered);
        }
      });
  };

    useEffect(() => {
        loadLeaves();
    }, [role, user]);

  const approve = (id) => {
    setLoadingId(id);

    axios.put(`http://localhost:8080/leaves/approve?id=${id}&manager_id=2`)
      .then(() => {
        toast.success("Leave approved");
        loadLeaves();
      })
      .catch(() => toast.error("Failed"))
      .finally(() => setLoadingId(null));
  };

  const reject = (id) => {
    setLoadingId(id);

    axios.put(`http://localhost:8080/leaves/reject?id=${id}&manager_id=2`)
      .then(() => {
        toast.success("Leave rejected");
        loadLeaves();
      })
      .catch(() => toast.error("Failed"))
      .finally(() => setLoadingId(null));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leave Requests</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-center">
          
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Employee</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No leave requests yet
                </td>
              </tr>
            ) : (
              leaves.map(l => (
                <tr key={l.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">#{l.employee_id}</td>
                  <td>{l.start_date} → {l.end_date}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      l.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : l.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {l.status}
                    </span>
                  </td>

                  <td>
                    {role === "manager" && l.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => approve(l.id)}
                          disabled={loadingId === l.id}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          {loadingId === l.id ? "..." : "Approve"}
                        </button>

                        <button
                          onClick={() => reject(l.id)}
                          disabled={loadingId === l.id}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          {loadingId === l.id ? "..." : "Reject"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}