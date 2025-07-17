import { DarkMode, LightMode, LocationOn } from "@mui/icons-material";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import type { KeyboardEvent } from "react";

const IP_URL = import.meta.env.VITE_IP_API_URL;

interface SettingsMenuProps {
  menuOpen: boolean;
  handleClose: (e: Event | React.SyntheticEvent) => void;
  handleListKeyDown: (event: KeyboardEvent<Element>) => void;
  toggleTheme?: () => void;
  handleSearch: (city: string) => void;
  isDarkMode?: boolean;
}

function SettingsMenu({
  menuOpen,
  handleListKeyDown,
  toggleTheme,
  handleSearch,
  isDarkMode = false,
}: SettingsMenuProps) {
  async function handleGetLocation() {
    try {
      const res = await fetch(IP_URL);
      const json = await res.json();
      if (json && json.ip) {
        handleSearch(json.ip);
      } else {
        handleSearch("Eskisehir");
      }
      return json;
    } catch {
      throw new Error("An error occured while gettin IP.");
    }
  }

  return (
    <Paper
      sx={{
        mt: 1,
        borderRadius: 6,
        padding: 1,
        width: 320,
        maxWidth: "100%",
        overflow: "hidden",
      }}
      elevation={3}
      onClick={(e) => e.stopPropagation()}
    >
      <MenuList
        autoFocusItem={menuOpen}
        onKeyDown={handleListKeyDown}
        dense
        sx={{ py: 0.5 }}
      >
        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            {isDarkMode ? (
              <LightMode fontSize="small" sx={{ color: "warning.main" }} />
            ) : (
              <DarkMode fontSize="small" sx={{ color: "text.secondary" }} />
            )}
          </ListItemIcon>
          <ListItemText>{isDarkMode ? "Light Mode" : "Dark Mode"}</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleGetLocation}>
          <ListItemIcon>
            <LocationOn fontSize="small" />
          </ListItemIcon>
          <ListItemText>Get Current Location</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default SettingsMenu;
