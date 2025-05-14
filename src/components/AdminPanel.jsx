import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "./QrScanner";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Admin Dashboard - QR Scanner</h2>
      <QrScanner />
    </div>
  );
};

export default AdminPanel;
