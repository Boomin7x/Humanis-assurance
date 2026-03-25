/* eslint-disable @typescript-eslint/no-explicit-any */
// src/portal/customer/claims/ClaimDetail.tsx
// Enhanced detailed view of a specific claim with timeline, status updates, and comprehensive information

import {
  Assignment as ClaimIcon,
  Description as DocumentIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Print as PrintIcon,
  Share as ShareIcon,
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
import { useMockFetch } from "../../shared/hooks/useMockFetch";

// Import our enhanced components
import {
  ClaimStatusBadge,
  ClaimStatusProgress,
} from "./components/ClaimStatusBadge";
import { ClaimTimeline } from "./components/ClaimTimeline";

import { getClaimDetails } from "../../shared/mock/mockClaimService";
import { getPolicyDetails } from "../../shared/mock/mockPolicyService";
import type { Claim, Policy } from "../../shared/types";

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
      id={`claim-tabpanel-${index}`}
      aria-labelledby={`claim-tab-${index}`}
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
 * Enhanced claim header card component
 */
function ClaimHeaderCard({
  claim,
  policy,
}: {
  claim: Claim;
  policy: Policy | null;
}): React.ReactElement {
  const daysSinceReported = Math.floor(
    (new Date().getTime() - claim.dateReported.getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const daysToProcess = 14; // Typical processing time
  const remainingDays = Math.max(0, daysToProcess - daysSinceReported);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ClaimIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography
              variant="h6"
              component="h2"
              sx={{ color: "#0D1B2A", fontWeight: 600 }}
            >
              Claim Information
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Print claim details">
              <IconButton size="small">
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share claim">
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Claim Number
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#0D1B2A",
                  }}
                >
                  {claim.claimNumber}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Policy Number
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                  {claim.policyNumber}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Current Status
                </Typography>
                <ClaimStatusBadge status={claim.status} />
              </Box>

              {policy && (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Policy Product
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {policy.product} ({policy.productType})
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Date of Incident
                </Typography>
                <Typography variant="body1">
                  {formatDate(claim.dateOfIncident)}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Date Reported
                </Typography>
                <Typography variant="body1">
                  {formatDate(claim.dateReported)}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({daysSinceReported} days ago)
                  </Typography>
                </Typography>
              </Box>

              {claim.claimAmount && (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Claim Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: "#1D6FA4", fontWeight: 700 }}
                  >
                    {formatCurrency(claim.claimAmount, claim.currency)}
                  </Typography>
                </Box>
              )}

              {claim.settledAmount && (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Settled Amount
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: "#16A34A", fontWeight: 700 }}
                  >
                    {formatCurrency(claim.settledAmount, claim.currency)}
                  </Typography>
                </Box>
              )}

              {claim.assignedTo && (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Assigned To
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {claim.assignedTo}
                  </Typography>
                </Box>
              )}

              {claim.status === "In Progress" && (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Estimated Processing Time
                  </Typography>
                  <Typography variant="body1">
                    {remainingDays > 0
                      ? `${remainingDays} days remaining`
                      : "Processing time exceeded"}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {claim.description}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Status Progress
            </Typography>
            <ClaimStatusProgress currentStatus={claim.status} />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Divider sx={{ my: 3 }} />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<PhoneIcon />} size="small">
            Contact Support
          </Button>
          <Button variant="outlined" startIcon={<EmailIcon />} size="small">
            Send Email
          </Button>
          {claim.status === "Open" && (
            <Button
              variant="outlined"
              startIcon={<DocumentIcon />}
              size="small"
              color="warning"
            >
              Add Documents
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * Enhanced documents section component
 */
function DocumentsSection({
  attachments,
  claimNumber,
}: {
  attachments?: string[];
  claimNumber: string;
}): React.ReactElement {
  const handleDownload = useCallback(
    (documentName: string) => {
      // Mock file download functionality
      const link = window.document.createElement("a");
      link.href = "#";
      link.download = `${claimNumber}_${documentName.replace(/\s+/g, "_")}.pdf`;
      link.click();
      console.log(`Downloading document: ${documentName}`);
    },
    [claimNumber],
  );

  const mockDocuments = React.useMemo(
    () =>
      attachments || [
        "Incident Report Form",
        "Police Report",
        "Photos of Damage",
        "Repair Estimates",
        "Medical Certificates",
      ],
    [attachments],
  );

  // Generate stable file sizes for documents
  const documentSizes = React.useMemo(() => {
    return mockDocuments.map((_, index) => {
      // Use a deterministic approach based on document index to avoid Math.random
      const seed = index + claimNumber.length;
      return ((seed * 123456) % 600) + 200; // Generate sizes between 200-800 KB
    });
  }, [mockDocuments, claimNumber]);

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
          <Typography variant="h6" component="h2">
            Claim Documents
          </Typography>
          <Button size="small" variant="outlined" startIcon={<DocumentIcon />}>
            Upload New
          </Button>
        </Box>

        <List dense>
          {mockDocuments.map((document, index) => (
            <ListItem
              key={index}
              divider={index < mockDocuments.length - 1}
              secondaryAction={
                <Tooltip title={`Download ${document}`}>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => handleDownload(document)}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemIcon>
                <DocumentIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={document}
                secondary={`PDF • ${documentSizes[index]} KB`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

/**
 * Related policy information component
 */
function RelatedPolicyCard({
  policy,
}: {
  policy: Policy | null;
}): React.ReactElement {
  const navigate = useNavigate();

  const handleViewPolicy = useCallback(() => {
    if (policy) {
      navigate(`/portal/customer/policies/${policy.id}`);
    }
  }, [navigate, policy]);

  if (!policy) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Related Policy
          </Typography>
          <Alert severity="warning">Policy information not available</Alert>
        </CardContent>
      </Card>
    );
  }

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
          <Typography variant="h6" component="h2">
            Related Policy
          </Typography>
          <Button size="small" variant="outlined" onClick={handleViewPolicy}>
            View Details
          </Button>
        </Box>

        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Product
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {policy.product}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Coverage Amount
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {formatCurrency(policy.coverageAmount, policy.currency)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={policy.status}
              size="small"
              color={policy.status === "Active" ? "success" : "default"}
              variant="outlined"
            />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Valid Until
            </Typography>
            <Typography variant="body1">
              {formatDate(policy.endDate)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * Claim history table component
 */
function ClaimHistoryTable({
  timeline,
}: {
  timeline: any[];
}): React.ReactElement {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Updated By</TableCell>
            <TableCell>Documents</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeline.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell>
                <ClaimStatusBadge status={item.status} size="small" />
              </TableCell>
              <TableCell>
                <Typography variant="body2">{item.description}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{item.updatedBy}</Typography>
              </TableCell>
              <TableCell>
                {item.documents && item.documents.length > 0 ? (
                  <Chip
                    label={`${item.documents.length} doc${item.documents.length !== 1 ? "s" : ""}`}
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    None
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * Enhanced Customer Claim Detail page component
 */
export function ClaimDetail(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Fetch claim details
  const fetchClaimDetails = useCallback(() => getClaimDetails(id || ""), [id]);

  // Fetch related policy details
  const fetchPolicyDetails = useCallback(async () => {
    if (!id) return null;
    const claimData = await getClaimDetails(id);
    if (claimData) {
      return await getPolicyDetails(claimData.policyId);
    }
    return null;
  }, [id]);

  const { data: claim, loading, error } = useMockFetch(fetchClaimDetails);

  const { data: policy } = useMockFetch(fetchPolicyDetails);

  /**
   * Handle back navigation
   */
  const handleBack = useCallback(() => {
    navigate("/portal/customer/claims");
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

  if (error) {
    return (
      <Box>
        <PageHeader
          title="Claim Details"
          subtitle="View detailed claim information"
          action={{
            label: "Back to Claims",
            onClick: handleBack,
            variant: "outlined",
          }}
        />
        <ErrorAlert message={error} />
      </Box>
    );
  }

  if (loading || !claim) {
    return (
      <Box>
        <PageHeader
          title="Claim Details"
          subtitle="Loading claim information..."
          action={{
            label: "Back to Claims",
            onClick: handleBack,
            variant: "outlined",
          }}
        />
        <LoadingSkeleton variant="cards" count={6} />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Claim Details"
        subtitle={`${claim.claimNumber} - ${claim.status}`}
        action={{
          label: "Back to Claims",
          onClick: handleBack,
          variant: "outlined",
        }}
      />

      {/* Claim Header */}
      <Box sx={{ mb: 3 }}>
        <ClaimHeaderCard claim={claim} policy={policy} />
      </Box>

      {/* Tabbed Interface */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Timeline" />
          <Tab label="Documents" />
          <Tab label="Policy Info" />
          <Tab label="History" />
        </Tabs>
      </Box>

      {/* Timeline Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <ClaimTimeline
              timeline={claim.timeline}
              currentStatus={claim.status}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Documents Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <DocumentsSection
              attachments={claim.attachments}
              claimNumber={claim.claimNumber}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Document Guidelines
                </Typography>
                <Alert severity="info" variant="outlined">
                  <Typography variant="body2">
                    Ensure all documents are clear, legible, and in PDF format.
                    Maximum file size is 10MB per document.
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Policy Info Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <RelatedPolicyCard policy={policy} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Coverage Information
                </Typography>
                {policy ? (
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      Your claim is covered under the {policy.product} policy.
                    </Typography>
                    {policy.deductible && (
                      <Typography variant="body2" color="text.secondary">
                        Deductible:{" "}
                        {formatCurrency(policy.deductible, policy.currency)}
                      </Typography>
                    )}
                  </Stack>
                ) : (
                  <Alert severity="warning">
                    Policy information is being loaded...
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* History Tab */}
      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Detailed History
            </Typography>
            <ClaimHistoryTable timeline={claim.timeline} />
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
}
