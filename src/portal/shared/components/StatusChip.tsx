import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { PolicyStatus, ClaimStatus, PaymentStatus, CommissionStatus } from '../types';

type StatusType = PolicyStatus | ClaimStatus | PaymentStatus | CommissionStatus | string;

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: StatusType;
  variant?: 'filled' | 'outlined';
}

const statusColorMap: Record<string, { color: string; backgroundColor: string }> = {
  // Policy statuses
  'Active': { color: '#2e7d32', backgroundColor: '#e8f5e8' },
  'Expired': { color: '#757575', backgroundColor: '#f5f5f5' },
  'Cancelled': { color: '#d32f2f', backgroundColor: '#ffebee' },
  'Pending': { color: '#ed6c02', backgroundColor: '#fff3e0' },
  'Suspended': { color: '#9c27b0', backgroundColor: '#f3e5f5' },

  // Claim statuses
  'Open': { color: '#1976d2', backgroundColor: '#e3f2fd' },
  'In Progress': { color: '#ed6c02', backgroundColor: '#fff3e0' },
  'Closed': { color: '#757575', backgroundColor: '#f5f5f5' },
  'Approved': { color: '#2e7d32', backgroundColor: '#e8f5e8' },
  'Rejected': { color: '#d32f2f', backgroundColor: '#ffebee' },

  // Payment statuses
  'Paid': { color: '#2e7d32', backgroundColor: '#e8f5e8' },
  'Failed': { color: '#d32f2f', backgroundColor: '#ffebee' },
  'Processing': { color: '#1976d2', backgroundColor: '#e3f2fd' },

  // Commission statuses - reusing payment colors for consistency

  // Default fallback
  'default': { color: '#757575', backgroundColor: '#f5f5f5' },
};

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  variant = 'filled',
  sx,
  ...props
}) => {
  const statusKey = String(status);
  const statusConfig = statusColorMap[statusKey] || statusColorMap['default'];

  const chipSx = variant === 'filled'
    ? {
        backgroundColor: statusConfig.backgroundColor,
        color: statusConfig.color,
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.5px',
        border: `1px solid ${statusConfig.color}20`,
        '& .MuiChip-label': {
          px: 1.5,
        },
        ...sx,
      }
    : {
        backgroundColor: 'transparent',
        color: statusConfig.color,
        border: `1px solid ${statusConfig.color}`,
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.5px',
        '& .MuiChip-label': {
          px: 1.5,
        },
        ...sx,
      };

  return (
    <Chip
      label={status}
      size="small"
      sx={chipSx}
      {...props}
    />
  );
};