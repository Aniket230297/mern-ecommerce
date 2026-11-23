
import api from "../api/axios";

export const aiProductSearch = async (prompt) => {
  const response = await api.post("/ai/search", {
    prompt,
  });

  return response.data;
};
