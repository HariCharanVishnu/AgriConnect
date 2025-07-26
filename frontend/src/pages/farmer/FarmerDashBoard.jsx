import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const FarmerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [media, setMedia] = useState([]);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cropsRes, notificationsRes, paymentsRes, mediaRes] = await Promise.all([
          api.get("/crop/my"),
          api.get("/notification/my"),
          api.get("/payment/farmer"),
          api.get("/media/agent")
        ]);
        
        setCrops(cropsRes.data);
        setNotifications(notificationsRes.data);
        setPayments(paymentsRes.data);
        setMedia(mediaRes.data);
        
        if (cropsRes.data.length > 0 && cropsRes.data[0].agent) {
          setAgent(cropsRes.data[0].agent);
        }
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/farmer/register-crop")}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Register New Crop
              </button>
              <button
                onClick={() => navigate("/farmer/upload-media")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Upload Media
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
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
          {/* Crop Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Crop Management</h2>
            {crops.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {crops.map(crop => (
                      <tr key={crop._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{crop.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.cultivationStartDate?.slice(0,10)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            crop.status === 'approved' ? 'bg-green-100 text-green-800' :
                            crop.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {crop.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.quantity || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No crops registered yet.</p>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n._id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <p className="text-sm text-gray-900">{n.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No notifications.</p>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Cost</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map(p => (
                      <tr key={p._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.crop?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{p.estimatedCost}</td>
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

          {/* Agent Contact */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Agent Contact</h2>
            {agent ? (
              <div className="space-y-2">
                <div><span className="font-medium">Name:</span> {agent.name}</div>
                <div><span className="font-medium">Email:</span> {agent.email}</div>
                <div><span className="font-medium">Phone:</span> {agent.phone}</div>
                <div><span className="font-medium">Region:</span> {agent.region}</div>
              </div>
            ) : (
              <p className="text-gray-500">No agent assigned yet.</p>
            )}
          </div>
        </div>

        {/* Media Uploads */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Media Uploads</h2>
          {media.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {media.map(m => (
                <div key={m._id} className="border rounded-lg p-4">
                  <a 
                    href={`http://localhost:5000/${m.fileUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {m.fileType}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{m.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No media uploads yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;