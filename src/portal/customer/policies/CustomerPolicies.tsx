// src/portal/customer/policies/CustomerPolicies.tsx
// Enhanced customer policies page with filtering, search, and renewal request functionality

import {
  Clear as ClearIcon,
  Description as DocumentIcon,
  FilterList as FilterIcon,
  Autorenew as RenewIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, DataTableColumn } from "../../shared/components/DataTable";
import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatusChip } from "../../shared/components/StatusChip";
import { useAuth } from "../../shared/hooks/useAuth";
import { useMockFetch } from "../../shared/hooks/useMockFetch";

import {
  getCustomerPolicies,
  getCustomerPolicyStats,
} from "../../shared/mock/mockPolicyService";
import type { Policy, PolicyStatus } from "../../shared/types";

/**
 * Formats date for display in table
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

/**
 * Enhanced Customer Policies page component with filtering and search
 */
export function CustomerPolicies(): React.ReactElement {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Filtering and search state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<PolicyStatus | "">("");
  const [productTypeFilter, setProductTypeFilter] = useState<
    Policy["productType"] | ""
  >("");

  // Memoized fetch function for customer policies
  const fetchCustomerPolicies = useCallback(
    () => getCustomerPolicies(user?.id || ""),
    [user?.id],
  );

  // Memoized fetch function for customer policy stats
  const fetchCustomerPolicyStats = useCallback(
    () => getCustomerPolicyStats(user?.id || ""),
    [user?.id],
  );

  const {
    data: policies,
    loading,
    error,
    refetch,
  } = useMockFetch(fetchCustomerPolicies);

  const { data: policyStats } = useMockFetch(fetchCustomerPolicyStats);

  // Filtered and searched policies
  const filteredPolicies = useMemo(() => {
    if (!policies) return [];

    let filtered = policies;

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (policy) =>
          policy.policyNumber.toLowerCase().includes(lowerSearchTerm) ||
          policy.product.toLowerCase().includes(lowerSearchTerm) ||
          policy.customerName.toLowerCase().includes(lowerSearchTerm),
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((policy) => policy.status === statusFilter);
    }

    // Apply product type filter
    if (productTypeFilter) {
      filtered = filtered.filter(
        (policy) => policy.productType === productTypeFilter,
      );
    }

    return filtered;
  }, [policies, searchTerm, statusFilter, productTypeFilter]);

  /**
   * Handle view policy details
   */
  const handleViewDetails = useCallback(
    (policyId: string) => {
      navigate(`/portal/customer/policies/${policyId}`);
    },
    [navigate],
  );

  /**
   * Handle download documents (mock implementation)
   */
  const handleDownloadDocuments = useCallback((policy: Policy) => {
    // Mock file download functionality
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${policy.policyNumber}_documents.pdf`;
    link.click();

    // Show notification (could be enhanced with toast notification)
    console.log(`Downloading documents for policy: ${policy.policyNumber}`);
  }, []);

  /**
   * Handle policy renewal request
   */
  const handleRenewalRequest = useCallback(
    (policy: Policy) => {
      // Navigate to renewal request page with policy context
      navigate("/portal/customer/renewals", {
        state: {
          policyId: policy.id,
          policyNumber: policy.policyNumber,
        },
      });
    },
    [navigate],
  );

  /**
   * Handle clear filters
   */
  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter("");
    setProductTypeFilter("");
  }, []);

  /**
   * Handle search input change
   */
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    [],
  );

  /**
   * Handle status filter change
   */
  const handleStatusFilterChange = useCallback((status: PolicyStatus | "") => {
    setStatusFilter(status);
  }, []);

  /**
   * Handle product type filter change
   */
  const handleProductTypeFilterChange = useCallback(
    (productType: Policy["productType"] | "") => {
      setProductTypeFilter(productType);
    },
    [],
  );

  // Define table columns with enhanced actions
  const columns: DataTableColumn<Policy>[] = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      width: 200,
      renderCell: ({ value }) => (
        <Box sx={{ fontFamily: "monospace", fontWeight: 500 }}>{value}</Box>
      ),
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: ({ value, row }) => (
        <Box>
          <Box sx={{ fontWeight: 500 }}>{value}</Box>
          <Box sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
            {row.productType}
          </Box>
        </Box>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      renderCell: ({ value }) => formatDate(new Date(value)),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      renderCell: ({ value }) => formatDate(new Date(value)),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ value }) => (
        <StatusChip status={value} variant="filled" size="small" />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => handleViewDetails(row.id)}
              sx={{ color: "primary.main" }}
            >
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Documents">
            <IconButton
              size="small"
              onClick={() => handleDownloadDocuments(row)}
              sx={{ color: "secondary.main" }}
            >
              <DocumentIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Request Renewal">
            <IconButton
              size="small"
              onClick={() => handleRenewalRequest(row)}
              sx={{
                color: "success.main",
                ...(row.status !== "Active" && { opacity: 0.5 }),
              }}
              disabled={row.status !== "Active"}
            >
              <RenewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (error) {
    return (
      <Box>
        <PageHeader
          title="My Policies"
          subtitle="Manage your insurance policies"
          action={{
            label: "Refresh",
            onClick: refetch,
            variant: "outlined",
          }}
        />
        <ErrorAlert message={error} />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="My Policies"
        subtitle="Manage your insurance policies"
        action={{
          label: "Refresh",
          onClick: refetch,
          variant: "outlined",
        }}
      />

      {/* Policy Stats Summary */}
      {policyStats && (
        <Box sx={{ mb: 3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Card sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h3"
                  sx={{ color: "#0D1B2A", fontWeight: 600, mb: 1 }}
                >
                  {policyStats.total}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  TOTAL POLICIES
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h3"
                  sx={{ color: "#16A34A", fontWeight: 600, mb: 1 }}
                >
                  {policyStats.active}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  ACTIVE COVERAGE
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h3"
                  sx={{ color: "#D97706", fontWeight: 600, mb: 1 }}
                >
                  {policyStats.expiring30Days}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  RENEWAL REQUIRED
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h3"
                  sx={{ color: "#DC2626", fontWeight: 600, mb: 1 }}
                >
                  {policyStats.expired}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6B7280",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  REQUIRE ATTENTION
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      )}

      {/* Search and Filter Controls */}
      <Card sx={{ mb: 4, border: "1px solid #E5E7EB", boxShadow: "none" }}>
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <FilterIcon color="action" />
              <Typography variant="h6">Search and Filter</Typography>
              <Divider sx={{ flexGrow: 1 }} />
              {(searchTerm || statusFilter || productTypeFilter) && (
                <Button
                  size="small"
                  onClick={handleClearFilters}
                  startIcon={<ClearIcon />}
                  variant="outlined"
                >
                  Clear All
                </Button>
              )}
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              {/* Search Field */}
              <TextField
                fullWidth
                placeholder="Search policies by number, product, or customer name..."
                value={searchTerm}
                onChange={handleSearchChange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <SearchIcon color="action" sx={{ mr: 1 }} />
                    ),
                  },
                }}
                size="small"
              />

              {/* Status Filter */}
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) =>
                    handleStatusFilterChange(
                      e.target.value as PolicyStatus | "",
                    )
                  }
                  label="Status"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Suspended">Suspended</MenuItem>
                </Select>
              </FormControl>

              {/* Product Type Filter */}
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Product Type</InputLabel>
                <Select
                  value={productTypeFilter}
                  onChange={(e) =>
                    handleProductTypeFilterChange(
                      e.target.value as Policy["productType"] | "",
                    )
                  }
                  label="Product Type"
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="Motor">Motor</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Life">Life</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Active Filters Display */}
            {(searchTerm || statusFilter || productTypeFilter) && (
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Active filters:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {searchTerm && (
                    <Chip
                      label={`Search: "${searchTerm}"`}
                      size="small"
                      onDelete={() => setSearchTerm("")}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {statusFilter && (
                    <Chip
                      label={`Status: ${statusFilter}`}
                      size="small"
                      onDelete={() => setStatusFilter("")}
                      color="secondary"
                      variant="outlined"
                    />
                  )}
                  {productTypeFilter && (
                    <Chip
                      label={`Type: ${productTypeFilter}`}
                      size="small"
                      onDelete={() => setProductTypeFilter("")}
                      color="success"
                      variant="outlined"
                    />
                  )}
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredPolicies && (
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {filteredPolicies.length} of {policies?.length || 0}{" "}
            policies
          </Typography>
        </Box>
      )}

      {/* Policies Table */}
      {filteredPolicies && filteredPolicies.length === 0 && !loading ? (
        <Alert severity="info" variant="outlined">
          {searchTerm || statusFilter || productTypeFilter
            ? "No policies match your current filter criteria. Try adjusting your search or filters."
            : "You don't have any policies yet. Contact your agent to get started with insurance coverage."}
        </Alert>
      ) : (
        <DataTable
          columns={columns}
          rows={filteredPolicies || []}
          loading={loading}
          emptyMessage="No policies found"
          getRowId={(row: Policy) => row.id}
        />
      )}
    </Box>
  );
}
