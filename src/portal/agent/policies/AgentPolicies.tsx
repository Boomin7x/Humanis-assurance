// src/portal/agent/policies/AgentPolicies.tsx
// Portfolio - Policy List for Agent Portal

import {
  Search as SearchIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DataTable, type DataTableColumn } from "../../shared/components/DataTable";
import { ErrorAlert } from "../../shared/components/ErrorAlert";
import { LoadingSkeleton } from "../../shared/components/LoadingSkeleton";
import { PageHeader } from "../../shared/components/PageHeader";
import { StatusChip } from "../../shared/components/StatusChip";
import { useFilters } from "../../shared/hooks/useFilters";
import { useMockFetch } from "../../shared/hooks/useMockFetch";
import { getPolicies } from "../../shared/mock/mockPolicyService";
import { Policy, PolicyStatus } from "../../shared/types";

const statusOptions: PolicyStatus[] = [
  "Active",
  "Expired",
  "Cancelled",
  "Pending",
  "Suspended",
];

/**
 * Agent Policies - Portfolio management with filtering and search
 */
export function AgentPolicies(): React.ReactElement {
  const navigate = useNavigate();

  // Create stable service function with useCallback
  const fetchPolicies = useCallback(() => {
    return getPolicies();
  }, []);

  const {
    data: policies,
    loading,
    error,
    refetch,
  } = useMockFetch(fetchPolicies, [fetchPolicies]);

  // Filters and search
  const [searchText, setSearchText] = useState("");
  const { filters, setFilter } = useFilters({
    status: "" as PolicyStatus | "",
  });

  // Apply filters and search
  const filteredPolicies = useMemo(() => {
    if (!policies?.data) return [];

    return policies.data.filter((policy) => {
      // Status filter
      if (filters.status && policy.status !== filters.status) return false;

      // Search filter (customer name or policy number)
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const matchesName = policy.customerName
          .toLowerCase()
          .includes(searchLower);
        const matchesPolicyNumber = policy.policyNumber
          .toLowerCase()
          .includes(searchLower);
        if (!matchesName && !matchesPolicyNumber) return false;
      }

      return true;
    });
  }, [policies, filters.status, searchText]);

  // Table columns configuration
  const columns: DataTableColumn<Policy>[] = [
    {
      field: "policyNumber",
      headerName: "Policy Number",
      width: 180,
      renderCell: ({ value, row }) => (
        <Box>
          <Typography variant="body2" fontWeight={600} color="#111827">
            {value}
          </Typography>
          <Typography variant="caption" color="#6B7280">
            {row.productType}
          </Typography>
        </Box>
      ),
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 180,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#111827">
          {value}
        </Typography>
      ),
    },
    {
      field: "product",
      headerName: "Product/Risk",
      width: 200,
      renderCell: ({ value, row }) => (
        <Box>
          <Typography variant="body2" color="#111827">
            {value}
          </Typography>
          <Typography variant="caption" color="#6B7280">
            {row.riskAddress
              ? `${row.riskAddress.substring(0, 30)}...`
              : "Standard Coverage"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#374151">
          {new Date(value).toLocaleDateString("en-GB")}
        </Typography>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
      renderCell: ({ value }) => (
        <Typography variant="body2" color="#374151">
          {new Date(value).toLocaleDateString("en-GB")}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: ({ value }) => <StatusChip status={value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<ViewIcon />}
          onClick={() => navigate(`/portal/agent/policies/${row.id}`)}
          sx={{
            fontSize: "0.75rem",
            py: 0.5,
            px: 1.5,
            border: "1px solid #1D6FA4",
            color: "#1D6FA4",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "#E8F3FA",
              border: "1px solid #1B3A5C",
            },
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader
          title="Policies Portfolio"
          subtitle="Manage and track your client policies"
        />
        <ErrorAlert
          message="Failed to load policies. Please try again."
          onRetry={refetch}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Policies Portfolio"
        subtitle="Manage and track your client policies"
      />

      {/* Filters and Search Toolbar */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="Search by customer name or policy number"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Status Filter"
              value={filters.status}
              onChange={(e) => setFilter("status", e.target.value as PolicyStatus | "")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
              }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="body2" color="#6B7280">
                {filteredPolicies.length} of {policies?.data?.length || 0} policies
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Data Table */}
      <Paper
        sx={{
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          boxShadow: "none",
        }}
      >
        {loading ? (
          <Box sx={{ p: 3 }}>
            <LoadingSkeleton variant="table" count={10} />
          </Box>
        ) : (
          <DataTable
            columns={columns}
            rows={filteredPolicies}
            emptyMessage="No policies found matching your search criteria"
            getRowId={(row: Policy) => row.id}
            pageSize={15}
          />
        )}
      </Paper>
    </Box>
  );
}
