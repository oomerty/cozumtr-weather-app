import { memo, useEffect, useState } from "react";

import {
  Autocomplete,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
// import { getCityList } from "../../util/locationList";

// TEMP
const popularCities = [
  "Istanbul",
  "Ankara",
  "Izmir",
  "Antalya",
  "Bursa",
  "Adana",
  "Gaziantep",
  "Konya",
  "Mersin",
  "Diyarbakir",
  "Eskisehir",
  "London",
  "Paris",
  "New York",
  "Tokyo",
  "Berlin",
  "Rome",
  "Madrid",
  "Moscow",
  "Beijing",
  "Sydney",
  "Dubai",
  "Cairo",
];

const SearchBar = memo(function SearchBar({
  handleSearch,
  text,
}: {
  handleSearch: (city: string) => void;
  text: string;
}) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // const cityListArr = getCityList();

  useEffect(() => {
    if (search.trim().length > 0) {
      // const filtered = cityListArr.filter((city) =>
      const filtered = popularCities.filter((city) =>
        city.toLowerCase().includes(search.toLowerCase())
      );
      // setOptions(filtered.slice(0, 10));
      setOptions(filtered);
    } else {
      setOptions(popularCities.slice(0, 5));
    }
  }, [search]);

  function handleSearchSubmit(value: string) {
    if (value.trim()) {
      handleSearch(value);
      setSearch("");
      setOpen(false);
    }
  }

  return (
    <Autocomplete
      id="city-search"
      freeSolo
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      inputValue={search}
      onInputChange={(_, newValue) => {
        setSearch(newValue);
      }}
      onChange={(_, value) => {
        if (value) handleSearchSubmit(value);
      }}
      options={options}
      filterOptions={(x) => x} // Özel filtreleme kullanıyoruz
      sx={{ width: "100%" }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            borderRadius: 4,
            px: 1,
            transition: "700ms",
            "& .MuiAutocomplete-option": {
              borderRadius: 3,
            },
            "&::-webkit-scrollbar": {
              width: "8px",
              color: "red",
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "32px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: "32px",
              marginTop: "32px",
              marginBottom: "16px",
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={text || "Search"}
          variant="outlined"
          size="small"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(search);
            }
          }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              fontSize: "small",
              height: "40px",
              borderRadius: 2,
              paddingRight: 2,
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleSearchSubmit(search)}
                    edge="end"
                    size="small"
                    sx={{
                      color: "primary.secondary",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                      },
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}
        />
      )}
    />
  );
});

export default SearchBar;
