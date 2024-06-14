// src/TableBasic.js
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { useData } from 'src/context/dataContext';
import dayjs from 'dayjs';

const TableBasic = () => {
  const { appData, setAppData, updateAdmin, updateStudent } = useData();
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (appData.students.length > 0) {
      setIsDataLoading(false);
    }
  }, [appData]);

  /**
   * Handle the click event for toggling the 'Fee Paid' status of a student.
   * 
   * @param {number} StudentID - The ID of the student whose fee status is being updated.
   * @param {string} currentFeePaid - The current fee status of the student ('yes' or 'no').
  */
  const handleFeePaidClick = async (StudentID, currentFeePaid) => {
    // Determine the new fee status by toggling the current status
    const newFeePaid = currentFeePaid === 'yes' ? 'no' : 'yes';

    // Create an updated student object with the new fee status
    const updatedStudent = { ...appData.students.find((s) => s.StudentID === StudentID), FeePaid: newFeePaid };

    // Update the student's fee status in the backend
    await updateStudent(StudentID, updatedStudent); // Wait for the update to complete
    
    // Update the state with the modified student data
    setAppData(prevData => ({
        ...prevData,
        students: prevData.students.map(student => {
            if (student.StudentID === StudentID) {
                // Return a new student object with the updated fee status
                return { ...student, FeePaid: newFeePaid };
            }
            // Return the student object unchanged if the ID doesn't match
            return student;
        })
    }));
  };

  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  const calculateAge = (dateOfBirth) => {
    const dob = dayjs(dateOfBirth);
    const now = dayjs();
    const age = now.diff(dob, 'year');
    return age;
  };
    
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Student ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Fee Amount</TableCell>
                    <TableCell align="right">Fee Paid</TableCell>
                    <TableCell align="right">Class</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {appData.students.map((student) => (
                    <TableRow
                        key={student.StudentID}
                        sx={{
                            '&:last-of-type td, &:last-of-type th': { border: 0 }
                        }}
                    >
                        <TableCell>{student.StudentID}</TableCell>
                        <TableCell>{student.FirstName}</TableCell>
                        <TableCell>{student.LastName}</TableCell>
                        <TableCell align="right">{calculateAge(student.DateOfBirth)}</TableCell>
                        <TableCell align="right">{student.Gender}</TableCell>
                        <TableCell align="right">{student.FeeAmount}</TableCell>
                        <TableCell
                            align="right"
                            onClick={() => handleFeePaidClick(student.StudentID, student.FeePaid)}
                            style={{ cursor: 'pointer' }}
                        >
                            {student.FeePaid}
                        </TableCell>
                        <TableCell align="right">{student.ClassID}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
};

export default TableBasic;
