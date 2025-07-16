import type WeatherType from "../types/WeatherType";

import { Box, Chip, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import WeatherSearchBar from "./WeatherSearchBar";
import WeatherSoundButton from "./WeatherSoundButton";

interface WeatherHeroType {
  details: WeatherType;
  handleSearch: (city: string) => void;
  loading?: boolean;
  error?: string | null;
}

function WeatherHero({
  details,
  handleSearch,
  loading,
  error,
}: WeatherHeroType) {
  const cityName = details?.location.name;
  const countryName = details?.location.country;

  const condition = details?.current.condition.text;
  const currentTemp = details?.current.temp_c;
  const highTemp = details?.forecast.forecastday[0].day.maxtemp_c;
  const lowTemp = details?.forecast.forecastday[0].day.mintemp_c;

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <WeatherSearchBar handleSearch={handleSearch} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
          }}
        >
          <LocationOn /> {loading || error || `${cityName}, ${countryName}`}{" "}
          {loading && "Loading..."}
        </Typography>

        <Typography
          variant="h2"
          sx={{ color: "text.primary", fontWeight: "600" }}
        >
          {loading || !!error || (currentTemp && `${currentTemp}°`)}{" "}
          {(loading || error) && "--.-°"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignSelf: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="h6">
            H: {loading || !!error || `${highTemp}°`}
            {(loading || error) && "--.-°"}
          </Typography>
          <Typography variant="h6">
            L: {loading || !!error || `${lowTemp}°`}
            {(loading || error) && "--.-°"}
          </Typography>
          <Chip
            label={loading || !!error ? "Condition" : condition}
            variant="outlined"
            sx={{
              border: "1px solid red",
              borderColor: "text.secondary",
              color: "text.secondary",
              fontWeight: "500",
              width: "max-content",
              alignSelf: "center",
            }}
          />
        </Box>

        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          {loading || !!error
            ? " "
            : currentTemp >= 30
            ? "It is quite hot outside, stay hydrated"
            : currentTemp >= 20
            ? "Weather is nice today, enjoy outdoors"
            : currentTemp >= 10
            ? "It is cool, don't forget your jacket"
            : "It is quite cold outsize, stay warm"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Chip
          label="New York"
          variant="filled"
          onClick={() => handleSearch("New York")}
        />
        <Chip
          label="London"
          variant="filled"
          onClick={() => handleSearch("London")}
        />
        <Chip
          label="Istanbul"
          variant="filled"
          onClick={() => handleSearch("Istanbul")}
        />
        <Chip
          label="Tokyo"
          variant="filled"
          onClick={() => handleSearch("Tokyo")}
        />
        <Chip
          label="Beijing"
          variant="filled"
          onClick={() => handleSearch("Beijing")}
        />
        <WeatherSoundButton condition={condition} />
      </Box>
    </Box>
  );
}

export default WeatherHero;
