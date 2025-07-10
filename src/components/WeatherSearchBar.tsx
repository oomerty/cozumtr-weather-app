import { useState, type ChangeEvent } from "react";
import { Button, FormControl, TextField } from "@mui/material";

function WeatherSearchBar({
  handleSearch,
}: {
  handleSearch: (city: string) => void;
}) {
  const [search, setSearch] = useState("");

  function handleSearchField(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e?.target.value);
  }

  return (
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
  );
}

export default WeatherSearchBar;
