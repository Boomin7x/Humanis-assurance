// src/components/ui/Grid.tsx
import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

// Re-export MUI Grid v2 directly since it already has the size prop we need
const Grid: React.FC<MuiGridProps> = (props) => {
  return <MuiGrid {...props} />;
};

export default Grid;
