import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

/**
 * StudentTableHeader Component
 * Renders the header row of a student table.
 */
const StudentTableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell sx={{ minWidth: 100 }}>Student ID</TableCell>
      <TableCell sx={{ minWidth: 150 }}>First Name</TableCell>
      <TableCell sx={{ minWidth: 150 }}>Last Name</TableCell>
      <TableCell sx={{ minWidth: 100 }}>Fee Amount</TableCell>
      <TableCell sx={{ minWidth: 100 }}>Fee Paid</TableCell>
      <TableCell sx={{ minWidth: 50 }}>Class</TableCell>
      <TableCell sx={{ minWidth: 150 }}>Actions</TableCell>
    </TableRow>
  </TableHead>
);

export default StudentTableHeader;
