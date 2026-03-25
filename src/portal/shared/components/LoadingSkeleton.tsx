import React from "react";
import { Box, Skeleton, Grid, Card, CardContent } from "@mui/material";

interface LoadingSkeletonProps {
  variant: "cards" | "table" | "list";
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant,
  count = 4,
}) => {
  if (variant === "cards") {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid size={{ xs: 12, md: 3 }} key={index}>
            <Card>
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" width="60%" />
                </Box>
                <Skeleton variant="text" width="40%" height={32} />
                <Skeleton variant="text" width="30%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (variant === "table") {
    return (
      <Box>
        {Array.from({ length: count }).map((_, index) => (
          <Box
            key={index}
            sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
          >
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="25%" />
            <Skeleton variant="rectangular" width={80} height={24} />
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} variant="text" height={60} sx={{ mb: 1 }} />
      ))}
    </Box>
  );
};
