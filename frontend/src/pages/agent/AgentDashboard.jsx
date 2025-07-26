import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const AgentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pendingCrops, setPendingCrops] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [cropNameFilter, setCropNameFilter] = useState("");
  const [farmerIdFilter, setFarmerIdFilter] = useState("");
  const [aiCropId, setAiCropId] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pendingRes, farmersRes, paymentsRes] = await Promise.all([
          api.get("/agent/pending-crops"),
          api.get("/agent/farmers"),
          api.get("/payment/agent")
        ]);
        
        setPendingCrops(pendingRes.data);
        setFarmers(farmersRes.data);
        setPayments(paymentsRes.data);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = async () => {
    try {
      let url = "/agent/farmers?";
      if (cropNameFilter) url += `cropName=${cropNameFilter}&`;
      if (farmerIdFilter) url += `farmerId=${farmerIdFilter}`;
      const res = await api.get(url);
      setFarmers(res.data);
    } catch (err) {
      setError("Failed to filter farmers");
    }
  };

  const approveCrop = async (cropId) => {
    try {
      await api.post(`/agent/approve-crop/${cropId}`);
      setPendingCrops(pendingCrops.filter(c => c._id !== cropId));
      setError("");
    } catch (err) {
      setError("Failed to approve crop");
    }
  };

  const rejectCrop = async (cropId) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    
    try {
      await api.post(`/agent/reject-crop/${cropId}`, { reason });
      setPendingCrops(pendingCrops.filter(c => c._id !== cropId));
      setError("");
    } catch (err) {
      setError("Failed to reject crop");
    }
  };

  const handleAIPredict = async () => {
    if (!aiCropId) {
      setError("Please enter a crop ID");
      return;
    }
    
    try {
      const res = await api.post("/ai/crop-predict", { cropId: aiCropId });
      setAiResult(res.data.prediction || JSON.stringify(res.data));
      alert("Prediction sent to farmer as notification!");
      setError("");
    } catch (err) {
      setError("Failed to get AI prediction");
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
              <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Crops */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Crop Registrations</h2>
            {pendingCrops.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acres</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingCrops.map(crop => (
                      <tr key={crop._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{crop.farmer?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.acres}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button 
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors"
                            onClick={() => approveCrop(crop._id)}
                          >
                            Approve
                          </button>
                          <button 
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                            onClick={() => rejectCrop(crop._id)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No pending crops.</p>
            )}
          </div>

          {/* Farmer Filtering */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Farmers in Region</h2>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Crop Name" 
                value={cropNameFilter} 
                onChange={e => setCropNameFilter(e.target.value)} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text" 
                placeholder="Farmer ID" 
                value={farmerIdFilter} 
                onChange={e => setFarmerIdFilter(e.target.value)} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleFilter}
              >
                Filter
              </button>
            </div>
            {farmers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {farmers.map(crop => (
                      <tr key={crop._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{crop.farmer?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            crop.status === 'approved' ? 'bg-green-100 text-green-800' :
                            crop.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {crop.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No farmers found.</p>
            )}
          </div>

          {/* AI Prediction */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">AI Tools</h2>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Crop ID" 
                value={aiCropId} 
                onChange={e => setAiCropId(e.target.value)} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                onClick={handleAIPredict}
              >
                Predict & Notify
              </button>
            </div>
            {aiResult && (
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium mb-2">AI Prediction Result:</h3>
                <p className="text-sm text-gray-700">{aiResult}</p>
              </div>
            )}
          </div>

          {/* Payments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Payments</h2>
            {payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map(p => (
                      <tr key={p._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.farmer?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.crop?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{p.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No payments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;