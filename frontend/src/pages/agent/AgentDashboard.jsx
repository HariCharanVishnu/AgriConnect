import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const AgentDashboard = () => {
  const [pendingCrops, setPendingCrops] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [cropNameFilter, setCropNameFilter] = useState("");
  const [farmerIdFilter, setFarmerIdFilter] = useState("");
  const [aiCropId, setAiCropId] = useState("");
  const [aiResult, setAiResult] = useState("");

  useEffect(() => {
    api.get("/agent/pending-crops").then(res => setPendingCrops(res.data));
    api.get("/agent/farmers").then(res => setFarmers(res.data));
    api.get("/payment/agent").then(res => setPayments(res.data));
  }, []);

  const handleFilter = async () => {
    let url = "/agent/farmers?";
    if (cropNameFilter) url += `cropName=${cropNameFilter}&`;
    if (farmerIdFilter) url += `farmerId=${farmerIdFilter}`;
    const res = await api.get(url);
    setFarmers(res.data);
  };

  const approveCrop = async (cropId) => {
    await api.post(`/agent/approve-crop/${cropId}`);
    setPendingCrops(pendingCrops.filter(c => c._id !== cropId));
  };

  const rejectCrop = async (cropId) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    await api.post(`/agent/reject-crop/${cropId}`, { reason });
    setPendingCrops(pendingCrops.filter(c => c._id !== cropId));
  };

  const handleAIPredict = async () => {
    if (!aiCropId) return;
    const res = await api.post("/ai/crop-predict", { cropId: aiCropId });
    setAiResult(res.data.prediction || JSON.stringify(res.data));
    alert("Prediction sent to farmer as notification!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>

      {/* Pending Crops */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Pending Crop Registrations</h2>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th>Farmer</th><th>Crop</th><th>Acres</th><th>Start</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingCrops.map(crop => (
              <tr key={crop._id}>
                <td>{crop.farmer?.name}</td>
                <td>{crop.name}</td>
                <td>{crop.acres}</td>
                <td>{crop.cultivationStartDate?.slice(0,10)}</td>
                <td>
                  <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded" onClick={() => approveCrop(crop._id)}>Approve</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => rejectCrop(crop._id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Farmer Filtering */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Farmers in Region</h2>
        <div className="flex gap-2 mb-2">
          <input type="text" placeholder="Crop Name" value={cropNameFilter} onChange={e => setCropNameFilter(e.target.value)} className="border p-1 rounded" />
          <input type="text" placeholder="Farmer ID" value={farmerIdFilter} onChange={e => setFarmerIdFilter(e.target.value)} className="border p-1 rounded" />
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleFilter}>Filter</button>
        </div>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th>Farmer</th><th>Crop</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map(crop => (
              <tr key={crop._id}>
                <td>{crop.farmer?.name}</td>
                <td>{crop.name}</td>
                <td>{crop.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* AI Prediction */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">AI Tools</h2>
        <div className="flex gap-2 mb-2">
          <input type="text" placeholder="Crop ID" value={aiCropId} onChange={e => setAiCropId(e.target.value)} className="border p-1 rounded" />
          <button className="bg-purple-500 text-white px-2 py-1 rounded" onClick={handleAIPredict}>Predict & Notify</button>
        </div>
        {aiResult && <div className="bg-gray-100 p-2 rounded">Result: {aiResult}</div>}
      </section>

      {/* Payments */}
      <section>
        <h2 className="text-xl font-semibold">Payments</h2>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th>Farmer</th><th>Crop</th><th>Est. Cost</th><th>Service Fee</th><th>Profit Share</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id}>
                <td>{p.farmer?.name}</td>
                <td>{p.crop?.name}</td>
                <td>{p.estimatedCost}</td>
                <td>{p.serviceFee}</td>
                <td>{p.profitShare}</td>
                <td>{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AgentDashboard;