import axios from "axios";

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
  links: {
    patch: { small: string | null; large: string | null };
    flickr: { original: string[] };
    webcast: string | null;
  };
}

const API_URL = "https://api.spacexdata.com/v4/launches/latest";

export const fetchLatestLaunch = async (): Promise<Launch | null> => {
  try {
    const response = await axios.get(API_URL);

    return response.data as Launch;
  } catch (error) 
  {
    console.error("Error al obtener datos de SpaceX:", error);
    return null;
  }
};
