import { Box, Button, Typography } from "@mui/material";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { useStore } from "../store";

const Header = () => {
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backgroundColor: isDarkMode ? "#2b3743" : "#ffffff",
        boxShadow: "0px 2px 2px lightgrey",
      }}
    >
      <Typography variant="h1" sx={{ fontsize: "1rem", fontWeight: 700 }}>
        Where in the World?
      </Typography>
      <Button onClick={toggleDarkMode}>
        <NightlightRoundIcon />
        Dark Mode
      </Button>
    </Box>
  );
};

export default Header;
