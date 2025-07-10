import { useState, type ChangeEvent } from "react";

import type WeatherType from "../types/WeatherType";

import {
  Box,
  Button,
  Chip,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";

interface WeatherHeroType {
  details: WeatherType;
  handleSearch: (city: string) => void;
}

function WeatherHero({ details, handleSearch }: WeatherHeroType) {
  const [search, setSearch] = useState("");

  const cityName = details?.location.name;
  const countryName = details?.location.country;

  function handleSearchField(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e?.target.value);
  }

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
      <FormControl sx={{ width: "100%", flexDirection: "row", gap: 1 }}>
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchField}
          sx={{ width: "100%" }}
        />

        <Button
          variant="contained"
          onClick={() => {
            handleSearch(search);
            setSearch("");
          }}
          sx={{
            borderRadius: 6,
            textTransform: "none",
            fontWeight: "semibold",
            padding: "0 24px",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          Search
        </Button>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: 1,
        }}
      >
        <Typography variant="h5" sx={{ color: "text.secondary" }}>
          <LocationOn /> {cityName}, {countryName}
        </Typography>

        <Typography
          variant="h2"
          sx={{ color: "text.primary", fontWeight: "600" }}
        >
          {currentTemp && currentTemp}°
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
          <Typography variant="h6">H: {highTemp && highTemp}°</Typography>
          <Typography variant="h6">L: {lowTemp && lowTemp}°</Typography>
          <Chip
            label={condition}
            variant="outlined"
            sx={{
              fontWeight: "500",
              width: "max-content",
              alignSelf: "center",
            }}
          />
        </Box>

        <Typography variant="body1" sx={{ fontWeight: "400" }}>
          {currentTemp >= 30
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
      </Box>
    </Box>
  );
}

export default WeatherHero;
