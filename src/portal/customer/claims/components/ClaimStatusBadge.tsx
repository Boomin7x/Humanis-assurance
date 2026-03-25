// src/portal/customer/claims/components/ClaimStatusBadge.tsx
// Enhanced status badge component for consistent claim status display with icons and animations

import {
  CheckCircle as ApprovedIcon,
  Lock as ClosedIcon,
  HourglassEmpty as InProgressIcon,
  RadioButtonUnchecked as OpenIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";
import { Box, Chip, Tooltip, alpha } from "@mui/material";
import React from "react";

import type { ClaimStatus } from "../../../shared/types";

interface ClaimStatusBadgeProps {
  status: ClaimStatus;
  size?: "small" | "medium";
  variant?: "filled" | "outlined";
  showIcon?: boolean;
  showTooltip?: boolean;
  className?: string;
}

/**
 * Get status configuration including colors, icons, and descriptions
 */
const getStatusConfig = (status: ClaimStatus) => {
  const configs = {
    Open: {
      label: "Open",
      color: "info" as const,
      icon: <OpenIcon fontSize="small" />,
      description:
        "Claim has been submitted and is under professional review by our claims team",
      backgroundColor: "#E8F3FA",
      textColor: "#1D6FA4",
    },
    "In Progress": {
      label: "In Progress",
      color: "warning" as const,
      icon: <InProgressIcon fontSize="small" />,
      description:
        "Claim is currently being carefully reviewed and processed by our specialists",
      backgroundColor: "#FEF3CD",
      textColor: "#D97706",
    },
    Approved: {
      label: "Approved",
      color: "success" as const,
      icon: <ApprovedIcon fontSize="small" />,
      description:
        "Claim has been approved and payment processing has commenced",
      backgroundColor: "#DCFCE7",
      textColor: "#16A34A",
    },
    Rejected: {
      label: "Rejected",
      color: "error" as const,
      icon: <RejectedIcon fontSize="small" />,
      description:
        "Claim requires additional documentation or does not meet policy terms",
      backgroundColor: "#FEE2E2",
      textColor: "#DC2626",
    },
    Closed: {
      label: "Closed",
      color: "success" as const,
      icon: <ClosedIcon fontSize="small" />,
      description: "Claim has been successfully completed and closed",
      backgroundColor: "#DCFCE7",
      textColor: "#16A34A",
    },
  };

  return configs[status] || configs["Open"];
};

/**
 * Custom status badge with enhanced styling
 */
function EnhancedStatusChip({
  status,
  size = "medium",
  variant = "filled",
  showIcon = true,
}: Omit<ClaimStatusBadgeProps, "showTooltip">): React.ReactElement {
  // const theme = useTheme();
  const config = getStatusConfig(status);

  const customStyles =
    variant === "filled"
      ? {
          backgroundColor: config.backgroundColor,
          color: config.textColor,
          border: `1px solid ${alpha(config.textColor, 0.3)}`,
          "& .MuiChip-icon": {
            color: config.textColor,
          },
        }
      : {
          backgroundColor: "transparent",
          color: config.textColor,
          border: `1px solid ${config.textColor}`,
          "& .MuiChip-icon": {
            color: config.textColor,
          },
        };

  return (
    <Chip
      label={config.label}
      size={size}
      icon={showIcon ? config.icon : undefined}
      sx={{
        ...customStyles,
        fontWeight: 500,
        ...(size === "small" && {
          height: 24,
          fontSize: "0.75rem",
        }),
        // Add subtle animation for in-progress status
        ...(status === "In Progress" && {
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%": {
              opacity: 1,
            },
            "50%": {
              opacity: 0.7,
            },
            "100%": {
              opacity: 1,
            },
          },
        }),
      }}
    />
  );
}

/**
 * Enhanced claim status badge component with consistent styling and optional tooltip
 */
export function ClaimStatusBadge({
  status,
  size = "medium",
  variant = "filled",
  showIcon = true,
  showTooltip = true,
  className,
}: ClaimStatusBadgeProps): React.ReactElement {
  const config = getStatusConfig(status);

  const badge = (
    <Box className={className} sx={{ display: "inline-block" }}>
      <EnhancedStatusChip
        status={status}
        size={size}
        variant={variant}
        showIcon={showIcon}
      />
    </Box>
  );

  if (showTooltip) {
    return (
      <Tooltip title={config.description} arrow placement="top">
        {badge}
      </Tooltip>
    );
  }

  return badge;
}

/**
 * Compact status indicator for use in dense layouts
 */
export function CompactClaimStatus({
  status,
}: {
  status: ClaimStatus;
}): React.ReactElement {
  const config = getStatusConfig(status);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        color: config.textColor,
      }}
    >
      {config.icon}
      <Box
        component="span"
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        {config.label}
      </Box>
    </Box>
  );
}

/**
 * Status progress indicator showing progression through claim states
 */
export function ClaimStatusProgress({
  currentStatus,
}: {
  currentStatus: ClaimStatus;
}): React.ReactElement {
  const statusOrder: ClaimStatus[] = [
    "Open",
    "In Progress",
    "Approved",
    "Closed",
  ];
  const rejectedStatuses: ClaimStatus[] = ["Rejected"];

  const isRejected = rejectedStatuses.includes(currentStatus);
  const currentIndex = statusOrder.indexOf(currentStatus);

  if (isRejected) {
    // Show rejection path
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ClaimStatusBadge status="Open" size="small" showTooltip={false} />
        <Box sx={{ width: 20, height: 2, bgcolor: "error.main" }} />
        <ClaimStatusBadge status="Rejected" size="small" showTooltip={false} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {statusOrder.map((status, index) => {
        const isActive = index <= currentIndex;
        // const isCurrent = status === currentStatus;

        return (
          <React.Fragment key={status}>
            <ClaimStatusBadge
              status={status}
              size="small"
              variant={isActive ? "filled" : "outlined"}
              showTooltip={false}
            />
            {index < statusOrder.length - 1 && (
              <Box
                sx={{
                  width: 20,
                  height: 2,
                  bgcolor: isActive ? "success.main" : "grey.300",
                  borderRadius: 1,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
}

/**
 * Status summary card for displaying multiple status metrics
 */
export function ClaimStatusSummary({
  statusCounts,
}: {
  statusCounts: Record<ClaimStatus, number>;
}): React.ReactElement {
  const totalClaims = Object.values(statusCounts).reduce(
    (sum, count) => sum + count,
    0,
  );

  if (totalClaims === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Box sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
          No claims to display
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {(Object.entries(statusCounts) as [ClaimStatus, number][])
        .filter(([, count]) => count > 0)
        .map(([status, count]) => {
          const percentage = Math.round((count / totalClaims) * 100);
          const config = getStatusConfig(status);

          return (
            <Box
              key={status}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <ClaimStatusBadge
                status={status}
                size="small"
                showTooltip={false}
              />
              <Box
                sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  sx={{
                    flex: 1,
                    height: 8,
                    bgcolor: "#E5E7EB",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${percentage}%`,
                      height: "100%",
                      bgcolor: config.backgroundColor,
                      borderRadius: "4px",
                      transition: "width 0.3s ease-in-out",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    minWidth: 40,
                    textAlign: "right",
                    fontSize: "0.875rem",
                  }}
                >
                  {count}
                </Box>
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
