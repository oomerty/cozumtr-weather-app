import type WeatherType from "../../types/WeatherType";

import { Box, Grid, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import SearchBar from "./SearchBar";

interface NavBarProps {
  details: WeatherType;
  handleSearch: (city: string) => void;
  loading: boolean;
  error: string | null;
  heroOffScreen: boolean;
}

interface NavbarLocationProps {
  details: WeatherType;
  loading: boolean;
  error: string | null;
  heroOffScreen: boolean;
}

function NavBar({
  details,
  handleSearch,
  loading,
  error,
  heroOffScreen,
}: NavBarProps) {
  return (
    <Grid
      container
      width="100%"
      spacing={2}
      sx={{
        position: "sticky",
        paddingY: { xs: 0, md: 2 },
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid columns={4}>
        <NavbarUpdateDate details={details} />
      </Grid>

      <Grid
        columns={4}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <NavbarLocation
          details={details}
          loading={loading}
          error={error}
          heroOffScreen={heroOffScreen}
        />
      </Grid>

      <Grid columns={4} sx={{ width: { xs: "100%", md: "max-content" } }}>
        <SearchBar
          text={`Search cities like ${details?.location.name}`}
          handleSearch={handleSearch}
        />
      </Grid>
    </Grid>
  );
}

function NavbarUpdateDate({ details }: { details: WeatherType }) {
  return (
    <Typography
      variant="subtitle2"
      sx={{ display: { xs: "none", md: "inline-block" } }}
    >
      Updated at:{" "}
      {details ? details?.location.localtime.split(" ").at(1) : "--:--"}
    </Typography>
  );
}

function NavbarLocation({
  details,
  loading,
  error,
  heroOffScreen,
}: NavbarLocationProps) {
  const cityName = details?.location.name;
  const countryName = details?.location.country;
  const condition = details?.current.condition.text;
  const currentTemp = details?.current.temp_c;

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <Typography
        variant="subtitle1"
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

      {heroOffScreen && (
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            animation: "animate 1s linear forwards",
            "@keyframes animate": {
              "0%": {
                right: "-16px",
                opacity: "0%",
              },
              "100%": {
                right: "0",
                opacity: "100%",
              },
            },
          }}
        >
          {loading || error || `${currentTemp}° ${condition}`}
          {loading && "--.-°"}
        </Typography>
      )}
    </Box>
  );
}

export default NavBar;
