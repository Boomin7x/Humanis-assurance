/* eslint-disable @typescript-eslint/no-explicit-any */
// src/portal/customer/claims/DeclareClaimPanel.tsx
// Slide-in drawer panel for declaring new claims

import {
  AttachFile as AttachFileIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useCallback, useState } from "react";

import { useAuth } from "../../shared/hooks/useAuth";
import {
  useLazyMockFetch,
  useMockFetch,
} from "../../shared/hooks/useMockFetch";

import { submitClaim } from "../../shared/mock/mockClaimService";
import { getCustomerPolicies } from "../../shared/mock/mockPolicyService";
import type { Claim } from "../../shared/types";

interface DeclareClaimPanelProps {
  open: boolean;
  onClose: () => void;
  onClaimSubmitted: (claim: Claim) => void;
}

interface ClaimFormData {
  policyId: string;
  dateOfIncident: Date | null;
  description: string;
  attachments: File[];
}

interface FormErrors {
  policyId?: string;
  dateOfIncident?: string;
  description?: string;
}

/**
 * Validates the claim form data
 */
const validateForm = (formData: ClaimFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.policyId) {
    errors.policyId = "Please select a policy";
  }

  if (!formData.dateOfIncident) {
    errors.dateOfIncident = "Please select the date of incident";
  } else if (formData.dateOfIncident > new Date()) {
    errors.dateOfIncident = "Date of incident cannot be in the future";
  }

  if (!formData.description.trim()) {
    errors.description = "Please provide a description of the incident";
  } else if (formData.description.trim().length < 20) {
    errors.description = "Description must be at least 20 characters long";
  }

  return errors;
};

/**
 * Declare Claim Panel component
 */
export function DeclareClaimPanel({
  open,
  onClose,
  onClaimSubmitted,
}: DeclareClaimPanelProps): React.ReactElement {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ClaimFormData>({
    policyId: "",
    dateOfIncident: null,
    description: "",
    attachments: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>("");

  // Fetch customer policies (active only)
  const fetchActivePolicies = useCallback(async () => {
    const policies = await getCustomerPolicies(user?.id || "");
    return policies.filter((policy) => policy.status === "Active");
  }, [user?.id]);

  const { data: activePolicies, loading: loadingPolicies } =
    useMockFetch(fetchActivePolicies);

  // Submit claim
  const [submitClaimRequest, { loading: submitting }] = useLazyMockFetch(() =>
    submitClaim({
      policyId: formData.policyId,
      policyNumber:
        activePolicies?.find((p) => p.id === formData.policyId)?.policyNumber ||
        "",
      customerId: user?.id || "",
      dateOfIncident: formData.dateOfIncident!,
      description: formData.description,
      attachments: formData.attachments.map((file) => file.name),
    }),
  );

  /**
   * Reset form when panel opens/closes
   */
  React.useEffect(() => {
    if (!open) {
      setFormData({
        policyId: "",
        dateOfIncident: null,
        description: "",
        attachments: [],
      });
      setErrors({});
      setSubmitError("");
    }
  }, [open]);

  /**
   * Handle form field changes
   */
  const handleFieldChange = useCallback(
    (field: keyof ClaimFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field when user starts typing
      if (field in errors && errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      setSubmitError("");
    },
    [errors],
  );

  /**
   * Handle file upload
   */
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (files.length > 0) {
        setFormData((prev) => ({
          ...prev,
          attachments: [...prev.attachments, ...files],
        }));
      }
      // Clear the input so the same file can be selected again if needed
      event.target.value = "";
    },
    [],
  );

  /**
   * Handle file removal
   */
  const handleRemoveFile = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      // Validate form
      const formErrors = validateForm(formData);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      try {
        const newClaim = await submitClaimRequest();
        if (newClaim) {
          onClaimSubmitted(newClaim);
          onClose();
        }
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Failed to submit claim",
        );
      }
    },
    [formData, submitClaimRequest, onClaimSubmitted, onClose],
  );

  /**
   * Format file size for display
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 480 } },
      }}
    >
      <Box
        sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" component="h2">
            Declare New Claim
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* Policy Selection */}
            <FormControl fullWidth margin="normal" error={!!errors.policyId}>
              <InputLabel>Select Policy</InputLabel>
              <Select
                value={formData.policyId}
                onChange={(e) => handleFieldChange("policyId", e.target.value)}
                label="Select Policy"
                disabled={loadingPolicies}
              >
                {activePolicies?.map((policy) => (
                  <MenuItem key={policy.id} value={policy.id}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {policy.product}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {policy.policyNumber} • {policy.productType}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {errors.policyId && (
                <FormHelperText>{errors.policyId}</FormHelperText>
              )}
            </FormControl>

            {/* Date of Incident */}
            <DatePicker
              label="Date of Incident"
              value={formData.dateOfIncident}
              onChange={(date) => handleFieldChange("dateOfIncident", date)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal",
                  error: !!errors.dateOfIncident,
                  helperText: errors.dateOfIncident,
                },
              }}
              maxDate={new Date()}
            />

            {/* Description */}
            <TextField
              fullWidth
              margin="normal"
              label="Description of Incident"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              error={!!errors.description}
              helperText={
                errors.description ||
                "Please provide a detailed description of what happened"
              }
              placeholder="Describe the incident in detail, including when, where, and how it occurred..."
            />

            {/* File Attachments */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Attachments (Optional)
              </Typography>

              <input
                accept="image/*,.pdf,.doc,.docx"
                style={{ display: "none" }}
                id="file-upload"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AttachFileIcon />}
                  size="small"
                  fullWidth
                >
                  Add Files
                </Button>
              </label>

              {/* File List */}
              {formData.attachments.length > 0 && (
                <List
                  dense
                  sx={{
                    mt: 1,
                    bgcolor: "background.paper",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  {formData.attachments.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <AttachFileIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        secondary={formatFileSize(file.size)}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontSize: "0.875rem",
                          },
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFile(index)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              )}

              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: 1 }}
              >
                Supported formats: Images, PDF, Word documents (Max 5MB per
                file)
              </Typography>
            </Box>

            {/* Submit Error */}
            {submitError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {submitError}
              </Alert>
            )}
          </LocalizationProvider>

          {/* Actions */}
          <Box sx={{ mt: "auto", pt: 3 }}>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={onClose}
                variant="outlined"
                fullWidth
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={submitting || loadingPolicies}
                startIcon={
                  submitting ? <CircularProgress size={20} /> : undefined
                }
              >
                {submitting ? "Submitting..." : "Submit Claim"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
