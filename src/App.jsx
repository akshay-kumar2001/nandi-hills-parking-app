// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPanel from "./components/UserPanel";
import AdminPanel from "./components/AdminPanel";
import QrScannerComponent from "./components/QrScanner";
import ScanResult from "./components/ScanResult"; // To display scan result
import AdminLogin from "./components/AdminLogin";
import QrScanner from "./components/QrScanner";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPanel />} />
        {/* <Route path="/" element={<QrScanner />} /> */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/qr-scanner" element={<QrScanner />} />
        <Route path="/admin/scan-result/:data" element={<ScanResult />} />
      </Routes>
    </Router>
  );
};

export default App;
