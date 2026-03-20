// src/portal/shared/pages/ResetPasswordPage.tsx
// Reset password placeholder page for demo

import { useState, FormEvent } from 'react';
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
  Container,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

/**
 * Reset password placeholder page for demo mode
 */
export function ResetPasswordPage(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      // Redirect to login after showing success
      setTimeout(() => {
        navigate('/portal/login');
      }, 3000);
    }, 1000);
  };

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />

              <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Password Reset Successful
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your password has been successfully updated.
              </Typography>

              <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Demo Mode - Simulated Success
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  In demo mode, no actual password change occurs. Redirecting to login...
                </Typography>
              </Alert>

              <Typography variant="body2" color="text.secondary">
                You will be redirected to the login page in a few seconds.
              </Typography>
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
                Set New Password
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your new password below.
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

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                autoFocus
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
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  Password requirements:
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  • At least 8 characters • Uppercase and lowercase letters • At least one number
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 2, py: 1.5 }}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}