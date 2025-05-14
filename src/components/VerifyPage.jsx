import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

const VerifyPage = () => {
  const [booking, setBooking] = useState(null);
  const { token } = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`/parkingData?token=${token}`);
        setBooking(res.data[0]);
      } catch (err) {
        console.error(err);
        alert("Booking not found");
      }
    };

    fetchBooking();
  }, [token]);

  return (
    <div>
      {booking ? (
        <div>
          <h2>Booking Details</h2>
          <p>
            <strong>Name:</strong> {booking.name}
          </p>
          <p>
            <strong>Vehicle Number:</strong> {booking.vehicle}
          </p>
          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>
          <p>
            <strong>Vehicle Type:</strong> {booking.vehicleType}
          </p>
          <p>
            <strong>Number of Vehicles:</strong> {booking.count}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{booking.amount}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VerifyPage;
