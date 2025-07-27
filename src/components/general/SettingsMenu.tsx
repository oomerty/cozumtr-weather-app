import type { KeyboardEvent } from "react";

import { useThemeMode } from "../../contexts/useThemeMode";

import {
  DarkMode,
  LightMode,
  LocationOn,
  ColorLens,
} from "@mui/icons-material";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import getLocation from "../../util/getLocation";

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
  const { forceMode, setForceMode } = useThemeMode();

  async function handleGetLocation() {
    try {
      const position = await getLocation();

      if (position && position) {
        handleSearch(`${position.latitude}, ${position.longitude}`);
      } else {
        handleSearch("Eskisehir");
      }
      return null;
    } catch {
      throw new Error("An error occured while gettin IP.");
    }
  }

  const handleThemeForceMode = () => {
    setForceMode(!forceMode);
  };

  return (
    <Paper
      sx={{
        mt: 1,
        borderRadius: 6,
        px: 1,
        py: 0.5,
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
        <MenuItem onClick={handleGetLocation}>
          <ListItemIcon>
            <LocationOn fontSize="small" />
          </ListItemIcon>
          <ListItemText>Get Current Location</ListItemText>
        </MenuItem>

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

        <MenuItem onClick={handleThemeForceMode}>
          <ListItemIcon>
            <ColorLens fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {" "}
            {forceMode ? "Use Dynamic Theming" : "Force Current Theme"}
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default SettingsMenu;
