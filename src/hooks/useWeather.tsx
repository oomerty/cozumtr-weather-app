import useSWRMutation from "swr/mutation";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface UseWeatherReturn {
  fetchWeather: (city: string) => void;
  weather: object;
  loading: boolean;
  error: string | null;
}

interface ErrorResponse {
  error?: {
    message?: string;
  };
}

async function weatherFetcher(_: string, { arg }: { arg: string }) {
  const url = `${API_URL}/forecast.json`;

  try {
    const res = await axios({
      method: "GET",
      url,
      params: {
        key: API_KEY,
        q: arg,
        days: 2,
      },
    });
    return res.data;
  } catch (err: unknown) {
    const axiosError = err as AxiosError<ErrorResponse>;
    throw new Error(
      axiosError?.response?.data?.error?.message ?? "An error occured"
    );
  }
}

export function useWeather(): UseWeatherReturn {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "weather",
    weatherFetcher
  );

  return {
    fetchWeather: trigger,
    weather: data || null,
    loading: isMutating,
    error: error?.message || null,
  };
}
