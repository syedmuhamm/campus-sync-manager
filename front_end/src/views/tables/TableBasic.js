import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import { useData } from 'src/context/dataContext';
import dayjs from 'dayjs';
import { FormControl, InputLabel, MenuItem, Select, Switch, TablePagination, FormControlLabel } from '@mui/material';
import StudentEditModal from '../modals/StudentEditModal';


const TableBasic = () => {
  const { appData, setAppData, updateStudent } = useData();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedClass, setSelectedClass] = useState('');
  const [showUnpaid, setShowUnpaid] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect to check if data is loaded
  useEffect(() => {
    if (appData.students.length > 0) {
      setIsDataLoading(false);
    }
  }, [appData]);

  // Function to handle the fee paid switch click
  const handleFeePaidClick = async (StudentID, currentFeePaid) => {
    const newFeePaid = currentFeePaid === 'yes' ? 'no' : 'yes';
    const updatedStudent = { ...appData.students.find((s) => s.StudentID === StudentID), FeePaid: newFeePaid };
    await updateStudent(StudentID, updatedStudent);
    setAppData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) => {
        if (student.StudentID === StudentID) {
          return { ...student, FeePaid: newFeePaid };
        }
        return student;
      }),
    }));
  };

  // Function to handle class selection change
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setPage(0); // Reset to first page on class change
  };

  // Function to handle pagination page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const dob = dayjs(dateOfBirth);
    const now = dayjs();
    const age = now.diff(dob, 'year');
    return age;
  };

  // Filtering students based on selected class and unpaid fee status
  const filteredStudents = appData.students.filter((student) => {
    const classMatch = selectedClass ? student.ClassID === parseInt(selectedClass) : true;
    const feeMatch = showUnpaid ? student.FeePaid === 'no' : true;
    return classMatch && feeMatch;
  });

  // Function to handle row click to open the modal
  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Function to handle save from modal
  const handleSaveStudent = async (updatedStudent) => {
    await updateStudent(updatedStudent.StudentID, updatedStudent);
    setAppData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) => {
        if (student.StudentID === updatedStudent.StudentID) {
          return updatedStudent;
        }
        return student;
      }),
    }));
    handleCloseModal();
  };

  // Display loading message while data is being loaded
  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="class-select-label">Select Class</InputLabel>
          <Select
            labelId="class-select-label"
            id="class-select"
            value={selectedClass}
            onChange={handleClassChange}
            label="Select Class"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {appData.classes.map((cls) => (
              <MenuItem key={cls.ClassID} value={cls.ClassID}>
                {cls.ClassName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="secondary" onClick={() => setShowUnpaid((prev) => !prev)}>
          {showUnpaid ? 'Show All Students' : 'Show Unpaid Fee Students'}
        </Button>
      </div>
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
            {filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
              <TableRow
                key={student.StudentID}
                sx={{
                  '&:last-of-type td, &:last-of-type th': { border: 0 },
                  cursor: 'pointer', // Add cursor pointer to indicate clickable rows
                }}
                onClick={() => handleRowClick(student)}
              >
                <TableCell>{student.StudentID}</TableCell>
                <TableCell>{student.FirstName}</TableCell>
                <TableCell>{student.LastName}</TableCell>
                <TableCell align="right">{calculateAge(student.DateOfBirth)}</TableCell>
                <TableCell align="right">{student.Gender}</TableCell>
                <TableCell align="right">{student.FeeAmount}</TableCell>
                <TableCell align="right">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={student.FeePaid === 'yes'}
                        onChange={() => handleFeePaidClick(student.StudentID, student.FeePaid)}
                        color={student.FeePaid === 'yes' ? 'success' : 'error'}
                        onClick={(e) => e.stopPropagation()} // Prevent row click when toggling switch
                      />
                    }
                    label={student.FeePaid === 'yes' ? 'Yes' : 'No'}
                  />
                </TableCell>
                <TableCell align="right">{student.ClassID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredStudents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedStudent && (
        <StudentEditModal
          student={selectedStudent}
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleSave={handleSaveStudent}
        />
      )}
    </Paper>
  );
};

export default TableBasic;
