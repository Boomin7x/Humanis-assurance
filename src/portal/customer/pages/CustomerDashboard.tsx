// src/portal/customer/pages/CustomerDashboard.tsx
// Enhanced customer dashboard with real data integration

import React, { useCallback } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
} from "@mui/material";
import {
  Policy as PolicyIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Assessment as ClaimsIcon,
  NotificationsNone,
} from "@mui/icons-material";

import { SummaryCard } from "../../shared/components/SummaryCard";
import { LoadingSkeleton } from "../../shared/components/LoadingSkeleton";
import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { PageHeader } from "../../shared/components/PageHeader";
import { useAuth } from "../../shared/hooks/useAuth";
import { useMockFetch } from "../../shared/hooks/useMockFetch";

// Mock services
import { getCustomerPolicyStats } from "../../shared/mock/mockPolicyService";
import { getClaimStats } from "../../shared/mock/mockClaimService";
import { getPaymentStats } from "../../shared/mock/mockPaymentService";
import { getNotifications } from "../../shared/mock/mockNotificationService";

/**
 * Customer dashboard with policy overview and account information
 */
export function CustomerDashboard(): React.ReactElement {
  const { user } = useAuth();

  console.log({ user });

  // Memoized fetch functions to prevent infinite re-renders
  const fetchPolicyStats = useCallback(
    () => getCustomerPolicyStats(user?.id || ""),
    [user?.id],
  );

  const fetchClaimStats = useCallback(
    () => getClaimStats(user?.id),
    [user?.id],
  );

  const fetchPaymentStats = useCallback(
    () => getPaymentStats(user?.id),
    [user?.id],
  );

  const fetchNotifications = useCallback(
    () => getNotifications(user?.id || ""),
    [user?.id],
  );

  // Fetch dashboard data
  const {
    data: policyStats,
    loading: loadingPolicies,
    error: policyError,
  } = useMockFetch(fetchPolicyStats);

  const {
    data: claimStats,
    loading: loadingClaims,
    error: claimError,
  } = useMockFetch(fetchClaimStats);

  const {
    data: paymentStats,
    loading: loadingPayments,
    error: paymentError,
  } = useMockFetch(fetchPaymentStats);

  const {
    data: notifications,
    loading: loadingNotifications,
    error: notificationError,
  } = useMockFetch(fetchNotifications);

  const isLoading =
    loadingPolicies || loadingClaims || loadingPayments || loadingNotifications;
  const hasError =
    policyError || claimError || paymentError || notificationError;

  // Recent notifications (last 5)
  const recentNotifications = notifications?.slice(0, 5) || [];

  // Format payment data for display
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  if (hasError) {
    return (
      <Box>
        <PageHeader
          title="Dashboard"
          subtitle="Welcome to your Humanis portal"
        />
        <ErrorAlert
          message={
            policyError ||
            claimError ||
            paymentError ||
            notificationError ||
            "Failed to load dashboard data"
          }
        />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${user?.name || "Customer"}`}
      />

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SummaryCard
            icon={<PolicyIcon />}
            label="Active Policies"
            value={policyStats?.active || 0}
            variant="primary"
            loading={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SummaryCard
            icon={<ScheduleIcon />}
            label="Expiring Soon"
            value={policyStats?.expiring30Days || 0}
            variant={policyStats?.expiring30Days ? "warning" : "success"}
            subtitle="Next 30 days"
            loading={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SummaryCard
            icon={<ClaimsIcon />}
            label="Open Claims"
            value={claimStats?.open || 0}
            variant={claimStats?.open ? "info" : "success"}
            loading={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <SummaryCard
            icon={<PaymentIcon />}
            label="Last Payment"
            value={
              paymentStats?.lastPayment
                ? formatCurrency(paymentStats.lastPayment.amount)
                : "None"
            }
            variant="success"
            subtitle={
              paymentStats?.lastPayment
                ? formatDate(paymentStats.lastPayment.date)
                : undefined
            }
            loading={isLoading}
          />
        </Grid>

        {/* Notifications Panel */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <NotificationsNone sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Recent Notifications
                </Typography>
              </Box>

              {loadingNotifications ? (
                <LoadingSkeleton variant="list" count={3} />
              ) : recentNotifications.length === 0 ? (
                <Alert severity="info" variant="outlined">
                  No recent notifications
                </Alert>
              ) : (
                <List dense>
                  {recentNotifications.map((notification) => (
                    <ListItem
                      key={notification.id}
                      sx={{
                        backgroundColor: notification.read
                          ? "transparent"
                          : "action.hover",
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: notification.read
                              ? "transparent"
                              : "primary.main",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.title}
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: 0.5,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              {notification.message}
                            </Typography>
                            <Chip
                              label={formatDate(notification.date)}
                              size="small"
                              variant="outlined"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Quick Actions
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Alert
                  severity="info"
                  variant="outlined"
                  sx={{ fontSize: "0.875rem" }}
                >
                  Use the navigation menu to access all portal features
                </Alert>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
