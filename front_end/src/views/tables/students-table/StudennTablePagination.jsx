import React from 'react';
import { TablePagination } from '@mui/material';

/**
 * StudentTablePagination Component
 * Pagination component for student table.
 * @param {Array} filteredStudents - Array of students after filtering.
 * @param {number} rowsPerPage - Number of rows per page.
 * @param {number} page - Current page number.
 * @param {function} handleChangePage - Function to handle page change.
 * @param {function} handleChangeRowsPerPage - Function to handle rows per page change.
 */
const StudentTablePagination = ({ filteredStudents, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage }) => (
  <TablePagination
    rowsPerPageOptions={[5, 10, 25]} // Options for rows per page dropdown
    component="div"
    count={filteredStudents.length} // Total number of items (students) to paginate
    rowsPerPage={rowsPerPage} // Number of rows per page
    page={page} // Current page number
    onPageChange={handleChangePage} // Function to handle page change
    onRowsPerPageChange={handleChangeRowsPerPage} // Function to handle rows per page change
  />
);

export default StudentTablePagination;
