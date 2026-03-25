// src/portal/customer/claims/Claims.tsx
// Enhanced customer claims management with advanced filtering, status tracking, and new claim submission

import React, { useCallback, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { DataTable, DataTableColumn } from '../../shared/components/DataTable';
import { PageHeader } from '../../shared/components/PageHeader';
import { ErrorAlert } from '../../shared/components/ErrorAlert';
import { DeclareClaimPanel } from './DeclareClaimPanel';
import { useAuth } from '../../shared/hooks/useAuth';
import { useMockFetch } from '../../shared/hooks/useMockFetch';

// Import our new components
import { ClaimStatusBadge, ClaimStatusSummary } from './components/ClaimStatusBadge';

import { getCustomerClaims } from '../../shared/mock/mockClaimService';
import type { Claim, ClaimStatus } from '../../shared/types';

/**
 * Formats date for display in table
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Formats currency for display
 */
const formatCurrency = (amount: number | undefined, currency: string = 'XAF'): string => {
  if (amount === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Enhanced Customer Claims page component with advanced filtering and status tracking
 */
export function Claims(): React.ReactElement {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Filter and search state
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | ''>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<'all' | 'last30' | 'last90' | 'lastYear'>('all');

  // UI state
  const [declareClaimOpen, setDeclareClaimOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  // Memoized fetch function for customer claims
  const fetchCustomerClaims = useCallback(
    () => getCustomerClaims(user?.id || ''),
    [user?.id]
  );

  const {
    data: allClaims,
    loading,
    error,
    refetch
  } = useMockFetch(fetchCustomerClaims);

  // Filter claims based on search and filters
  const filteredClaims = useMemo(() => {
    if (!allClaims) return [];

    let filtered = allClaims;

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(claim =>
        claim.claimNumber.toLowerCase().includes(lowerSearchTerm) ||
        claim.policyNumber.toLowerCase().includes(lowerSearchTerm) ||
        claim.description.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(claim => claim.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();

      switch (dateFilter) {
        case 'last30':
          cutoffDate.setDate(now.getDate() - 30);
          break;
        case 'last90':
          cutoffDate.setDate(now.getDate() - 90);
          break;
        case 'lastYear':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(claim => claim.dateReported >= cutoffDate);
    }

    return filtered;
  }, [allClaims, searchTerm, statusFilter, dateFilter]);

  // Calculate status counts for summary
  const statusCounts = useMemo(() => {
    if (!allClaims) return {} as Record<ClaimStatus, number>;

    return allClaims.reduce((counts, claim) => {
      counts[claim.status] = (counts[claim.status] || 0) + 1;
      return counts;
    }, {} as Record<ClaimStatus, number>);
  }, [allClaims]);

  /**
   * Handle view claim details
   */
  const handleViewDetails = useCallback((claimId: string) => {
    navigate(`/portal/customer/claims/${claimId}`);
  }, [navigate]);

  /**
   * Handle status filter change
   */
  const handleStatusFilterChange = useCallback((status: ClaimStatus | '') => {
    setStatusFilter(status);
  }, []);

  /**
   * Handle search input change
   */
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  /**
   * Handle date filter change
   */
  const handleDateFilterChange = useCallback((period: typeof dateFilter) => {
    setDateFilter(period);
  }, []);

  /**
   * Handle clear all filters
   */
  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('');
    setDateFilter('all');
  }, []);

  /**
   * Handle open declare claim panel
   */
  const handleOpenDeclareClaimPanel = useCallback(() => {
    setDeclareClaimOpen(true);
  }, []);

  /**
   * Handle close declare claim panel
   */
  const handleCloseDeclareClaimPanel = useCallback(() => {
    setDeclareClaimOpen(false);
  }, []);

  /**
   * Handle claim submitted successfully
   */
  const handleClaimSubmitted = useCallback((newClaim: Claim) => {
    setSnackbar({
      open: true,
      message: `Claim ${newClaim.claimNumber} submitted successfully`,
      severity: 'success',
    });
    // Refresh claims list to show the new claim
    refetch();
  }, [refetch]);

  /**
   * Handle close snackbar
   */
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  // Define enhanced table columns
  const columns: DataTableColumn<Claim>[] = [
    {
      field: 'claimNumber',
      headerName: 'Claim Number',
      width: 180,
      renderCell: ({ value }) => (
        <Box sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
          {value}
        </Box>
      ),
    },
    {
      field: 'policyNumber',
      headerName: 'Policy Number',
      width: 180,
      renderCell: ({ value }) => (
        <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
          {value}
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: ({ value }) => (
        <ClaimStatusBadge status={value} size="small" />
      ),
    },
    {
      field: 'dateReported',
      headerName: 'Date Reported',
      width: 150,
      renderCell: ({ value }) => formatDate(new Date(value)),
    },
    {
      field: 'claimAmount',
      headerName: 'Claim Amount',
      width: 130,
      renderCell: ({ value, row }) => (
        <Box sx={{ fontWeight: 500 }}>
          {formatCurrency(value, row.currency)}
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      renderCell: ({ value }) => (
        <Tooltip title={value} arrow>
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
          >
            {value}
          </Box>
        </Tooltip>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <Tooltip title="View Details">
          <IconButton
            size="small"
            onClick={() => handleViewDetails(row.id)}
            sx={{ color: 'primary.main' }}
          >
            <ViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (error) {
    return (
      <Box>
        <PageHeader
          title="My Claims"
          subtitle="Manage your insurance claims"
          action={{
            label: "Declare New Claim",
            onClick: handleOpenDeclareClaimPanel,
            variant: "contained"
          }}
        />
        <ErrorAlert message={error} />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="My Claims"
        subtitle="Manage your insurance claims"
        action={{
          label: "Declare New Claim",
          onClick: handleOpenDeclareClaimPanel,
          variant: "contained"
        }}
      />

      {/* Claims Summary Dashboard */}
      {allClaims && allClaims.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrendingIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Claims Overview</Typography>
                </Box>
                <ClaimStatusSummary statusCounts={statusCounts} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#0D1B2A', fontWeight: 600 }} gutterBottom>
                  Claims Summary
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #F3F4F6' }}>
                    <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
                      Total Claims:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#0D1B2A', fontWeight: 600 }}>
                      {allClaims.length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #F3F4F6' }}>
                    <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
                      This Month:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#0D1B2A', fontWeight: 600 }}>
                      {allClaims.filter(claim => {
                        const now = new Date();
                        const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);
                        return claim.dateReported >= monthAgo;
                      }).length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
                      Total Value:
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1D6FA4', fontWeight: 600 }}>
                      {formatCurrency(
                        allClaims.reduce((sum, claim) => sum + (claim.claimAmount || 0), 0)
                      )}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Enhanced Search and Filter Controls */}
      <Card sx={{ mb: 4, border: '1px solid #E5E7EB', boxShadow: 'none' }}>
        <CardContent>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <FilterIcon color="action" />
              <Typography variant="h6">Search and Filter Claims</Typography>
              <Divider sx={{ flexGrow: 1 }} />
              {(searchTerm || statusFilter || dateFilter !== 'all') && (
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

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {/* Search Field */}
              <TextField
                fullWidth
                placeholder="Search by claim number, policy number, or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                slotProps={{
                  input: {
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
                  }
                }}
                size="small"
              />

              {/* Status Filter */}
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilterChange(e.target.value as ClaimStatus | '')}
                  label="Status"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>

              {/* Date Filter */}
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Time Period</InputLabel>
                <Select
                  value={dateFilter}
                  onChange={(e) => handleDateFilterChange(e.target.value as typeof dateFilter)}
                  label="Time Period"
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="last30">Last 30 Days</MenuItem>
                  <MenuItem value="last90">Last 90 Days</MenuItem>
                  <MenuItem value="lastYear">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {/* Active Filters Display */}
            {(searchTerm || statusFilter || dateFilter !== 'all') && (
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Active filters:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {searchTerm && (
                    <Chip
                      label={`Search: "${searchTerm}"`}
                      size="small"
                      onDelete={() => setSearchTerm('')}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {statusFilter && (
                    <Chip
                      label={`Status: ${statusFilter}`}
                      size="small"
                      onDelete={() => setStatusFilter('')}
                      color="secondary"
                      variant="outlined"
                    />
                  )}
                  {dateFilter !== 'all' && (
                    <Chip
                      label={`Period: ${dateFilter.replace('last', 'Last ')}`}
                      size="small"
                      onDelete={() => setDateFilter('all')}
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
      {filteredClaims && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredClaims.length} of {allClaims?.length || 0} claims
          </Typography>
        </Box>
      )}

      {/* Claims Table */}
      {filteredClaims && filteredClaims.length === 0 && !loading ? (
        <Alert severity="info" variant="outlined">
          {(searchTerm || statusFilter || dateFilter !== 'all')
            ? "No claims match your current filter criteria. Try adjusting your search or filters."
            : "You haven't submitted any claims yet. Click 'Declare New Claim' to get started."
          }
        </Alert>
      ) : (
        <DataTable
          columns={columns}
          rows={filteredClaims || []}
          loading={loading}
          emptyMessage="No claims found"
          getRowId={(row: Claim) => row.id}
        />
      )}

      {/* Declare Claim Panel */}
      <DeclareClaimPanel
        open={declareClaimOpen}
        onClose={handleCloseDeclareClaimPanel}
        onClaimSubmitted={handleClaimSubmitted}
      />

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}