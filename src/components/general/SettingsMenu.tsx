import { DarkMode, LightMode, LocationOn } from "@mui/icons-material";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import type { KeyboardEvent } from "react";

interface SettingsMenuProps {
  menuOpen: boolean;
  handleClose: (e: Event | React.SyntheticEvent) => void;
  handleListKeyDown: (event: KeyboardEvent<Element>) => void;
  toggleTheme?: () => void;
  toggleSound?: () => void;
  soundEnabled?: boolean;
  isDarkMode?: boolean;
}

function SettingsMenu({
  menuOpen,
  handleListKeyDown,
  toggleTheme,
  isDarkMode = false,
}: SettingsMenuProps) {
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

        <MenuItem>
          <ListItemIcon>
            <LocationOn fontSize="small" />
          </ListItemIcon>
          <ListItemText>Get Location Information</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default SettingsMenu;
