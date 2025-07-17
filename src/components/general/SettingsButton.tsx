import { Box, Button, Popper } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import SettingsMenu from "./SettingsMenu";
import { useThemeMode } from "../../contexts/useThemeMode";

function SettingsButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { mode, setMode, setForceMode } = useThemeMode();
  const isDarkMode = mode === "night";

  const handleToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setMenuOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setMenuOpen(false);
    } else if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  const toggleTheme = () => {
    setMode(isDarkMode ? "day" : "night");
    setForceMode(true);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        sx={{
          paddingX: 0,
          minWidth: "40px",
          borderRadius: "50%",
          aspectRatio: "1/1",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "rotate(30deg)",
          },
        }}
        onClick={handleToggle}
        ref={anchorRef}
      >
        <SettingsIcon />
      </Button>
      {menuOpen && (
        <Popper
          open={menuOpen}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          style={{ zIndex: 1300 }}
          modifiers={[
            {
              name: "preventOverflow",
              enabled: true,
              options: {
                altAxis: true,
                altBoundary: true,
                boundary: document.body,
                padding: 8,
              },
            },
          ]}
        >
          <SettingsMenu
            menuOpen={menuOpen}
            handleClose={handleClose}
            handleListKeyDown={handleListKeyDown}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
          />
        </Popper>
      )}
    </Box>
  );
}

export default SettingsButton;
