import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PoliceIcon from "@mui/icons-material/LocalPolice";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { styled, keyframes } from "@mui/system";

// Background Animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Background = styled("div")({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
});

const GlassCard = styled(Paper)({
  padding: "50px",
  textAlign: "center",
  borderRadius: "16px",
  backdropFilter: "blur(12px)",
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  color: "#fff",
  width: "90%",
  maxWidth: "420px",
  animation: `${fadeIn} 0.8s ease-in-out`,
  border: "1px solid rgba(255, 255, 255, 0.2)",
});

const StyledButton = styled(Button)({
  padding: "14px 22px",
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "8px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.06)",
    boxShadow: "0px 5px 12px rgba(255, 255, 255, 0.2)",
  },
});

const FirstPage = () => {
  const navigate = useNavigate();

  // const handleLogin = (role) => {
  //   navigate(`/login?role=${role}`);
  const handleLogin = (role) => {
    navigate(`/LoginDummy`);
  };

  return (
    <Background>
      <GlassCard elevation={12}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ fontWeight: "bold", color: "#f1f1f1", letterSpacing: "1px" }}
        >
          Login Portal
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
          <StyledButton
            variant="contained"
            startIcon={<PoliceIcon />}
            sx={{ bgcolor: "#1976D2", "&:hover": { bgcolor: "#1565C0" } }}
            onClick={() => handleLogin("police")}
          >
            Police Login
          </StyledButton>
          <StyledButton
            variant="contained"
            startIcon={<PersonIcon />}
            sx={{ bgcolor: "#2E7D32", "&:hover": { bgcolor: "#1B5E20" } }}
            onClick={() => handleLogin("member")}
          >
            Member Login
          </StyledButton>
          <StyledButton
            variant="contained"
            startIcon={<AdminPanelSettingsIcon />}
            sx={{ bgcolor: "#D32F2F", "&:hover": { bgcolor: "#B71C1C" } }}
            onClick={() => handleLogin("admin")}
          >
            Admin Login
          </StyledButton>
        </Box>
      </GlassCard>
    </Background>
  );
};

export default FirstPage;
