import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

/**
 * StudentTableHeader Component
 * Renders the header row of a student table.
 */
const StudentTableHeader = () => (
  <TableHead> {/* TableHead component for the header row */}
    <TableRow> {/* TableRow component for the header row */}
      {/* Table cells for each column */}
      <TableCell style={{ minWidth: 50 }}>Student ID</TableCell> {/* Student ID column */}
      <TableCell style={{ minWidth: 150 }}>First Name</TableCell> {/* First Name column */}
      <TableCell style={{ minWidth: 150 }}>Last Name</TableCell> {/* Last Name column */}
      <TableCell align="right" style={{ minWidth: 100 }}>Fee Amount</TableCell> {/* Fee Amount column aligned to the right */}
      <TableCell align="right" style={{ minWidth: 100 }}>Fee Paid</TableCell> {/* Fee Paid column aligned to the right */}
      <TableCell align="right" style={{ minWidth: 100 }}>Class</TableCell> {/* Class column aligned to the right */}
      <TableCell align="right" style={{ minWidth: 150 }}>Actions</TableCell> {/* Actions column aligned to the right */}
    </TableRow>
  </TableHead>
);

export default StudentTableHeader;
