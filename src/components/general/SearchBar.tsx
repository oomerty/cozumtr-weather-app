import { useState, type ChangeEvent } from "react";
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";

function SearchBar({
  handleSearch,
  text,
}: {
  handleSearch: (city: string) => void;
  text: string;
}) {
  const [search, setSearch] = useState("");

  function handleSearchField(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e?.target.value);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      handleSearch(search);
      setSearch("");
    }
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <TextField
        id="search"
        label={text ? text : "Search"}
        variant="outlined"
        size="small"
        value={search}
        onChange={handleSearchField}
        onKeyDown={handleKeyPress}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "24px",
            paddingRight: "8px",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (search.trim()) {
                    handleSearch(search);
                    setSearch("");
                  }
                }}
                edge="end"
                sx={{
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}

export default SearchBar;
