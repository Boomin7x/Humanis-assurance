// src/portal/agent/pages/AgentDashboard.tsx
// Agent dashboard page with key metrics and overview

import React, { useCallback } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import {
  Policy as PolicyIcon,
  Schedule as ScheduleIcon,
  MonetizationOn as CommissionIcon,
  PendingActions as PendingIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { SummaryCard } from "../../shared/components/SummaryCard";
import { useMockFetch } from "../../shared/hooks/useMockFetch";
import { useAuth } from "../../shared/hooks/useAuth";
import {
  getAgentPolicies,
  getExpiringPoliciesService,
} from "../../shared/mock/mockPolicyService";
import { getCommissionSummaryService } from "../../shared/mock/mockCommissionService";
import { getNotifications } from "../../shared/mock/mockNotificationService";
import { LoadingSkeleton } from "../../shared/components/LoadingSkeleton";
import { ErrorAlert } from "../../shared/components/ErrorAlert";

/**
 * Agent dashboard with key metrics and overview
 */
export function AgentDashboard(): React.ReactElement {
  const { user } = useAuth();

  // Create stable service functions with useCallback
  const fetchPolicies = useCallback(() => {
    return user?.id ? getAgentPolicies(user.id) : Promise.resolve([]);
  }, [user]);

  const fetchCommissions = useCallback(() => {
    return getCommissionSummaryService(user?.id);
  }, [user]);

  const fetchExpiringPolicies = useCallback(() => {
    return getExpiringPoliciesService(30);
  }, []);

  const fetchNotifications = useCallback(() => {
    return user?.id ? getNotifications(user.id) : Promise.resolve([]);
  }, [user]);

  // Fetch data from mock services
  const {
    data: policies,
    loading: policiesLoading,
    error: policiesError,
  } = useMockFetch(fetchPolicies, [fetchPolicies]);

  const {
    data: commissionSummary,
    loading: commissionsLoading,
    error: commissionsError,
  } = useMockFetch(fetchCommissions, [fetchCommissions]);

  const {
    data: expiringPolicies,
    loading: expiringLoading,
    error: expiringError,
  } = useMockFetch(fetchExpiringPolicies, [fetchExpiringPolicies]);

  const {
    data: notifications,
    loading: notificationsLoading,
    error: notificationsError,
  } = useMockFetch(fetchNotifications, [fetchNotifications]);

  // Calculate metrics
  const totalPolicies = Array.isArray(policies) ? policies.length : 0;
  const commissionPaid = commissionSummary?.totalPaid || 0;
  const commissionPending = commissionSummary?.totalPending || 0;
  const expiringCount = Array.isArray(expiringPolicies)
    ? expiringPolicies.length
    : 0;

  // Loading state
  const isLoading = policiesLoading || commissionsLoading || expiringLoading;

  // Error handling
  const hasError =
    policiesError || commissionsError || expiringError || notificationsError;

  if (hasError) {
    return (
      <Box sx={{ p: 3 }}>
        <ErrorAlert
          message="Failed to load dashboard data. Please try again."
          onRetry={() => window.location.reload()}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: "#0D1B2A",
          mb: 1,
        }}
      >
        Agent Dashboard
      </Typography>

      <Typography variant="body1" color="neutral.700" sx={{ mb: 4 }}>
        Welcome back, {user?.name}! Here's an overview of your portfolio and
        performance.
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SummaryCard
            icon={<PolicyIcon />}
            label="Total Portfolio"
            value={totalPolicies}
            subtitle="Active policies"
            variant="primary"
            loading={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SummaryCard
            icon={<CommissionIcon />}
            label="Commission Paid"
            value={`€${commissionPaid.toLocaleString()}`}
            subtitle="Total earned"
            variant="success"
            loading={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SummaryCard
            icon={<PendingIcon />}
            label="Commission Pending"
            value={`€${commissionPending.toLocaleString()}`}
            subtitle="Awaiting payment"
            variant="warning"
            loading={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SummaryCard
            icon={<ScheduleIcon />}
            label="Expiring (30 days)"
            value={expiringCount}
            subtitle="Require attention"
            variant="error"
            loading={isLoading}
          />
        </Grid>

        {/* Notifications Panel */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              height: "100%",
              border: "1px solid #D1D5DB",
              borderRadius: "6px",
              boxShadow: "none",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1 }}
              >
                <NotificationsIcon sx={{ color: "#1D6FA4", fontSize: 20 }} />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    color: "#1B3A5C",
                    fontSize: "1.1rem",
                  }}
                >
                  Recent Notifications
                </Typography>
              </Box>

              {notificationsLoading ? (
                <LoadingSkeleton variant="list" count={4} />
              ) : (
                <Box>
                  {notifications && notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification, index) => (
                      <Box
                        key={notification.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          py: 2,
                          borderBottom:
                            index < notifications.length - 1
                              ? "1px solid #F3F4F6"
                              : "none",
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: "#111827",
                              mb: 0.5,
                            }}
                          >
                            {notification.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="#6B7280"
                            sx={{ fontSize: "0.875rem" }}
                          >
                            {notification.message}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          color="#6B7280"
                          sx={{ fontSize: "0.75rem", ml: 2 }}
                        >
                          {new Date(notification.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography color="#6B7280" variant="body2">
                      No recent notifications
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Premium vs Commission Chart Preview */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: "100%",
              border: "1px solid #D1D5DB",
              borderRadius: "6px",
              boxShadow: "none",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#1B3A5C",
                  fontSize: "1.1rem",
                  mb: 2,
                }}
              >
                Premium vs Commission
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 200,
                  backgroundColor: "#F9FAFB",
                  borderRadius: "4px",
                  border: "1px dashed #D1D5DB",
                }}
              >
                <Typography variant="body2" color="#6B7280" sx={{ mb: 1 }}>
                  Chart Preview
                </Typography>
                <Typography variant="caption" color="#6B7280" align="center">
                  Interactive premium vs commission
                  <br />
                  analysis coming soon
                </Typography>
              </Box>

              <Box
                sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="#6B7280">
                    This Month
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    €{commissionPaid.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="#6B7280">
                    Pending
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    €{commissionPending.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
