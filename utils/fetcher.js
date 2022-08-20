import axios from "axios";

export const fetcher = async (url, params) => {
  const option = {
    method: params ? "POST" : "GET",
    url: url,
    ...(params && { params: params }),
  };

  const { data } = await axios.request(option);
  return data;
};
