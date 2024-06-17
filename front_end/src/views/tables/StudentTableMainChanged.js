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
import { FormControl, InputLabel, MenuItem, Select, Switch, TablePagination, FormControlLabel, Box } from '@mui/material';
import StudentEditModal from '../../layouts/components/modals/student-modals/StudentEditModal';

const StudentTableMainChanged = () => {
  const { appData, setAppData, updateStudent, deleteStudent } = useData();
  const [isDataLoading, setIsDataLoading] = useState(true); // State to manage data loading status
  const [page, setPage] = useState(0); // State to manage the current page in pagination
  const [rowsPerPage, setRowsPerPage] = useState(10); // State to manage rows per page in pagination
  const [selectedClass, setSelectedClass] = useState(''); // State to manage selected class filter
  const [showUnpaid, setShowUnpaid] = useState(false); // State to manage unpaid fee filter
  const [selectedStudent, setSelectedStudent] = useState(null); // State to manage the selected student for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the modal visibility

  // Effect to set data loading status based on availability of student data
  useEffect(() => {
    if (appData.students.length > 0) {
      setIsDataLoading(false);
    }
  }, [appData]);

  // Handler to toggle fee paid status
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

  // Handler for class selection change
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setPage(0);
  };

  // Handler for pagination page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handler for changing rows per page in pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to get class name from class ID
  const getClassName = (classID) => {
    const classInfo = appData.classes.find((cls) => cls.ClassID === classID);
    return classInfo ? classInfo.ClassName : 'Unknown';
  };

  // Filter students based on selected class, unpaid status, and enabled status
  const filteredStudents = appData.students.filter((student) => {
    const classMatch = selectedClass ? student.ClassID === parseInt(selectedClass) : true;
    const feeMatch = showUnpaid ? student.FeePaid === 'no' : true;
    const statusMatch = student.Status === 'Enabled';
    return classMatch && feeMatch && statusMatch;
  });

  // Handler for edit button click
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Handler for delete button click
  const handleDeleteClick = async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.FirstName} ${student.LastName}?`)) {
      const updatedStudent = { ...student, Status: 'Disabled' };
      await updateStudent(student.StudentID, updatedStudent);
      setAppData((prevData) => ({
        ...prevData,
        students: prevData.students.map((s) => {
          if (s.StudentID === student.StudentID) {
            return updatedStudent;
          }
          return s;
        }),
      }));
    }
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Handler for saving the updated student details
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

  // Display loading indicator while data is being fetched
  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <FormControl variant="outlined" sx={{ minWidth: 80, maxWidth: 150 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginBottom: '5px'}}>
            <InputLabel id="class-select-label">Select Class</InputLabel>
          </Box>
          <Select
            labelId="class-select-label"
            id="class-select"
            value={selectedClass}
            onChange={handleClassChange}
            label="Select Class"
            size="small"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {appData.classes.map((cls) => (
              <MenuItem key={cls.ClassID} value={cls.ClassID} sx={{ textAlign: 'center' }}>
                {cls.ClassName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color={showUnpaid ? 'secondary' : 'primary'}
          onClick={() => setShowUnpaid((prev) => !prev)}
          sx={{ minWidth: 150, maxWidth: 200, padding: '6px 16px', fontSize: '0.875rem' }}
        >
          {showUnpaid ? 'All Students' : 'Unpaid Fee Students'}
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell align="right">Fee Amount</TableCell>
              <TableCell align="right">Fee Paid</TableCell>
              <TableCell align="right">Class</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
              <TableRow
                key={student.StudentID}
                sx={{
                  '&:last-of-type td, &:last-of-type th': { border: 0 },
                }}
              >
                <TableCell>{student.StudentID}</TableCell>
                <TableCell>{student.FirstName}</TableCell>
                <TableCell>{student.LastName}</TableCell>
                <TableCell align="right">{student.FeeAmount}</TableCell>
                <TableCell align="right">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={student.FeePaid === 'yes'}
                        onChange={() => handleFeePaidClick(student.StudentID, student.FeePaid)}
                        color={student.FeePaid === 'yes' ? 'success' : 'error'}
                      />
                    }
                    label={student.FeePaid === 'yes' ? 'Yes' : 'No'}
                  />
                </TableCell>
                <TableCell align="right">{getClassName(student.ClassID)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(student)}
                    sx={{ minWidth: 70, fontSize: '0.75rem', color: 'white !important' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(student)}
                    sx={{ minWidth: 70, fontSize: '0.75rem', color: 'white !important', marginLeft: '8px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
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
      )} */}
    </Paper>
  );
};

export default StudentTableMainChanged;
