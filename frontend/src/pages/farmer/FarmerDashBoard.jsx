import React, { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const FarmerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [media, setMedia] = useState([]);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    api.get("/crop/my").then(res => setCrops(res.data));
    api.get("/notification/my").then(res => setNotifications(res.data));
    api.get("/payment/farmer").then(res => setPayments(res.data));
    api.get("/media/agent").then(res => setMedia(res.data));
  }, []);

  useEffect(() => {
    if (crops.length > 0 && crops[0].agent) setAgent(crops[0].agent);
  }, [crops]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Crop Management</h2>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th>Name</th><th>Start</th><th>End</th><th>Status</th><th>Qty</th><th>Price</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(crop => (
              <tr key={crop._id}>
                <td>{crop.name}</td>
                <td>{crop.cultivationStartDate?.slice(0,10)}</td>
                <td>{crop.endDate?.slice(0,10) || "-"}</td>
                <td>{crop.status}</td>
                <td>{crop.quantity || "-"}</td>
                <td>{crop.price || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <ul>
          {notifications.map(n => (
            <li key={n._id} className="border-b py-1">{n.message} <span className="text-xs text-gray-500">({n.type})</span></li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Payments</h2>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th>Crop</th><th>Est. Cost</th><th>Service Fee</th><th>Profit Share</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id}>
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
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Agent Contact</h2>
        {agent ? (
          <div>
            <div>Name: {agent.name}</div>
            <div>Email: {agent.email}</div>
            <div>Phone: {agent.phone}</div>
            <div>Region: {agent.region}</div>
          </div>
        ) : <div>No agent assigned yet.</div>}
      </section>
      <section>
        <h2 className="text-xl font-semibold">Media Uploads</h2>
        <ul>
          {media.map(m => (
            <li key={m._id}>
              <a href={`http://localhost:5000/${m.fileUrl}`} target="_blank" rel="noopener noreferrer">{m.fileType}</a> - {m.description}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FarmerDashboard;