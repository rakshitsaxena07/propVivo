import React, { useEffect, useState } from "react";
import { getCustomerByPhone } from "../../services/api";

export default function CustomerInfo() {
  const [customer, setCustomer] = useState(null);

  // Simulating customer lookup with static number for now
  useEffect(() => {
    const phone = "9876543210"; // Replace dynamically later
    getCustomerByPhone(phone).then((data) => setCustomer(data));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Customer Info</h2>
      {customer ? (
        <ul>
          <li>Name: {customer.name}</li>
          <li>Email: {customer.email}</li>
          <li>Phone: {customer.phoneNumber}</li>
        </ul>
      ) : (
        <p>Searching customer...</p>
      )}
    </div>
  );
}
