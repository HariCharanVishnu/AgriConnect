import React, { useState } from "react";
import api from "../../api/axios";

const CropRegistrationForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    acres: "",
    cultivationStartDate: "",
    preferredLanguage: "",
    typeOfSoil: "",
    endDate: "",
    quantity: "",
    price: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/crop/register", form);
      setMessage("Crop registered successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl mb-2">Register New Crop</h2>
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          name={key}
          value={value}
          onChange={handleChange}
          placeholder={key.replace(/([A-Z])/g, " $1")}
          className="w-full mb-2 p-2 border rounded"
        />
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      {message && <div className="mt-2 text-blue-600">{message}</div>}
    </form>
  );
};

export default CropRegistrationForm;