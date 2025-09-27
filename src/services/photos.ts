import axios from "axios";
import type { Photo } from "../types/photo";

const API_KEY = "563492ad6f9170000100000108dc2880626e4436b3634ce1cf6b4d74";

// axios.defaults.baseURL = "https://api.pexels.com/v1/";
// axios.defaults.headers.common["Authorization"] = API_KEY;
// axios.defaults.params = {
//   orientation: "landscape",
// };

const pexelsService = axios.create({
  baseURL: "https://api.pexels.com/v1/",
  headers: {
    Authorization: API_KEY,
  },
  params: {
    orientation: "landscape",
  },
});

interface ResponseData {
  photos: Photo[];
  total_results: number;
  per_page: number;
}

export const getPhotos = async (query: string): Promise<ResponseData> => {
  const response = await pexelsService.get<ResponseData>(
    `search?query=${query}`
  );

  return response.data;
};
