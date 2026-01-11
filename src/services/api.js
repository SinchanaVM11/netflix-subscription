import axios from "axios";

const API = axios.create({
  baseURL: "https://netflix-subscription-production.up.railway.app",
});

export const subscribePlan = async (
  username,
  plan,
  duration,
  billingType
) => {
  const res = await API.post("/subscribe", {
    username,
    plan,
    duration,
    billingType,
  });
  return res.data;
};
