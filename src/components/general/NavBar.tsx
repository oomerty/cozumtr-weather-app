import type WeatherType from "../../types/WeatherType";

import { Box, Grid, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import SettingsButton from "./SettingsButton";
import getTime from "../../util/getTime";

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
      sx={{
        position: "sticky",
        paddingY: { xs: 0, md: 2 },
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Grid sx={{ width: { xs: "100%", md: "25%" } }}>
        <NavbarUpdateDate details={details} />
      </Grid>

      <Grid
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          width: { xs: "100%", md: "50%" },
          textAlign: "center",
        }}
      >
        <NavbarLocation
          details={details}
          loading={loading}
          error={error}
          heroOffScreen={heroOffScreen}
        />
      </Grid>

      <Grid
        sx={{
          width: { xs: "100%", md: "25%" },
          display: "flex",
          gap: 1,
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <SettingsButton handleSearch={handleSearch} />
        <SearchBar
          text={
            details ? `${details?.location.name} & more` : "Search a location"
          }
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
      {details ? getTime(details?.location.localtime, "hh:mm") : "--:--"}
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
  const currentTemp = details?.current.temp_c;

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      width="fit-content"
      margin="0 auto"
      position="relative"
    >
      <Typography
        variant="subtitle1"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          color: "text.secondary",
          textAlign: "left",
        }}
      >
        {<LocationOn />} {loading || error || `${cityName}, ${countryName}`}{" "}
        {loading && "—, —"}
      </Typography>

      {heroOffScreen && (
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            textAlign: "right",
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
          {loading || error || `${currentTemp}°`}
          {loading && "—.-°"}
        </Typography>
      )}
    </Box>
  );
}

export default NavBar;
