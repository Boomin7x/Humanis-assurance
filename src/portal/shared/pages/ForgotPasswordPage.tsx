// src/portal/shared/pages/ForgotPasswordPage.tsx
// Forgot password placeholder page for demo

import { useState, FormEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Link,
} from '@mui/material';
import { Email as EmailIcon, ArrowBack } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Forgot password placeholder page for demo mode
 */
export function ForgotPasswordPage(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Card sx={{ width: '100%', maxWidth: 450, boxShadow: 3 }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <EmailIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />

              <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Check Your Email
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We've sent a password reset link to <strong>{email}</strong>
              </Typography>

              <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Demo Mode Notice
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  In demo mode, no actual email is sent. This is a placeholder for the reset flow.
                </Typography>
              </Alert>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Didn't receive the email? Check your spam folder or{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                >
                  try again
                </Link>
              </Typography>

              <Button
                component={RouterLink}
                to="/portal/login"
                variant="contained"
                startIcon={<ArrowBack />}
                fullWidth
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 450, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Reset Your Password
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your email address and we'll send you a link to reset your password.
              </Typography>
            </Box>

            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Demo Mode - Placeholder Page
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                This is a placeholder for password reset functionality
              </Typography>
            </Alert>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                margin="normal"
                autoFocus
                placeholder="Enter your email address"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component={RouterLink}
                to="/portal/login"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                ← Back to Login
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}