import React, { useRef, useState } from "react";
import api from "../api/axios";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";

const UserPanel = () => {
  const qrRef = useRef(null);
  const [display, setDisplay] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [formData, setFormData] = useState({
    token: "",
    vehicleNumber: "",
    email: "",
    phone: "",
    vehicleType: "",
    NumOfPeople: 1,
    paymentStatus: false,
    parkingStatus: false,
    TotalFee: 0,
    ParkingFee: 0,
    PeopleFee: 0,
  });

  const rates = {
    "2-wheeler": 70,
    "3-wheeler": 100,
    "4-wheeler": 150,
    "4-wheeler-bus": 200,
  };

  const downloadQRCode = () => {
    const svg = qrRef.current;
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(svgBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    if (name === "vehicleType" || name === "NumOfPeople") {
      const rate = rates[updatedForm.vehicleType] || 0;
      const count = parseInt(updatedForm.NumOfPeople) || 0;
      updatedForm.TotalFee = rate + count * 40;
      updatedForm.ParkingFee = rate;
      updatedForm.PeopleFee = count * 40;
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async () => {
    try {
      let date = new Date();
      const token = uuidv4();
      const res = await api.post("/parkingData", {
        ...formData,
        parkingStatus: true,
        token,
        timestamp: date.toLocaleTimeString(),
      });
      setQrData(token);
      setDisplay(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, #00000030,#00000045, #00000066, #000000c8), url('https://images.unsplash.com/photo-1593266314085-c349a6e877b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGlsbHxlbnwwfHwwfHx8MA%3D%3D')`,
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {display ? (
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl text-center flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your QR Code
          </h2>

          <div className="p-4 bg-gray-100 rounded-lg inline-block mb-4">
            <div ref={qrRef}>
              <QRCode value={qrData} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded shadow"
              onClick={() => setDisplay(false)}
            >
              Back
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow"
              onClick={downloadQRCode}
            >
              Download QR
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white bg-opacity-90 max-w-lg w-full p-8 rounded-xl shadow-2xl space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Book Nandi Hills Parking + Entry
          </h2>

          <input
            name="vehicleNumber"
            placeholder="Vehicle Number"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            name="vehicleType"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Vehicle Type</option>
            <option value="2-wheeler">2-Wheeler</option>
            <option value="3-wheeler">3-Wheeler</option>
            <option value="4-wheeler">4-Wheeler</option>
            <option value="4-wheeler-bus">Mini-Bus</option>
          </select>

          <input
            type="number"
            name="NumOfPeople"
            placeholder="Number of People"
            value={formData.NumOfPeople}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Fee Table */}
          <div className="mt-4 bg-gray-100 rounded-lg shadow-inner p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Fee Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-medium text-gray-600">Parking Fee:</div>
              <div className="text-right text-gray-800 font-semibold">
                ₹{formData.ParkingFee}
              </div>
              <div className="font-medium text-gray-600">People Fee:</div>
              <div className="text-right text-gray-800 font-semibold">
                ₹{formData.PeopleFee}
              </div>
              <div className="font-medium text-gray-600">Total Fee:</div>
              <div className="text-right text-indigo-600 font-bold text-base">
                ₹{formData.TotalFee}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded shadow-md transition-all duration-300"
          >
            Make Payment & Generate QR
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPanel;
