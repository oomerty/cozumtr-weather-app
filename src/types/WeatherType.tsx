export default interface WeatherType {
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
    is_day: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    gust_kph: number;
    humidity: number;
    dewpoint_c: number;
    uv: number;
    precip_mm: number;
    vis_km: number;
  };
  forecast: {
    forecastday: Array<{
      day: {
        maxtemp_c: number;
        mintemp_c: number;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }>;
    }>;
  };
  location: {
    name: string;
    country: string;
    localtime: string;
  };
}
