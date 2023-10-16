import { AxiosInstance } from "../apis/api";

export const GetDataPT = async () => {
  const res = await AxiosInstance.get("/app");
  return res.data.data;
};
