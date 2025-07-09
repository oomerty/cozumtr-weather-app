import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface WeatherHeroType {
  details: object;
  handleSearch: (city: string) => void;
}

function WeatherHero({ details, handleSearch }: WeatherHeroType) {
  const [search, setSearch] = useState("");

  const cityName = details?.location.name;
  const countryName = details?.location.country;

  function handleSearchField(
    e: React.ChangeEvent<HTMLInputElement | HTMLAreaElement>
  ) {
    // e.preventDefault();
    setSearch(e?.target.value);
  }

  const currentTemp = details?.current.temp_c;

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
          value={search}
          onChange={(e) => handleSearchField(e)}
          sx={{ width: "100%" }}
        />

        <Button
          variant="contained"
          onClick={() => {
            handleSearch(search);
            setSearch("");
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
        <Typography variant="h5">
          {cityName}, {countryName}
        </Typography>
        <Typography variant="h2">{currentTemp && currentTemp}°</Typography>
        <Typography variant="body1">
          {details && details?.current.condition.text}
        </Typography>

        <Typography variant="subtitle1">
          {currentTemp >= 30
            ? "It is quite hot outside, stay hydrated"
            : currentTemp >= 20
            ? "Weather is nice today, enjoy outdoors"
            : currentTemp >= 10
            ? "It is cool, don't forget your jacket"
            : "It is quite cold outsize, stay warm"}
        </Typography>
      </Box>

      <Box>
        <Typography>Popular Cities</Typography>
        <Button variant="text" onClick={() => handleSearch("New York")}>
          New York
        </Button>
        <Button variant="text" onClick={() => handleSearch("London")}>
          London
        </Button>
        <Button variant="text" onClick={() => handleSearch("Istanbul")}>
          Istanbul
        </Button>
        <Button variant="text" onClick={() => handleSearch("Tokyo")}>
          Tokyo
        </Button>
        <Button variant="text" onClick={() => handleSearch("Beijing")}>
          Beijing
        </Button>
      </Box>
    </Box>
  );
}

export default WeatherHero;
