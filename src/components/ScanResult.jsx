import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const ScanResult = () => {
  const { data } = useParams();
  const [scanDetails, setScanDetails] = useState(null);

  useEffect(() => {
    const fetchScanData = async () => {
      try {
        const res = await api.get(`/parkingData?token=${data}`);
        if (res.data.length > 0) {
          setScanDetails(res.data[0]);
        } else {
          alert("No data found for this QR code.");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching scan details.");
      }
    };

    fetchScanData();
  }, [data]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1740&q=80')`,
      }}
    >
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md shadow-xl rounded-lg p-8 transition-transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-8">
          Parking Scan Result
        </h2>
        {scanDetails ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
            <div className="p-4 bg-teal-50 rounded shadow hover:bg-teal-100">
              <strong>Email:</strong>
              <p>{scanDetails.email || "Not Provided"}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded shadow hover:bg-blue-100">
              <strong>Vehicle Number:</strong>
              <p>{scanDetails.vehicleNumber}</p>
            </div>
            <div className="p-4 bg-pink-50 rounded shadow hover:bg-pink-100">
              <strong>Vehicle Type:</strong>
              <p>{scanDetails.vehicleType}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded shadow hover:bg-yellow-100">
              <strong>Number of People:</strong>
              <p>{scanDetails.NumOfPeople}</p>
            </div>
            <div className="p-4 bg-lime-50 rounded shadow hover:bg-lime-100">
              <strong>Total Fee:</strong>
              <p>₹{scanDetails.TotalFee}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded shadow hover:bg-gray-100">
              <strong>Payment Status:</strong>
              <p
                className={
                  scanDetails.paymentStatus ? "text-green-600" : "text-red-600"
                }
              >
                {scanDetails.paymentStatus
                  ? "Payment Received"
                  : "Payment Pending"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ScanResult;
