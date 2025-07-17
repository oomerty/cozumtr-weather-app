const containerGlass =
  "linear-gradient(to right bottom, rgba(0, 0, 0, 0.1), rgba(25, 25, 25, 0.1))";
const containerGlassBorder = "rgba(255, 255, 255, 0.2)";

const darkTheme = {
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
          borderRadius: "24px",
          backgroundColor: "transparent",
          backdropFilter: "blur(24px)",
          fillOpacity: "50%",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "none",
          color: "white",
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
  },
};

export default darkTheme;
