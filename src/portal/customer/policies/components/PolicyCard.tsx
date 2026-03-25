// src/portal/customer/policies/components/PolicyCard.tsx
// Enhanced policy card component for displaying policy information in card format

import {
  CheckCircle as CheckIcon,
  Description as DocumentIcon,
  Autorenew as RenewIcon,
  Schedule as ScheduleIcon,
  Visibility as ViewIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { StatusChip } from "../../../shared/components/StatusChip";
import type { Policy } from "../../../shared/types";

interface PolicyCardProps {
  policy: Policy;
  onDownloadDocuments?: (policy: Policy) => void;
  onRequestRenewal?: (policy: Policy) => void;
  showActions?: boolean;
  compact?: boolean;
}

/**
 * Formats currency for display
 */
const formatCurrency = (amount: number, currency: string = "XAF"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats date for display
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

/**
 * Calculate days until expiry and return status info
 */
const getExpiryInfo = (endDate: Date) => {
  const now = new Date();
  const daysUntilExpiry = Math.ceil(
    (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  const isExpired = daysUntilExpiry < 0;
  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  const isExpiringSoonCritical = daysUntilExpiry <= 7 && daysUntilExpiry > 0;

  return {
    daysUntilExpiry,
    isExpired,
    isExpiringSoon,
    isExpiringSoonCritical,
    statusIcon: isExpired ? (
      <WarningIcon color="error" />
    ) : isExpiringSoonCritical ? (
      <WarningIcon color="warning" />
    ) : isExpiringSoon ? (
      <ScheduleIcon color="warning" />
    ) : (
      <CheckIcon color="success" />
    ),
  };
};

/**
 * Compact policy card for grid views
 */
function CompactPolicyCard({ policy }: { policy: Policy }): React.ReactElement {
  const navigate = useNavigate();
  const { daysUntilExpiry, isExpired, isExpiringSoon, statusIcon } =
    getExpiryInfo(policy.endDate);

  const handleViewDetails = useCallback(() => {
    navigate(`/portal/customer/policies/${policy.id}`);
  }, [navigate, policy.id]);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: isExpired ? 2 : 1,
        borderColor: isExpired ? "error.main" : "divider",
        "&:hover": {
          boxShadow: "none",
          borderColor: "#1D6FA4",
          borderWidth: 2,
        },
      }}
    >
      <CardContent sx={{ flex: 1, pb: 1 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontSize: "1.1rem", fontWeight: 600 }}
            >
              {policy.product}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "monospace" }}
            >
              {policy.policyNumber}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {statusIcon}
            <StatusChip status={policy.status} variant="filled" size="small" />
          </Box>
        </Box>

        {/* Product Type */}
        <Box sx={{ mb: 2 }}>
          <Chip
            label={policy.productType}
            size="small"
            variant="outlined"
            color="primary"
          />
        </Box>

        {/* Key Info */}
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Coverage:
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {formatCurrency(policy.coverageAmount, policy.currency)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Premium:
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {formatCurrency(policy.premium, policy.currency)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Expires:
            </Typography>
            <Typography
              variant="body2"
              fontWeight={500}
              color={
                isExpired
                  ? "error.main"
                  : isExpiringSoon
                    ? "warning.main"
                    : "text.primary"
              }
            >
              {formatDate(policy.endDate)}
            </Typography>
          </Box>
        </Stack>

        {/* Expiry Warning */}
        {(isExpired || isExpiringSoon) && (
          <Box
            sx={{
              p: 1,
              bgcolor: isExpired ? "#FEF2F2" : "#FFFBEB",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: isExpired ? "#FCA5A5" : "#FDE68A",
            }}
          >
            <Typography
              variant="caption"
              color={isExpired ? "error.main" : "warning.main"}
              fontWeight={500}
            >
              {isExpired
                ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                : `Expires in ${daysUntilExpiry} days`}
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ px: 2, py: 1, pt: 0 }}>
        <Button
          size="small"
          startIcon={<ViewIcon />}
          onClick={handleViewDetails}
          fullWidth
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

/**
 * Full policy card with all details
 */
function FullPolicyCard({
  policy,
  onDownloadDocuments,
  onRequestRenewal,
  showActions = true,
}: PolicyCardProps): React.ReactElement {
  const navigate = useNavigate();
  const { daysUntilExpiry, isExpired, isExpiringSoon, isExpiringSoonCritical } =
    getExpiryInfo(policy.endDate);

  // Calculate policy term progress
  const totalDays = Math.ceil(
    (policy.endDate.getTime() - policy.startDate.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const daysPassed = Math.ceil(
    (new Date().getTime() - policy.startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const progressPercent = Math.min(
    100,
    Math.max(0, (daysPassed / totalDays) * 100),
  );

  const handleViewDetails = useCallback(() => {
    navigate(`/portal/customer/policies/${policy.id}`);
  }, [navigate, policy.id]);

  const handleDownload = useCallback(() => {
    if (onDownloadDocuments) {
      onDownloadDocuments(policy);
    }
  }, [onDownloadDocuments, policy]);

  const handleRenewal = useCallback(() => {
    if (onRequestRenewal) {
      onRequestRenewal(policy);
    }
  }, [onRequestRenewal, policy]);

  return (
    <Card
      sx={{
        border: isExpired ? 2 : 1,
        borderColor: isExpired ? "error.main" : "divider",
        "&:hover": {
          boxShadow: "none",
          borderColor: "#1D6FA4",
          borderWidth: 2,
        },
      }}
    >
      <CardContent>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              component="h3"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {policy.product}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontFamily: "monospace", mb: 1 }}
            >
              Policy #{policy.policyNumber}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={policy.productType}
                size="small"
                variant="outlined"
                color="primary"
              />
              <StatusChip
                status={policy.status}
                variant="filled"
                size="small"
              />
            </Stack>
          </Box>

          {showActions && (
            <Stack direction="row" spacing={1}>
              <Tooltip title="View Details">
                <IconButton size="small" onClick={handleViewDetails}>
                  <ViewIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download Documents">
                <IconButton size="small" onClick={handleDownload}>
                  <DocumentIcon />
                </IconButton>
              </Tooltip>
              {policy.status === "Active" && (
                <Tooltip title="Request Renewal">
                  <IconButton size="small" onClick={handleRenewal}>
                    <RenewIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          )}
        </Box>

        {/* Policy Details Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            mb: 3,
          }}
        >
          {/* Left Column */}
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Coverage Amount
              </Typography>
              <Typography variant="h6" color="primary.main" fontWeight={600}>
                {formatCurrency(policy.coverageAmount, policy.currency)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Premium ({policy.paymentFrequency})
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatCurrency(policy.premium, policy.currency)}
              </Typography>
            </Box>

            {policy.deductible && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Deductible
                </Typography>
                <Typography variant="body1">
                  {formatCurrency(policy.deductible, policy.currency)}
                </Typography>
              </Box>
            )}
          </Stack>

          {/* Right Column */}
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Policy Term
              </Typography>
              <Typography variant="body1">
                {formatDate(policy.startDate)} - {formatDate(policy.endDate)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Days Until Expiry
              </Typography>
              <Typography
                variant="body1"
                color={
                  isExpired
                    ? "error.main"
                    : isExpiringSoon
                      ? "warning.main"
                      : "text.primary"
                }
                fontWeight={500}
              >
                {isExpired
                  ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                  : `${daysUntilExpiry} days remaining`}
              </Typography>
            </Box>

            {policy.riskAddress && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Risk Address
                </Typography>
                <Typography variant="body2">{policy.riskAddress}</Typography>
              </Box>
            )}
          </Stack>
        </Box>

        {/* Policy Term Progress */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Policy Term Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progressPercent)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 6,
              borderRadius: "4px",
              "& .MuiLinearProgress-bar": {
                borderRadius: "4px",
              },
            }}
            color={isExpired ? "error" : isExpiringSoon ? "warning" : "primary"}
          />
        </Box>

        {/* Alerts */}
        {(isExpired || isExpiringSoon) && (
          <Box
            sx={{
              p: 2,
              bgcolor: isExpired ? "#FEF2F2" : "#FFFBEB",
              borderRadius: "4px",
              border: "1px solid",
              borderColor: isExpired ? "#FCA5A5" : "#FDE68A",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <WarningIcon color={isExpired ? "error" : "warning"} />
            <Typography
              variant="body2"
              color={isExpired ? "error.main" : "warning.main"}
              fontWeight={500}
            >
              {isExpired
                ? "This policy has expired. Contact your agent to renew."
                : isExpiringSoonCritical
                  ? "Policy expires very soon! Renew now to avoid coverage gaps."
                  : "Policy expires soon. Consider renewing to maintain coverage."}
            </Typography>
          </Box>
        )}
      </CardContent>

      {showActions && (
        <CardActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ViewIcon />}
            onClick={handleViewDetails}
          >
            View Details
          </Button>

          <Button
            variant="outlined"
            startIcon={<DocumentIcon />}
            onClick={handleDownload}
          >
            Documents
          </Button>

          {policy.status === "Active" && (
            <Button
              variant="contained"
              startIcon={<RenewIcon />}
              onClick={handleRenewal}
              color={isExpiringSoon ? "warning" : "primary"}
            >
              {isExpiringSoon ? "Renew Now" : "Request Renewal"}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

/**
 * Main PolicyCard component that switches between compact and full versions
 */
export function PolicyCard(props: PolicyCardProps): React.ReactElement {
  if (props.compact) {
    return <CompactPolicyCard {...props} />;
  }

  return <FullPolicyCard {...props} />;
}

/**
 * Policy card grid component for displaying multiple policies
 */
export function PolicyCardGrid({
  policies,
  compact = false,
  onDownloadDocuments,
  onRequestRenewal,
}: {
  policies: Policy[];
  compact?: boolean;
  onDownloadDocuments?: (policy: Policy) => void;
  onRequestRenewal?: (policy: Policy) => void;
}): React.ReactElement {
  if (policies.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No policies found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: compact ? "repeat(2, 1fr)" : "1fr",
          md: compact ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
          lg: compact ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
        },
        gap: 3,
      }}
    >
      {policies.map((policy) => (
        <PolicyCard
          key={policy.id}
          policy={policy}
          compact={compact}
          onDownloadDocuments={onDownloadDocuments}
          onRequestRenewal={onRequestRenewal}
        />
      ))}
    </Box>
  );
}
