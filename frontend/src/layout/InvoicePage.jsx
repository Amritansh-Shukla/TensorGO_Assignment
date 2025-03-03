import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebaseConfig";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const InvoicePage = () => {
  const [userName, setUserName] = useState();
  const [planType, setPlanType] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planStartDate, setPlanStartDate] = useState("");
  const [planEndDate, setPlanEndDate] = useState("");
  const [invoiceId, setInvoiceId] = useState("");

  const location = useLocation();
  const userData = location.state?.userData;

  // Plan prices mapping
  const planPrices = {
    basic: "99",
    pro: "499",
    business: "999",
  };

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (!user) return;

    setUserName(user.displayName || "Guest User");

    const userRef = firebase.database().ref(`users/${user.uid}`);

    userRef.once("value").then((snapshot) => {
      const userData = snapshot.val();
      if (!userData || !userData.subscription) return;

      const { planType, planStartDate, planEndDate } = userData.subscription;

      setPlanType(planType || "N/A");
      setPlanPrice(planPrices[planType] || "N/A");
      setPlanStartDate(formatDate(planStartDate));
      setPlanEndDate(formatDate(planEndDate));
      setInvoiceId(generateInvoiceId());
    });

    return () => userRef.off(); // Cleanup to avoid memory leaks
  }, []);

  // 🕒 Format date to DD/MM/YYYY
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-GB");
  };

  // 📌 Generate Invoice ID (Example: INV-20240303153030)
  const generateInvoiceId = () => {
    const now = new Date();
    return `INV-${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Invoice
      </h2>

      {/* Invoice Details */}
      <div className="border-b border-gray-300 pb-4">
        <p className="text-lg font-semibold">Invoice ID: {uuidv4()}</p>
        <p className="text-gray-600">Date: {formatDate(new Date())}</p>
        <p className="text-gray-600">Time: {new Date().toLocaleTimeString()}</p>
      </div>

      {/* User Details */}
      <div className="mt-4">
        <p className="text-lg font-semibold">User Information</p>
        <p className="text-gray-700">Name: {userData?.userName}</p>
      </div>

      {/* Subscription Details */}
      <div className="mt-4">
        <p className="text-lg font-semibold">Subscription Details</p>
        <p className="text-gray-700">Plan: {userData?.data[userData?.idx].title}</p>
        <p className="text-gray-700">
          Price: ₹{userData?.data[userData?.idx].price}
        </p>
        <p className="text-gray-700">
          Start Date: {new Date(Date.now()).toLocaleString()}
        </p>
        <p className="text-gray-700">
          End Date:{" "}
          {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleString()}
        </p>
      </div>

      {/* Print Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold"
          onClick={() => window.print()}
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
