/* eslint-disable @typescript-eslint/no-explicit-any */
// src/portal/agent/policies/AgentPolicyDetail.tsx
// Policy Details view for Agent Portal with tabbed information

import {
  ArrowBack as ArrowBackIcon,
  MonetizationOn as CommissionIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
  Policy as PolicyIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DataTable, DataTableColumn } from "../../shared/components/DataTable";
import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { LoadingSkeleton } from "../../shared/components/LoadingSkeleton";
import { StatusChip } from "../../shared/components/StatusChip";
import { useMockFetch } from "../../shared/hooks/useMockFetch";
import { getCommissionsByPolicyId } from "../../shared/mock/mockCommissions";
import { getPaymentsByPolicyId } from "../../shared/mock/mockPayments";
import { getPolicyById } from "../../shared/mock/mockPolicies";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`policy-tabpanel-${index}`}
      aria-labelledby={`policy-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

/**
 * Agent Policy Detail - Complete policy information with tabs
 */
export function AgentPolicyDetail(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Fetch policy details with proper memoization
  const fetchPolicy = useCallback(() => {
    if (!id) throw new Error("Policy ID is required");
    const pol = getPolicyById(id);
    if (!pol) throw new Error("Policy not found");
    return Promise.resolve(pol);
  }, [id]);

  const {
    data: policy,
    loading: policyLoading,
    error: policyError,
  } = useMockFetch(fetchPolicy, [fetchPolicy]);

  // Fetch payment history for this policy with proper memoization
  const fetchPayments = useCallback(() => {
    return Promise.resolve(getPaymentsByPolicyId(id || ""));
  }, [id]);

  const { data: payments, loading: paymentsLoading } = useMockFetch(
    fetchPayments,
    [fetchPayments],
  );

  // Fetch commissions for this policy with proper memoization
  const fetchCommissions = useCallback(() => {
    return Promise.resolve(getCommissionsByPolicyId(id || ""));
  }, [id]);

  const { data: commissions } = useMockFetch(fetchCommissions, [
    fetchCommissions,
  ]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    navigate("/portal/agent/policies");
  };

  // Payment history table columns
  const paymentColumns: DataTableColumn<any>[] = [
    {
      field: "date",
      headerName: "Payment Date",
      width: 120,
      renderCell: ({ value }) => new Date(value).toLocaleDateString("en-GB"),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: ({ value, row }) =>
        `${row.currency} ${value.toLocaleString()}`,
    },
    {
      field: "method",
      headerName: "Method",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: ({ value }) => <StatusChip status={value} />,
    },
    {
      field: "reference",
      headerName: "Reference",
      width: 200,
    },
  ];

  if (policyError) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            Back to Policies
          </Button>
        </Box>
        <ErrorAlert
          message="Failed to load policy details. Please try again."
          onRetry={() => window.location.reload()}
        />
      </Box>
    );
  }

  if (policyLoading || !policy) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            Back to Policies
          </Button>
        </Box>
        <LoadingSkeleton variant="table" count={8} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Back Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{
            mr: 3,
            color: "#1D6FA4",
            "&:hover": { backgroundColor: "#E8F3FA" },
          }}
        >
          Back to Policies
        </Button>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: "#0D1B2A",
              mb: 0.5,
            }}
          >
            Policy Details
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" color="#6B7280">
              {policy.policyNumber}
            </Typography>
            <StatusChip status={policy.status} />
          </Box>
        </Box>
      </Box>

      {/* Policy Summary Card */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#1B3A5C", mb: 2 }}
            >
              {policy.product}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" color="#6B7280">
                <strong>Customer:</strong> {policy.customerName}
              </Typography>
              <Typography variant="body2" color="#6B7280">
                <strong>Product Type:</strong> {policy.productType}
              </Typography>
              <Typography variant="body2" color="#6B7280">
                <strong>Premium:</strong> {policy.currency}{" "}
                {policy.premium.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" color="#6B7280">
                <strong>Policy Period:</strong>{" "}
                {new Date(policy.startDate).toLocaleDateString("en-GB")} -{" "}
                {new Date(policy.endDate).toLocaleDateString("en-GB")}
              </Typography>
              <Typography variant="body2" color="#6B7280">
                <strong>Payment Frequency:</strong> {policy.paymentFrequency}
              </Typography>
              <Typography variant="body2" color="#6B7280">
                <strong>Coverage:</strong> {policy.currency}{" "}
                {policy.coverageAmount.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper
        sx={{
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="policy details tabs"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                color: "#6B7280",
                "&.Mui-selected": {
                  color: "#1D6FA4",
                  fontWeight: 600,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1D6FA4",
              },
            }}
          >
            <Tab
              icon={<PolicyIcon sx={{ fontSize: 18 }} />}
              label="Policy Info"
              iconPosition="start"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<PersonIcon sx={{ fontSize: 18 }} />}
              label="Customer Info"
              iconPosition="start"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<ReceiptIcon sx={{ fontSize: 18 }} />}
              label="Premium Breakdown"
              iconPosition="start"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<PaymentIcon sx={{ fontSize: 18 }} />}
              label="Payment History"
              iconPosition="start"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<CommissionIcon sx={{ fontSize: 18 }} />}
              label="Commission Details"
              iconPosition="start"
              sx={{ gap: 1 }}
            />
          </Tabs>
        </Box>

        {/* Tab 1: Policy Info */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1B3A5C", mb: 2 }}
              >
                Policy Details
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Policy Number
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.policyNumber}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Product
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.product}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Product Type
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.productType}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Status
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <StatusChip status={policy.status} />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1B3A5C", mb: 2 }}
              >
                Coverage Details
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Coverage Amount
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.currency} {policy.coverageAmount.toLocaleString()}
                  </Typography>
                </Box>
                {policy.deductible && (
                  <Box>
                    <Typography variant="caption" color="#6B7280">
                      Deductible
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {policy.currency} {policy.deductible.toLocaleString()}
                    </Typography>
                  </Box>
                )}
                {policy.riskAddress && (
                  <Box>
                    <Typography variant="caption" color="#6B7280">
                      Risk Address
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {policy.riskAddress}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Policy Period
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {new Date(policy.startDate).toLocaleDateString("en-GB")} -{" "}
                    {new Date(policy.endDate).toLocaleDateString("en-GB")}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 2: Customer Info */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1B3A5C", mb: 2 }}
              >
                Customer Information
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Full Name
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.customerName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Customer ID
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.customerId}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Email
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.customerName.toLowerCase().replace(/\s+/g, ".")}
                    @example.cm
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Phone
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    +237 6XX XXX XXX
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1B3A5C", mb: 2 }}
              >
                Address
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Policy Address
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.riskAddress || "Not specified"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 3: Premium Breakdown */}
        <TabPanel value={activeTab} index={2}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#1B3A5C", mb: 3 }}
          >
            Premium Components
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Amount
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Percentage
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Base Premium</TableCell>
                  <TableCell align="right">
                    {policy.currency}{" "}
                    {Math.round(policy.premium * 0.85).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">85%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Insurance Tax</TableCell>
                  <TableCell align="right">
                    {policy.currency}{" "}
                    {Math.round(policy.premium * 0.1).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">10%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service Fees</TableCell>
                  <TableCell align="right">
                    {policy.currency}{" "}
                    {Math.round(policy.premium * 0.05).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">5%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Total Premium</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {policy.currency} {policy.premium.toLocaleString()}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    100%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Tab 4: Payment History */}
        <TabPanel value={activeTab} index={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#1B3A5C", mb: 3 }}
          >
            Payment History
          </Typography>
          {paymentsLoading ? (
            <LoadingSkeleton variant="table" count={5} />
          ) : (
            <DataTable
              columns={paymentColumns}
              rows={payments || []}
              emptyMessage="No payment records found for this policy"
              pageSize={10}
            />
          )}
        </TabPanel>

        {/* Tab 5: Commission Details */}
        <TabPanel value={activeTab} index={4}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#1B3A5C", mb: 3 }}
          >
            Commission Information
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Commission Rate
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {commissions?.[0]?.commissionRate || 12}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Commission Amount
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.currency}{" "}
                    {commissions?.[0]?.commissionAmount.toLocaleString() ||
                      Math.round(policy.premium * 0.12).toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Payment Status
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <StatusChip
                      status={commissions?.[0]?.paymentStatus || "Pending"}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Premium Amount
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {policy.currency} {policy.premium.toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Payment Date
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {commissions?.[0]?.paymentDate
                      ? new Date(commissions[0].paymentDate).toLocaleDateString(
                          "en-GB",
                        )
                      : "Not yet paid"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="#6B7280">
                    Period
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {commissions?.[0]?.period || new Date().getFullYear()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
}
