// src/app/(auth)/signup/page.tsx // Or your actual path
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  User,
  Mail,
  Lock,
  EyeOff,
  Eye,
  Rocket,
  Sparkles,
 // Added missing icons from login for consistency if needed later
} from "lucide-react";
import { motion } from "framer-motion";

// Animation variants (same as login)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }, // Slightly faster stagger?
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function SignupPage() {
  const theme = useTheme();
  const router = useRouter();

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for submission status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    /* ... as before ... */
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "90vh", // Keep your adjusted minHeight
        display: "flex",
        alignItems: "center",
        py: 4, // Add some vertical padding to the container too
      }}>
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        sx={{
          width: "100%",
          borderRadius: 4,
          p: 3, // *** REDUCED PADDING HERE (from 4 to 3) ***
          boxShadow: theme.shadows[12],
          border: `1px solid ${theme.palette.divider}`,
          backdropFilter: "blur(12px)", // Browser support varies
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, rgba(39,39,42,0.9) 0%, rgba(24,24,27,0.9) 100%)" // Example dark background
              : "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.9) 100%)", // Example light background
          color: theme.palette.text.primary,
        }}>
        {/* Animated Header */}
        <Box
          component={motion.div}
          sx={{ textAlign: "center", mb: 3 }}>
          <Sparkles
            size={40}
            color={theme.palette.secondary.main}
            style={{ marginBottom: "16px" }}
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 1, fontWeight: 700 }}>
            Create Your Dev Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {`Like writing your first 'Hello, World!' - the start of something amazing. Let's get you set up!`}
          </Typography>
        </Box>

        {/* Signup Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ width: "100%" }}>
              {success}
            </Alert>
          )}

          {/* --- Name Field --- */}
          <TextField
            component={motion.div}
            required
            fullWidth
            id="name"
            label="Your Name / Handle"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            variant="outlined"
            suppressHydrationWarning={true}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={20} color={theme.palette.primary.light} />
                  </InputAdornment>
                ),
                sx: {
                  color: theme.palette.text.primary /* other input styles */,
                },
              },
              inputLabel: { sx: { color: theme.palette.text.secondary } },
            }}
          />

          {/* --- Email Field --- */}
          <TextField
            component={motion.div}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            variant="outlined"
            suppressHydrationWarning={true}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} color={theme.palette.primary.light} />
                  </InputAdornment>
                ),
                sx: {
                  color: theme.palette.text.primary /* other input styles */,
                },
              },
              inputLabel: { sx: { color: theme.palette.text.secondary } },
            }}
          />

          {/* --- Password Field --- */}
          <TextField
            component={motion.div}
            required
            fullWidth
            id="password"
            label="Create Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            variant="outlined"
            suppressHydrationWarning={true}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} color={theme.palette.primary.light} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: theme.palette.text.primary /* other input styles */,
                },
              },
              inputLabel: { sx: { color: theme.palette.text.secondary } },
            }}
          />

          {/* --- Confirm Password Field --- */}
          <TextField
            component={motion.div}
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            variant="outlined"
            suppressHydrationWarning={true}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} color={theme.palette.primary.light} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password confirmation visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}>
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: theme.palette.text.primary /* other input styles */,
                },
              },
              inputLabel: { sx: { color: theme.palette.text.secondary } },
            }}
            error={!!error && error.includes("Passwords don't match")}
          />

          {/* --- Submit Button --- */}
          <Box component={motion.div} >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading || !!success}
              startIcon={isLoading ? undefined : <Rocket size={20} />}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                fontWeight: 600,
                py: 1.5,
                mt: 2,
                color: theme.palette.primary.contrastText,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 24px ${theme.palette.primary.main}4D`,
                },
              }}>
              {isLoading ? (
                <CircularProgress size={26} color="inherit" />
              ) : (
                "Sign Up & Start Coding"
              )}
            </Button>
          </Box>
        </Box>

        {/* Footer Link to Login */}
        <Typography
          component={motion.div}
          variant="body2"
          sx={{
            textAlign: "center",
            mt: 4,
            color: theme.palette.text.secondary,
          }}>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: theme.palette.primary.light,
              textDecoration: "none",
            }}>
            Log In Here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
