const containerGlass =
  "linear-gradient(to right bottom, rgba(255, 255, 255, 0.1), rgba(230, 230, 230, 0.1))";
const containerGlassBorder = "rgba(255, 255, 255, 0.2)";

const lightTheme = {
  components: {
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
        },
      },
    },
    MuiChip: {
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          backgroundColor: "transparent",
          backdropFilter: "blur(24px)",
          fillOpacity: "50%",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "none",
          backgroundImage:
            "linear-gradient(to right bottom, rgba(25, 75, 255, 0.7), rgba(43, 89, 255, 0.7))",
          "&:hover": {
            backgroundColor: "rgba(5, 58, 252, 0.7)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              color: {
                light: "rgba(0, 0, 0, 0.6)",
                dark: "rgba(255, 255, 255, 0.6)",
              },
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
        },
      },
    },
  },
};

export default lightTheme;
