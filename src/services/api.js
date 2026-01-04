import axios from "axios";

export const subscribePlan = async (
  username,
  planName,
  duration,
  billingType
) => {
  const res = await axios.post("http://localhost:5001/api/subscribe", {
    username,
    planName,
    duration,
    billingType
  });
  return res.data;
};
