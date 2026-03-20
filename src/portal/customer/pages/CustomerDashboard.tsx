// src/portal/customer/pages/CustomerDashboard.tsx
// Customer dashboard page with policy overview and account status

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import {
  Policy as PolicyIcon,
  Schedule as ScheduleIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";

interface StatusCardProps {
  title: string;
  value: string | number;
  status: "active" | "warning" | "info";
  description?: string;
  icon: React.ReactElement;
}

function StatusCard({
  title,
  value,
  status,
  description,
  icon,
}: StatusCardProps): React.ReactElement {
  const colorMap = {
    active: "success",
    warning: "warning",
    info: "primary",
  } as const;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box
            sx={{
              p: 0.5,
              borderRadius: 1,
              backgroundColor: `${colorMap[status]}.main`,
              color: `${colorMap[status]}.contrastText`,
              mr: 1,
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          >
            {title}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            fontSize: "1.5rem",
          }}
        >
          {value}
        </Typography>

        {description && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.6875rem" }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Customer dashboard with policy overview and account information
 */
export function CustomerDashboard(): React.ReactElement {
  return (
    <Box sx={{ p: 1.5 }}>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          fontSize: "1.5rem",
          mb: 1,
        }}
      >
        My Account
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          fontSize: "0.875rem",
        }}
      >
        Welcome to your Humanis portal. Manage your policies, claims, and
        payments here.
      </Typography>

      <Grid container spacing={2}>
        {/* Active Policies */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <StatusCard
            title="Active Policies"
            value="3"
            status="active"
            description="All policies current"
            icon={<PolicyIcon />}
          />
        </Grid>

        {/* Upcoming Renewals */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <StatusCard
            title="Renewals Due"
            value="1"
            status="warning"
            description="Auto insurance (May 15)"
            icon={<ScheduleIcon />}
          />
        </Grid>

        {/* Payment Status */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <StatusCard
            title="Payment Status"
            value="Current"
            status="active"
            description="All payments up to date"
            icon={<PaymentIcon />}
          />
        </Grid>

        {/* Coverage Status */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <StatusCard
            title="Coverage"
            value="Protected"
            status="info"
            description="Full coverage active"
            icon={<SecurityIcon />}
          />
        </Grid>

        {/* My Policies */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: 1.5 }}>
              <Typography
                variant="subtitle2"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  mb: 1,
                }}
              >
                My Policies
              </Typography>

              <Box sx={{ mt: { xs: 1.5, md: 2 } }}>
                {[
                  {
                    type: "Auto Insurance",
                    policyNumber: "AI-2025-001234",
                    premium: "€89/month",
                    status: "Active",
                    expiry: "May 15, 2025",
                  },
                  {
                    type: "Home Insurance",
                    policyNumber: "HI-2025-005678",
                    premium: "€45/month",
                    status: "Active",
                    expiry: "Sep 22, 2025",
                  },
                  {
                    type: "Health Insurance",
                    policyNumber: "HE-2025-009876",
                    premium: "€156/month",
                    status: "Active",
                    expiry: "Dec 31, 2025",
                  },
                ].map((policy, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      py: { xs: 1.5, md: 2 },
                      borderBottom: index < 2 ? "1px solid" : "none",
                      borderColor: "divider",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 1, sm: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        flex: { xs: "none", sm: 1 },
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem",
                        }}
                      >
                        {policy.type}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ fontSize: { xs: "0.75rem", md: "0.75rem" } }}
                      >
                        Policy: {policy.policyNumber}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.75rem", md: "0.75rem" } }}
                      >
                        Expires: {policy.expiry}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        textAlign: { xs: "left", sm: "center" },
                        mx: { xs: 0, sm: 2 },
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 2, sm: 0 },
                        justifyContent: { xs: "space-between", sm: "center" },
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: "0.875rem", md: "0.875rem" },
                        }}
                      >
                        {policy.premium}
                      </Typography>
                      <Chip
                        label={policy.status}
                        size="small"
                        color="success"
                        sx={{
                          fontSize: { xs: "0.6875rem", md: "0.75rem" },
                          height: { xs: 24, md: 32 },
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Quick Actions
              </Typography>

              <Box
                sx={{
                  mt: { xs: 1.5, md: 2 },
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, md: 2 },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                  }}
                >
                  Demo mode - All actions are simulated
                </Typography>

                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    minHeight: 32,
                    fontSize: "0.75rem",
                  }}
                >
                  File a Claim
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    minHeight: 32,
                    fontSize: "0.75rem",
                  }}
                >
                  Make a Payment
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    minHeight: 32,
                    fontSize: "0.75rem",
                  }}
                >
                  Update Policy
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    minHeight: 32,
                    fontSize: "0.75rem",
                  }}
                >
                  Contact Agent
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Recent Activity
              </Typography>

              <Box sx={{ mt: { xs: 1.5, md: 2 } }}>
                {[
                  {
                    activity: "Premium payment processed",
                    type: "Auto Insurance",
                    date: "Mar 15, 2025",
                  },
                  {
                    activity: "Policy document updated",
                    type: "Home Insurance",
                    date: "Mar 10, 2025",
                  },
                  {
                    activity: "Annual review completed",
                    type: "Health Insurance",
                    date: "Feb 28, 2025",
                  },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      py: { xs: 1.25, md: 1.5 },
                      borderBottom: index < 2 ? "1px solid" : "none",
                      borderColor: "divider",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 0.5, sm: 0 },
                    }}
                  >
                    <Box sx={{ flex: { xs: "none", sm: 1 } }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: "0.875rem", md: "0.875rem" },
                        }}
                      >
                        {item.activity}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.75rem", md: "0.75rem" } }}
                      >
                        {item.type}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.75rem", md: "0.75rem" },
                        alignSelf: { xs: "flex-end", sm: "center" },
                      }}
                    >
                      {item.date}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
