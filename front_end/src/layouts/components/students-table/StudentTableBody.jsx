import React from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';
import ActionButtons from '../Common/ActionButtons';
import FeePaidSwitch from '../common/FreePaidSwitch';

/**
 * StudentTableBody Component
 * Renders the body of a student table with rows.
 * @param {Array} filteredStudents - Array of students to display.
 * @param {number} page - Current page number.
 * @param {number} rowsPerPage - Number of rows per page.
 * @param {function} handleFeePaidClick - Function to handle fee paid switch click.
 * @param {function} handleEditClick - Function to handle edit button click.
 * @param {function} handleDeleteClick - Function to handle delete button click.
 * @param {function} getClassName - Function to get class name based on ClassID.
 */
const StudentTableBody = ({ filteredStudents, page, rowsPerPage, handleFeePaidClick, handleEditClick, handleDeleteClick, getClassName }) => (
  <TableBody>
    {filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
      <TableRow key={student.StudentID} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
        <TableCell style={{ minWidth: 50 }}>{student.StudentID}</TableCell> {/* Student ID column */}
        <TableCell style={{ minWidth: 150 }}>{student.FirstName}</TableCell> {/* First Name column */}
        <TableCell style={{ minWidth: 150 }}>{student.LastName}</TableCell> {/* Last Name column */}
        <TableCell style={{ minWidth: 100 }}>{student.FeeAmount}</TableCell> {/* Fee Amount column aligned to the right */}
        <TableCell style={{ minWidth: 100 }}>
          {/* FeePaidSwitch component to toggle fee paid status */}
          <FeePaidSwitch feePaid={student.FeePaid} handleFeePaidClick={() => handleFeePaidClick(student.StudentID, student.FeePaid)} />
        </TableCell>
        <TableCell style={{ minWidth: 50 }}>{getClassName(student.ClassID)}</TableCell> {/* Class Name column aligned to the right */}
        <TableCell style={{ minWidth: 150 }}>
          {/* ActionButtons component for edit and delete actions */}
          <ActionButtons handleEditClick={() => handleEditClick(student)} handleDeleteClick={() => handleDeleteClick(student)} />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default StudentTableBody;
