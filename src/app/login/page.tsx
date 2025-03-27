// src/app/(pages)/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // To redirect after "login"
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert, // For showing simulated errors
  Link as MuiLink, // For sign-up link
} from "@mui/material";
import { Mail, Lock, Eye, EyeOff } from "lucide-react"; // Import necessary icons

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // To simulate errors

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log("Simulating login with:", { email, password });

    // --- Simulate API Call ---
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait 1.5 seconds

    // --- Simulate Success/Error ---
    if (email === "user@example.com" && password === "password") {
      console.log("Simulated login successful!");
      // Redirect to home page after successful "login"
      router.push("/"); // Redirect to the main app page
    } else {
      console.log("Simulated login failed!");
      setError(
        'Invalid email or password. Try "user@example.com" / "password".'
      );
      setIsLoading(false);
    }
    // Note: In a real app, you'd handle token storage, context updates, etc.
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2, // Use theme's border radius
          }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 3, fontWeight: 600 }}>
            Access Your Learning {/* Creative Title */}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
                {error}
              </Alert>
            )}
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
              disabled={isLoading}
              InputProps={{
                // Add icon adornment
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              InputProps={{
                // Add icon adornment and visibility toggle
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Add Forgot Password Link if needed */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary" // Use theme color
              disabled={isLoading}
              sx={{ mt: 3, mb: 2, py: 1.5 }} // Make button slightly larger
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
            <Box textAlign="center">
              <Link href="/signup" passHref legacyBehavior>
                <MuiLink variant="body2">
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
