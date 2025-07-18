const containerGlass =
  "linear-gradient(to right bottom, rgba(0, 0, 0, 0.1), rgba(25, 25, 25, 0.1))";
const containerGlassBorder = "rgba(255, 255, 255, 0.2)";
const bodyBackground = "linear-gradient(180deg, #00060f 30%, #10357a 90%)";

const darkTheme = {
  components: {
    // CSS BASELINE
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: bodyBackground,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        },
      },
    },
    // PAPER
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "32px",
          // Glass
          backgroundColor: "transparent",
          backdropFilter: "blur(24px)",
          fillOpacity: "50%",
          border: `1px solid ${containerGlassBorder}`,
          boxShadow: "none",
          backgroundImage: containerGlass,

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
            marginY: "32px",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#e9ecef",
          borderRadius: "24px",
          backgroundColor: "transparent",
          backdropFilter: "blur(24px)",
          border: `1px solid ${containerGlassBorder}`,
          boxShadow: "none",
          backgroundImage: containerGlass,
          "&:hover": {
            backgroundColor: "rgba(25, 25, 25, 0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            input: {
              color: "rgba(255, 255, 255, 0.6)",
            },
            "& fieldset": {
              borderRadius: "24px",
              backgroundColor: "transparent",
              backdropFilter: "blur(24px)",
              fillOpacity: "50%",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "none",
              backgroundImage: containerGlass,
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "24px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "24px",
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          margin: 8,
          marginBottom: 0,
          padding: 24,
          borderRadius: "24px 24px 0 0",
          backgroundColor: "transparent",
          backdropFilter: "blur(24px)",
          fillOpacity: "50%",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "none",
          backgroundImage: containerGlass,
          maxHeight: "66vh",
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
    },
    // MENU
    MuiMenuList: {
      styleOverrides: {
        root: {
          margin: 1,
          borderRadius: 12,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
  },
  palette: {
    backgroundImage: {
      default: bodyBackground,
    },
  },
};

export default darkTheme;
