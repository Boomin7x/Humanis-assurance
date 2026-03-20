// src/portal/agent/pages/AgentDashboard.tsx
// Agent dashboard page with key metrics and overview

import { Box, Grid, Card, CardContent, Typography, Chip } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Policy as PolicyIcon,
  Schedule as ScheduleIcon,
  MonetizationOn as CommissionIcon,
} from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  icon: React.ReactElement;
}

function MetricCard({ title, value, subtitle, trend, color = 'primary', icon }: MetricCardProps): React.ReactElement {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              p: 0.5,
              borderRadius: 1,
              backgroundColor: `${color}.main`,
              color: `${color}.contrastText`,
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
              fontSize: '0.875rem'
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
            fontSize: '1.5rem'
          }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: '0.6875rem' }}
          >
            {subtitle}
          </Typography>
        )}

        {trend && (
          <Chip
            label={trend}
            size="small"
            color="success"
            sx={{
              fontSize: '0.625rem',
              height: 18,
              mt: 0.5
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Agent dashboard with key metrics and overview
 */
export function AgentDashboard(): React.ReactElement {
  return (
    <Box sx={{ p: 1.5 }}>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 600,
          fontSize: '1.5rem',
          mb: 1
        }}
      >
        Agent Dashboard
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          fontSize: '0.875rem'
        }}
      >
        Welcome back! Here's an overview of your portfolio and performance.
      </Typography>

      <Grid container spacing={2}>
        {/* Active Policies */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <MetricCard
            title="Active Policies"
            value="147"
            subtitle="Total client policies"
            trend="+5 this month"
            color="primary"
            icon={<PolicyIcon />}
          />
        </Grid>

        {/* Expiring Soon */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <MetricCard
            title="Expiring Soon"
            value="12"
            subtitle="Next 30 days"
            color="warning"
            icon={<ScheduleIcon />}
          />
        </Grid>

        {/* Monthly Commission */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <MetricCard
            title="Monthly Commission"
            value="€4,250"
            subtitle="Current month"
            trend="+12% vs last month"
            color="success"
            icon={<CommissionIcon />}
          />
        </Grid>

        {/* Performance */}
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <MetricCard
            title="Performance"
            value="94%"
            subtitle="Renewal rate"
            trend="Above target"
            color="secondary"
            icon={<TrendingUpIcon />}
          />
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1.5 }}>
              <Typography
                variant="subtitle2"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  mb: 1
                }}
              >
                Recent Activity
              </Typography>

              <Box sx={{ mt: 1 }}>
                {[
                  { action: 'Policy renewal', client: 'Martin Dubois', time: '2 hours ago' },
                  { action: 'New policy quote', client: 'Sophie Laurent', time: '4 hours ago' },
                  { action: 'Claim processed', client: 'Pierre Chen', time: '1 day ago' },
                  { action: 'Policy updated', client: 'Marie Bernard', time: '2 days ago' },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      py: 0.75,
                      borderBottom: index < 3 ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      >
                        {activity.action}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: '0.6875rem' }}
                      >
                        {activity.client}
                      </Typography>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontSize: '0.6875rem'
                      }}
                    >
                      {activity.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 1.5 }}>
              <Typography
                variant="subtitle2"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  mb: 1
                }}
              >
                Quick Actions
              </Typography>

              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    mb: 1.5,
                    fontSize: '0.6875rem'
                  }}
                >
                  Demo mode - All actions are simulated
                </Typography>

                {[
                  'Create new quote',
                  'Process renewal',
                  'Review claims',
                  'Generate report',
                ].map((action, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1,
                      mb: 0.75,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      cursor: 'pointer',
                      minHeight: 36,
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      {action}
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