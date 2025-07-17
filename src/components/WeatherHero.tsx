import type WeatherType from "../types/WeatherType";

import { LocationOn, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface WeatherHeroType {
  details: WeatherType;
  loading?: boolean;
  error?: string | null;
  ref: React.RefObject<unknown>;
}

function WeatherHero({ details, loading, error, ref }: WeatherHeroType) {
  const condition = details?.current.condition.text;
  const currentTemp = details?.current.temp_c;
  const highTemp = details?.forecast.forecastday[0].day.maxtemp_c;
  const lowTemp = details?.forecast.forecastday[0].day.mintemp_c;
  const cityName = details?.location.name;
  const countryName = details?.location.country;

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
      ref={ref}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          gap: 1,
          height: { xs: "max-content", md: "33vh" },
          paddingTop: { xs: 8, md: 0 },
          paddingBottom: { xs: 0, md: 4 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: { xs: "inline-block", md: "none" },
            fontWeight: 500,
            color: "text.secondary",
          }}
        >
          <LocationOn /> {loading || error || `${cityName}, ${countryName}`}{" "}
          {loading && "Loading..."}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            display: { xs: "none", md: "inline-block" },
          }}
        >
          {loading || !!error ? "Condition" : condition}
        </Typography>

        <Typography
          variant="h2"
          className="hero-temp"
          sx={{
            fontWeight: "700",
            fontSize: "96px",
          }}
        >
          {loading || !!error || (currentTemp && `${currentTemp}°`)}{" "}
          {(loading || error) && "—.-°"}
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
            <ArrowUpward fontSize="inherit" />{" "}
            {loading || !!error || `${highTemp}°`}
            {(loading || error) && "—.-°"}
          </Typography>
          <Typography variant="h6">
            <ArrowDownward fontSize="inherit" />{" "}
            {loading || !!error || `${lowTemp}°`}
            {(loading || error) && "—.-°"}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            display: { xs: "inline-block", md: "none" },
          }}
        >
          {loading || !!error ? "Condition" : condition}
        </Typography>

        {/* <Typography variant="body1" sx={{ fontWeight: "400" }}>
          {loading || !!error
            ? " "
            : currentTemp >= 30
            ? "It is quite hot outside, stay hydrated"
            : currentTemp >= 20
            ? "Weather is nice today, enjoy outdoors"
            : currentTemp >= 10
            ? "It is cool, don't forget your jacket"
            : "It is quite cold outsize, stay warm"}
        </Typography> */}
      </Box>
    </Box>
  );
}

export default WeatherHero;
