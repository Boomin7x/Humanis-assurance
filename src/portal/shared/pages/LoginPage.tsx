/* eslint-disable @typescript-eslint/no-explicit-any */
// src/portal/shared/pages/LoginPage.tsx
// Portal login page with demo credentials and form validation

import { useState, FormEvent } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  Stack,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { DEMO_CREDENTIALS } from "../mock/mockAuthService";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

/**
 * Portal login page with form validation and demo credentials
 */
export function LoginPage(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from navigation state or default based on role
  const from = (location.state as any)?.from;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData);

      // Determine redirect path
      let redirectPath = from;

      if (!redirectPath) {
        // Default redirects based on user role (will be determined after login)
        // We'll use a simple check of the email to determine the role for demo
        const isAgent = formData.email.includes("agent");
        redirectPath = isAgent
          ? "/portal/agent/dashboard"
          : "/portal/customer/dashboard";
      }

      navigate(redirectPath, { replace: true });
    } catch (err) {
      // Error is handled by the auth context
      console.error("Login failed:", err);
    }
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error on change
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      // Clear auth error on input change
      if (error) {
        clearError();
      }
    };

  const fillDemoCredentials = (type: "agent" | "customer"): void => {
    const credentials = DEMO_CREDENTIALS[type];
    setFormData(credentials);
    setErrors({});
    if (error) clearError();
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
            boxShadow: "none", // Insurance compliance - no shadows
            border: "1px solid",
            borderColor: "neutral.300",
            backgroundColor: "background.paper",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
              {/* Insurance Brand Authority */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "primary.500",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    fontSize: "0.75rem",
                  }}
                >
                  Secure Insurance Portal
                </Typography>
              </Box>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700, // Stronger for authority
                  fontSize: { xs: "1.75rem", sm: "2.125rem" },
                  color: "primary.700", // Insurance navy
                  mb: 1,
                }}
              >
                Humanis Portal
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  fontWeight: 500, // Professional emphasis
                }}
              >
                Trusted access to your insurance account
              </Typography>
            </Box>

            {/* Professional Demo Mode Banner */}
            <Alert
              severity="info"
              sx={{
                mb: 3,
                borderRadius: 2, // Insurance standard
                border: "1px solid",
                borderColor: "info.main",
                backgroundColor: "rgba(2, 132, 199, 0.05)", // Subtle info background
                "& .MuiAlert-icon": {
                  color: "info.main",
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, color: "info.main" }}>
                🛡️ Demo Environment
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5, color: "text.secondary" }}>
                Professional demonstration with secure mock data
              </Typography>
            </Alert>

            {/* Professional Demo Access */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontSize: "0.8125rem",
                }}
              >
                Quick Access Options:
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 2 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Person />}
                  onClick={() => fillDemoCredentials("agent")}
                  sx={{
                    minHeight: 44,
                    px: 2,
                    py: 1.5,
                    fontSize: { xs: "0.875rem", sm: "0.8125rem" },
                    flex: { xs: 1, sm: 'none' },
                    fontWeight: 500,
                    textTransform: "none",
                    borderColor: "primary.300",
                    color: "primary.700",
                    "&:hover": {
                      borderColor: "primary.500",
                      backgroundColor: "primary.50",
                    },
                  }}
                >
                  Insurance Agent
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Person />}
                  onClick={() => fillDemoCredentials("customer")}
                  sx={{
                    minHeight: 44,
                    px: 2,
                    py: 1.5,
                    fontSize: { xs: "0.875rem", sm: "0.8125rem" },
                    flex: { xs: 1, sm: 'none' },
                    fontWeight: 500,
                    textTransform: "none",
                    borderColor: "secondary.300",
                    color: "secondary.700",
                    "&:hover": {
                      borderColor: "secondary.500",
                      backgroundColor: "secondary.50",
                    },
                  }}
                >
                  Policy Holder
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Professional Error Alert */}
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "error.main",
                  backgroundColor: "rgba(220, 38, 38, 0.05)",
                  "& .MuiAlert-icon": {
                    color: "error.main",
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, color: "error.main" }}>
                  {error}
                </Typography>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                autoComplete="email"
                sx={{
                  '& .MuiInputBase-root': {
                    minHeight: { xs: 56, sm: 'auto' }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                autoComplete="current-password"
                sx={{
                  '& .MuiInputBase-root': {
                    minHeight: { xs: 56, sm: 'auto' }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                        sx={{ minWidth: 44, minHeight: 44 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  mt: { xs: 2, sm: 3 },
                  mb: 2,
                  py: { xs: 2, sm: 1.5 },
                  minHeight: 48,
                  fontSize: { xs: "1rem", sm: "0.9375rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px", // Insurance standard
                  boxShadow: "none", // Insurance compliance
                  "&:hover": {
                    boxShadow: "none",
                    transform: "translateY(-1px)", // Subtle interaction
                  },
                  "&:disabled": {
                    backgroundColor: "neutral.200",
                    color: "neutral.500",
                  },
                }}
              >
                {isLoading ? "Authenticating..." : "Access Portal"}
              </Button>
            </form>

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link
                component={RouterLink}
                to="/portal/forgot-password"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                Forgot your password?
              </Link>
            </Box>

            {/* Professional Footer */}
            <Box
              sx={{
                textAlign: "center",
                mt: 4,
                pt: 3,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              {/* Security Indicators */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "success.main",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                  }}
                >
                  🔒 256-bit SSL Encryption • GDPR Compliant
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                }}
              >
                © 2025 Humanis Insurance Portal • Professional Demo Environment
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
