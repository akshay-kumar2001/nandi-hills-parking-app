import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const QrScanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      async decodedText => {
        try {
          const res = await api.get(`/parkingData?token=${decodedText}`);
          if (res.data.length > 0) {
            navigate(`/admin/scan-result/${decodedText}`);
          } else {
            alert("Invalid QR code.");
          }
        } catch (err) {
          console.error(err);
          alert("Error fetching data.");
        }
      },
      err => {
        console.warn("QR Scan Error", err);
      }
    );
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1597433179322-8047d91162b5?auto=format&fit=crop&w=1740&q=80')`,
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-lg shadow-2xl p-6 transition-transform hover:scale-105">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-teal-800 mb-6">
          Scan QR Code
        </h2>
        <div
          id="reader"
          className="rounded-lg border border-teal-300 shadow-lg p-2 bg-gray-100"
          style={{ width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default QrScanner;
