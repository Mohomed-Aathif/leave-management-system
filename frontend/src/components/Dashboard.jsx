import { useEffect, useState } from "react";
import axios from "axios";

// ✅ MOVE HERE
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-gray-800 mt-2">{value}</h2>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/dashboard")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Employees" value={data.total_employees} />
        <Card title="Leaves" value={data.total_leaves} />
        <Card title="Pending" value={data.pending} />
        <Card title="Approved" value={data.approved} />
        <Card title="Rejected" value={data.rejected} />
        </div>
    </div>
);
}