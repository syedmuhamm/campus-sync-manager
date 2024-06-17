import React from 'react';
import { Table, TableHead, TableRow, TableCell } from '@mui/material';

/**
 * StudentTableHeader Component
 * Renders the header row of a student table.
 */
const StudentTableHeader = () => (
  <Table aria-label="student table"> {/* Table component with aria-label for accessibility */}
    <TableHead> {/* TableHead component for the header row */}
      <TableRow> {/* TableRow component for the header row */}
        {/* Table cells for each column */}
        <TableCell>Student ID</TableCell> {/* Student ID column */}
        <TableCell>First Name</TableCell> {/* First Name column */}
        <TableCell>Last Name</TableCell> {/* Last Name column */}
        <TableCell align="right">Fee Amount</TableCell> {/* Fee Amount column aligned to the right */}
        <TableCell align="right">Fee Paid</TableCell> {/* Fee Paid column aligned to the right */}
        <TableCell align="right">Class</TableCell> {/* Class column aligned to the right */}
        <TableCell align="right">Actions</TableCell> {/* Actions column aligned to the right */}
      </TableRow>
    </TableHead>
  </Table>
);

export default StudentTableHeader;
