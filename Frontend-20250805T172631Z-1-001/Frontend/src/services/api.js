import axios from "axios";

const API_BASE = "https://localhost:5001/api";

export const getCustomerByPhone = async (phone) => {
  try {
    const res = await axios.get(`${API_BASE}/customers/lookup?phone=${phone}`);
    return res.data;
  } catch (err) {
    console.error("Customer fetch failed", err);
    return null;
  }
};
