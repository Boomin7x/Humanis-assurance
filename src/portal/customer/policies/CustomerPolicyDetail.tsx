// src/portal/customer/policies/CustomerPolicyDetail.tsx
// Enhanced detailed view of a specific customer policy with comprehensive information and document download

import {
  CheckCircle as CheckIcon,
  Description as DocumentIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Payment as PaymentIcon,
  Phone as PhoneIcon,
  Policy as PolicyIcon,
  Autorenew as RenewIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { LoadingSkeleton } from "../../shared/components/LoadingSkeleton";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatusChip } from "../../shared/components/StatusChip";
import { useMockFetch } from "../../shared/hooks/useMockFetch";

import { getCustomerPayments } from "../../shared/mock/mockPaymentService";
import { getPolicyDetails } from "../../shared/mock/mockPolicyService";
import type { Payment, Policy } from "../../shared/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`policy-tabpanel-${index}`}
      aria-labelledby={`policy-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
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
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

/**
 * Document type for policy documents
 */
interface PolicyDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  description: string;
}

/**
 * Mock documents available for download
 */
const getMockDocuments = (policy: Policy): PolicyDocument[] => [
  {
    id: "1",
    name: "Policy Certificate",
    type: "PDF",
    size: "245 KB",
    description: "Official policy certificate document",
  },
  {
    id: "2",
    name: "Terms and Conditions",
    type: "PDF",
    size: "1.2 MB",
    description: "Complete policy terms and conditions",
  },
  {
    id: "3",
    name: "Premium Schedule",
    type: "PDF",
    size: "156 KB",
    description: "Detailed premium payment schedule",
  },
  ...(policy.productType === "Motor"
    ? [
        {
          id: "4",
          name: "Vehicle Inspection Report",
          type: "PDF",
          size: "890 KB",
          description: "Vehicle inspection and valuation report",
        },
      ]
    : []),
  ...(policy.productType === "Home"
    ? [
        {
          id: "4",
          name: "Property Valuation Report",
          type: "PDF",
          size: "1.1 MB",
          description: "Property valuation and risk assessment",
        },
      ]
    : []),
];

/**
 * Enhanced policy information card component
 */
function PolicyInfoCard({ policy }: { policy: Policy }): React.ReactElement {
  const daysUntilExpiry = Math.ceil(
    (policy.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  const isExpired = daysUntilExpiry < 0;

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PolicyIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" component="h2">
              Policy Information
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {(isExpiringSoon || isExpired) && (
              <Chip
                label={isExpired ? "Expired" : "Expires Soon"}
                color={isExpired ? "error" : "warning"}
                size="small"
              />
            )}
          </Stack>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Policy Number
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: "monospace", fontWeight: 500 }}
              >
                {policy.policyNumber}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Product
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {policy.product}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Product Type
              </Typography>
              <Chip
                label={policy.productType}
                size="small"
                variant="outlined"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status
              </Typography>
              <StatusChip status={policy.status} variant="filled" />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Payment Frequency
              </Typography>
              <Typography variant="body1">{policy.paymentFrequency}</Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Start Date
              </Typography>
              <Typography variant="body1">
                {formatDate(policy.startDate)}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                End Date
              </Typography>
              <Typography variant="body1">
                {formatDate(policy.endDate)}
              </Typography>
              {isExpiringSoon && (
                <Typography variant="caption" color="warning.main">
                  Expires in {daysUntilExpiry} days
                </Typography>
              )}
              {isExpired && (
                <Typography variant="caption" color="error.main">
                  Expired {Math.abs(daysUntilExpiry)} days ago
                </Typography>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Coverage Amount
              </Typography>
              <Typography
                variant="h6"
                color="primary.main"
                sx={{ fontWeight: 600 }}
              >
                {formatCurrency(policy.coverageAmount, policy.currency)}
              </Typography>
            </Box>

            {policy.deductible && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Deductible
                </Typography>
                <Typography variant="body1">
                  {formatCurrency(policy.deductible, policy.currency)}
                </Typography>
              </Box>
            )}

            {policy.riskAddress && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Risk Address
                </Typography>
                <Typography variant="body1">{policy.riskAddress}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Policy Actions */}
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<RenewIcon />}
            disabled={policy.status !== "Active"}
          >
            Request Renewal
          </Button>
          <Button variant="outlined" startIcon={<PhoneIcon />}>
            Contact Agent
          </Button>
          <Button variant="outlined" startIcon={<EditIcon />}>
            Update Details
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * Enhanced premium breakdown card component
 */
function PremiumBreakdownCard({
  policy,
}: {
  policy: Policy;
}): React.ReactElement {
  const basePremium = policy.premium * 0.85;
  const taxes = policy.premium * 0.15;
  const deductible = policy.deductible || 0;

  // Calculate next payment date deterministically
  const nextPaymentDate = React.useMemo(() => {
    // Use policy-specific data to create a stable date
    const seed = policy.policyNumber.length + policy.premium;
    const daysToAdd = 25 + (seed % 10); // 25-34 days
    const baseDate = new Date("2024-12-01"); // Fixed base date
    return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  }, [policy.policyNumber, policy.premium]);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <PaymentIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: "#0D1B2A", fontWeight: 600 }}
          >
            Premium Breakdown
          </Typography>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Base Premium</TableCell>
                <TableCell align="right">
                  {formatCurrency(basePremium, policy.currency)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Taxes & Fees</TableCell>
                <TableCell align="right">
                  {formatCurrency(taxes, policy.currency)}
                </TableCell>
              </TableRow>
              {deductible > 0 && (
                <TableRow>
                  <TableCell>Deductible</TableCell>
                  <TableCell align="right">
                    {formatCurrency(deductible, policy.currency)}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 600, borderTop: "2px solid #E5E7EB" }}
                >
                  Total Premium ({policy.paymentFrequency})
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    color: "#1D6FA4",
                    fontSize: "1.125rem",
                    borderTop: "2px solid #E5E7EB",
                  }}
                >
                  {formatCurrency(policy.premium, policy.currency)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />
        <Alert severity="info" variant="outlined">
          Next payment due: {formatDate(nextPaymentDate)}
        </Alert>
      </CardContent>
    </Card>
  );
}

/**
 * Coverage details card component
 */
function CoverageDetailsCard({
  policy,
}: {
  policy: Policy;
}): React.ReactElement {
  const getCoverageItems = () => {
    switch (policy.productType) {
      case "Motor":
        return [
          "Third Party Liability",
          "Collision Coverage",
          "Comprehensive Coverage",
          "Personal Injury Protection",
          "Uninsured Motorist Coverage",
        ];
      case "Home":
        return [
          "Dwelling Coverage",
          "Personal Property",
          "Personal Liability",
          "Additional Living Expenses",
          "Medical Payments",
        ];
      case "Life":
        return [
          "Death Benefit",
          "Accidental Death",
          "Terminal Illness",
          "Disability Waiver",
        ];
      case "Health":
        return [
          "Hospitalization",
          "Outpatient Care",
          "Prescription Drugs",
          "Preventive Care",
          "Emergency Services",
        ];
      default:
        return ["Basic Coverage", "Extended Protection", "Liability Coverage"];
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Coverage Details
        </Typography>

        <List dense>
          {getCoverageItems().map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckIcon color="success" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

/**
 * Documents card component with download functionality
 */
function DocumentsCard({ policy }: { policy: Policy }): React.ReactElement {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const documents = getMockDocuments(policy);

  const handleDownload = useCallback(
    (policyDoc: PolicyDocument) => {
      // Mock file download functionality
      const link = document.createElement("a");
      link.href = "#";
      link.download = `${policy.policyNumber}_${policyDoc.name.replace(/\s+/g, "_")}.pdf`;
      link.click();

      setDownloadSuccess(`${policyDoc.name} downloaded successfully`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    },
    [policy.policyNumber],
  );

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <DocumentIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" component="h2">
            Policy Documents
          </Typography>
        </Box>

        <List>
          {documents.map((doc) => (
            <ListItem
              key={doc.id}
              secondaryAction={
                <Tooltip title={`Download ${doc.name}`}>
                  <IconButton
                    edge="end"
                    onClick={() => handleDownload(doc)}
                    color="primary"
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemIcon>
                <DocumentIcon color="action" />
              </ListItemIcon>
              <ListItemText
                primary={doc.name}
                secondary={`${doc.type} • ${doc.size} • ${doc.description}`}
              />
            </ListItem>
          ))}
        </List>

        <Snackbar
          open={!!downloadSuccess}
          autoHideDuration={3000}
          onClose={() => setDownloadSuccess(null)}
          message={downloadSuccess}
        />
      </CardContent>
    </Card>
  );
}

/**
 * Payment history card component
 */
function PaymentHistoryCard({
  payments,
  loading,
}: {
  payments: Payment[] | null;
  loading: boolean;
}): React.ReactElement {
  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Payment History
          </Typography>
          <LoadingSkeleton variant="table" count={3} />
        </CardContent>
      </Card>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Payment History
          </Typography>
          <Alert severity="info" variant="outlined">
            No payment history available for this policy.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Payment History
        </Typography>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reference</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.slice(0, 5).map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>
                    {formatCurrency(payment.amount, payment.currency)}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <StatusChip
                      status={payment.status}
                      variant="filled"
                      size="small"
                    />
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                  >
                    {payment.reference}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {payments.length > 5 && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button variant="outlined" size="small">
              View All Payments ({payments.length})
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Customer Policy Detail page component
 */
export function CustomerPolicyDetail(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Fetch policy details
  const fetchPolicyDetails = useCallback(
    () => getPolicyDetails(id || ""),
    [id],
  );

  const fetchPaymentHistory = useCallback(async () => {
    if (!id) return [];
    const payments = await getCustomerPayments("customer-1");
    return payments.filter((payment) => payment.policyId === id);
  }, [id]);

  const {
    data: policy,
    loading: loadingPolicy,
    error: policyError,
  } = useMockFetch(fetchPolicyDetails);

  const {
    data: payments,
    loading: loadingPayments,
    error: paymentError,
  } = useMockFetch(fetchPaymentHistory);

  /**
   * Handle back navigation
   */
  const handleBack = useCallback(() => {
    navigate("/portal/customer/policies");
  }, [navigate]);

  /**
   * Handle tab change
   */
  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    },
    [],
  );

  if (policyError) {
    return (
      <Box>
        <PageHeader
          title="Policy Details"
          subtitle="View detailed policy information"
          action={{
            label: "Back to Policies",
            onClick: handleBack,
            variant: "outlined",
          }}
        />
        <ErrorAlert message={policyError} />
      </Box>
    );
  }

  if (loadingPolicy || !policy) {
    return (
      <Box>
        <PageHeader
          title="Policy Details"
          subtitle="Loading policy information..."
          action={{
            label: "Back to Policies",
            onClick: handleBack,
            variant: "outlined",
          }}
        />
        <LoadingSkeleton variant="cards" count={4} />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Policy Details"
        subtitle={`${policy.product} - ${policy.policyNumber}`}
        action={{
          label: "Back to Policies",
          onClick: handleBack,
          variant: "outlined",
        }}
      />

      {/* Tabbed Interface */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Coverage" />
          <Tab label="Documents" />
          <Tab label="Payments" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <PolicyInfoCard policy={policy} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PremiumBreakdownCard policy={policy} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PaymentHistoryCard payments={payments} loading={loadingPayments} />
            {paymentError && (
              <Alert severity="warning" sx={{ mt: 1 }}>
                Failed to load payment history: {paymentError}
              </Alert>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      {/* Coverage Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <CoverageDetailsCard policy={policy} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Coverage Summary
                </Typography>
                <Typography variant="h4" color="primary.main" gutterBottom>
                  {formatCurrency(policy.coverageAmount, policy.currency)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Coverage Amount
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Documents Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <DocumentsCard policy={policy} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Document Help
                </Typography>
                <Alert severity="info" variant="outlined">
                  <Typography variant="body2">
                    Download your policy documents for records or when filing
                    claims. All documents are available in PDF format.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Payments Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <PaymentHistoryCard payments={payments} loading={loadingPayments} />
            {paymentError && (
              <Alert severity="warning" sx={{ mt: 1 }}>
                Failed to load payment history: {paymentError}
              </Alert>
            )}
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}
