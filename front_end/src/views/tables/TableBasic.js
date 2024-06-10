import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

const TableBasic = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('http://localhost:5000/allData', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(response.data)
        const studentData = response.data.students; 

        // Update state with student data
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell align='right'>Age</TableCell>
            <TableCell align='right'>Gender</TableCell>
            <TableCell align='right'>Fee Amount</TableCell>
            <TableCell align='right'>Fee Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.StudentID}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell>{student.StudentID}</TableCell>
              <TableCell>{student.FirstName}</TableCell>
              <TableCell>{student.LastName}</TableCell>
              <TableCell align='right'>{student.Age}</TableCell>
              <TableCell align='right'>{student.Gender}</TableCell>
              <TableCell align='right'>{student.FeeAmount}</TableCell>
              <TableCell align='right'>{student.FeePaid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableBasic;
