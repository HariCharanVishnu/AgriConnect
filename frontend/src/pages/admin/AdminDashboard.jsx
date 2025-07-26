import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [region, setRegion] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState([]);
  const [cropDistribution, setCropDistribution] = useState([]);
  const [regionRevenue, setRegionRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [agentsRes, annualRevenueRes, cropDistributionRes, regionRevenueRes] = await Promise.all([
          api.get("/admin/agents"),
          api.get("/admin/analytics/annual-revenue"),
          api.get("/admin/analytics/crop-distribution"),
          api.get("/admin/analytics/region-revenue")
        ]);
        
        setAgents(agentsRes.data);
        setAnnualRevenue(annualRevenueRes.data);
        setCropDistribution(cropDistributionRes.data);
        setRegionRevenue(regionRevenueRes.data);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRegionFilter = async () => {
    try {
      const res = await api.get(`/admin/agents?region=${region}`);
      setAgents(res.data);
      setError("");
    } catch (err) {
      setError("Failed to filter agents");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Agent Supervision */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Agents</h2>
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder="Region" 
              value={region} 
              onChange={e => setRegion(e.target.value)} 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleRegionFilter}
            >
              Filter
            </button>
          </div>
          {agents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Farmers</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {agents.map(agent => (
                    <tr key={agent._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{agent.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{agent.assignedFarmers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No agents found.</p>
          )}
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Annual Revenue Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Annual Revenue Trends</h2>
            {annualRevenue.length > 0 ? (
              <div className="space-y-3">
                {annualRevenue.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium">{item.year}</span>
                    <span className="text-green-600 font-semibold">₹{item.revenue}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No revenue data available.</p>
            )}
          </div>

          {/* Crop Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Crop-wise Farmer Distribution</h2>
            {cropDistribution.length > 0 ? (
              <div className="space-y-3">
                {cropDistribution.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium">{item._id}</span>
                    <span className="text-blue-600 font-semibold">{item.count} farmers</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No crop distribution data available.</p>
            )}
          </div>
        </div>

        {/* Region Revenue */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Region-wise Revenue</h2>
          {regionRevenue.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {regionRevenue.map(r => (
                    <tr key={r.region}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.region}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{r.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No region revenue data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;