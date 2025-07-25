import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

const AdminDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [region, setRegion] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState([]);
  const [cropDistribution, setCropDistribution] = useState([]);
  const [regionRevenue, setRegionRevenue] = useState([]);

  useEffect(() => {
    api.get("/admin/agents").then(res => setAgents(res.data));
    api.get("/admin/analytics/annual-revenue").then(res => setAnnualRevenue(res.data));
    api.get("/admin/analytics/crop-distribution").then(res => setCropDistribution(res.data));
    api.get("/admin/analytics/region-revenue").then(res => setRegionRevenue(res.data));
  }, []);

  const handleRegionFilter = async () => {
    const res = await api.get(`/admin/agents?region=${region}`);
    setAgents(res.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Agent Supervision */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Agents</h2>
        <div className="flex gap-2 mb-2">
          <input type="text" placeholder="Region" value={region} onChange={e => setRegion(e.target.value)} className="border p-1 rounded" />
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleRegionFilter}>Filter</button>
        </div>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Region</th><th>Assigned Farmers</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent._id}>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.phone}</td>
                <td>{agent.region}</td>
                <td>{agent.assignedFarmers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Analytics */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Annual Revenue Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={annualRevenue}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Crop-wise Farmer Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={cropDistribution}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {cropDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Region-wise Revenue</h2>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th>Region</th><th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {regionRevenue.map(r => (
              <tr key={r.region}>
                <td>{r.region}</td>
                <td>{r.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;