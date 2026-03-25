// src/portal/customer/claims/components/ClaimTimeline.tsx
// Timeline component for visualizing claim progress with status updates and history

import {
  Assignment as ClaimIcon,
  Close as ClosedIcon,
  CheckCircle as CompletedIcon,
  Description as DocumentIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Visibility as ReviewIcon,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import type {
  ClaimStatus,
  ClaimTimeline as ClaimTimelineType,
} from "../../../shared/types";

interface ClaimTimelineProps {
  timeline: ClaimTimelineType[];
  currentStatus: ClaimStatus;
  title?: string;
}

/**
 * Formats date for timeline display
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

/**
 * Get icon based on status
 */
const getStatusIcon = (status: ClaimStatus): React.ReactElement => {
  switch (status) {
    case "Open":
      return <ClaimIcon />;
    case "In Progress":
      return <ReviewIcon />;
    case "Approved":
      return <CompletedIcon />;
    case "Closed":
      return <ClosedIcon />;
    case "Rejected":
      return <ErrorIcon />;
    default:
      return <InfoIcon />;
  }
};



/**
 * Timeline item component for individual claim updates
 */
function ClaimTimelineItem({
  item,
  isLatest,
}: {
  item: ClaimTimelineType;
  isLatest: boolean;
}): React.ReactElement {
  return (
    <Box sx={{ display: 'flex', mb: 3 }}>
      {/* Timeline dot and connector */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isLatest ? 'primary.main' : 'grey.300',
            color: isLatest ? 'white' : 'grey.600',
            border: isLatest ? 'none' : '2px solid',
            borderColor: 'grey.300'
          }}
        >
          {getStatusIcon(item.status)}
        </Box>
        <Box
          sx={{
            width: 2,
            height: 40,
            bgcolor: 'grey.300',
            mt: 1
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1 }}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: isLatest ? "#F9FAFB" : "#FFFFFF",
            borderColor: isLatest ? "#1D6FA4" : "#D1D5DB",
            borderWidth: isLatest ? 2 : 1,
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                {item.status}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {formatDate(item.date)} • Updated by {item.updatedBy}
              </Typography>
            </Box>
            <Chip
              label={item.status}
              size="small"
              variant={isLatest ? "filled" : "outlined"}
            />
          </Box>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {item.description}
          </Typography>

          {/* Documents section */}
          {item.documents && item.documents.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Attached Documents:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {item.documents.map((doc, index) => (
                  <Link
                    key={index}
                    component="button"
                    variant="body2"
                    onClick={() => {
                      // Mock document download
                      console.log("Download document:", doc);
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    <DocumentIcon fontSize="small" />
                    {doc}
                  </Link>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

/**
 * Claim timeline component for visualizing claim progress
 */
export function ClaimTimeline({
  timeline,
  currentStatus,
  title = "Claim Timeline",
}: ClaimTimelineProps): React.ReactElement {
  // Sort timeline by date (newest first)
  const sortedTimeline = [...timeline].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  if (timeline.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ textAlign: "center", py: 4 }}>
            <InfoIcon color="action" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No timeline updates available yet
            </Typography>
          </Box>
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
            mb: 3,
          }}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Chip
            label={`Current Status: ${currentStatus}`}
            variant="filled"
          />
        </Box>

        <Box>
          {sortedTimeline.map((item, index) => (
            <ClaimTimelineItem
              key={item.id}
              item={item}
              isLatest={index === 0}
            />
          ))}
        </Box>

        {/* Timeline summary */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "#F9FAFB",
            borderRadius: "6px",
            border: "1px solid #E5E7EB",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Timeline Summary:</strong> This claim was submitted on{" "}
            {formatDate(sortedTimeline[sortedTimeline.length - 1]?.date)} and
            has {sortedTimeline.length} status update
            {sortedTimeline.length !== 1 ? "s" : ""}.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

/**
 * Compact timeline component for embedding in other components
 */
export function CompactClaimTimeline({
  timeline,
}: {
  timeline: ClaimTimelineType[];
  currentStatus: ClaimStatus;
}): React.ReactElement {
  // Sort timeline by date (newest first) and take only the last 3 items
  const recentTimeline = [...timeline]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Recent Updates
      </Typography>

      <Box>
        {recentTimeline.map((item, index) => (
          <Box key={item.id} sx={{ display: 'flex', mb: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: index === 0 ? 'primary.main' : 'grey.300',
                  color: index === 0 ? 'white' : 'grey.600',
                }}
              >
                {getStatusIcon(item.status)}
              </Box>
              {index < recentTimeline.length - 1 && (
                <Box
                  sx={{
                    width: 2,
                    height: 30,
                    bgcolor: 'grey.300',
                    mt: 1
                  }}
                />
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={index === 0 ? 600 : 400}>
                {item.status}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(item.date)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {item.description.length > 60
                  ? `${item.description.substring(0, 60)}...`
                  : item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {timeline.length > 3 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          + {timeline.length - 3} more update
          {timeline.length - 3 !== 1 ? "s" : ""}
        </Typography>
      )}
    </Box>
  );
}
