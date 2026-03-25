/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export interface DataTableColumn<T = any> {
  field: string;
  headerName?: string;
  width?: number;
  sortable?: boolean;
  renderCell?: (params: {
    value: any;
    row: T;
    field: string;
  }) => React.ReactNode;
}

interface DataTableProps<T = any> {
  columns: DataTableColumn<T>[];
  rows: T[];
  loading?: boolean;
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  emptyMessage?: string;
  getRowId?: (row: T) => string | number;
}

export const DataTable = <T extends Record<string, any>>({
  columns,
  rows,
  loading = false,
  page = 0,
  pageSize = 10,
  total,
  onPageChange,
  onPageSizeChange,
  emptyMessage = "No data available",
  getRowId = (row) => row.id,
}: DataTableProps<T>) => {
  const handlePageChange = (_event: unknown, newPage: number) => {
    onPageChange?.(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPageSizeChange?.(parseInt(event.target.value, 10));
  };

  if (loading) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  <Skeleton width={100} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: pageSize }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    <Skeleton width={120} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {emptyMessage}
        </Typography>
      </Paper>
    );
  }

  const displayRows = rows.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: (theme) => theme.palette.grey[50],
                  }}
                >
                  {column.headerName || column.field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.map((row) => {
              const id = getRowId(row);
              return (
                <TableRow key={id} hover>
                  {columns.map((column) => {
                    const value = row[column.field];
                    return (
                      <TableCell key={`${id}-${column.field}`}>
                        {column.renderCell
                          ? column.renderCell({
                              value,
                              row,
                              field: column.field,
                            })
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {(total !== undefined || rows.length > pageSize) && (
        <TablePagination
          component="div"
          count={total || rows.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handlePageSizeChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </Paper>
  );
};
