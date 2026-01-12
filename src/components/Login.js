import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "User";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost/api/login.php", {
        username,
        password,
        role,
      });

      if (response.data.success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          if (role === "Admin") {
            navigate("/AdminDashboard");
          } else if (role === "User") {
            navigate("/UserDashboard");
          } if (role === "Police") {
            navigate("/PoliceDashboard");
          } else {
            navigate("/DashBoard"); // Default fallback
          }
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #141E30, #243B55)",
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 5,
            textAlign: "center",
            px: 4,
            py: 5,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1a237e", mb: 1 }}>
              {role.charAt(0).toUpperCase() + role.slice(1)} Login
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Please enter your credentials below.
            </Typography>

            <Box sx={{ mt: 3 }}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#1a237e" },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#1a237e" },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{
                  mt: 2,
                  py: 1,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  background: "#1a237e",
                  "&:hover": { background: "#0d1b5e" },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
