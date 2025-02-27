import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooltip from "@mui/material/Tooltip";

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError(""); // Reset error
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful !!!", { position: "top-center" });
      setTimeout(() => {
        navigate("/chat-home/1"); // Redirect after a short delay
      }, 2000);
    } catch (error) {
      let message = "An error occurred. Please try again.";
      if (error.code === "auth/user-not-found") {
        message = "User not found. Please check your email or sign up.";
      } else if (error.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email format. Please enter a valid email.";
        setEmailError("Invalid email format");
      }
      toast.error(message, { position: "top-center" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ padding: { xs: 2, sm: 4 } }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
            p: 4,
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "rotate(360deg)", // Rotates icon on hover
              },
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{
                "& .MuiInputBase-root:focus-within": {
                  borderColor: "primary.main", // Highlight border when focused
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.7, // Adds spacing between checkbox and label
                "& .MuiTypography-root": { fontSize: "1rem" },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                bgcolor: "primary.main",
                color: "white",
                fontSize: "1rem",
                padding: "10px",
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: "secondary.main",
                  transform: "scale(1.05)",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Adds shadow on hover
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              Sign In
            </Button>
            <Grid container sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
              <Grid item>
                
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Don't have an account? &nbsp;
                  <Link href="/Signup" variant="body2">
                    <strong>Sign Up</strong>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}