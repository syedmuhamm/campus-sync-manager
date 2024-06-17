import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { useData } from 'src/context/dataContext';
import LoadingIndicator from '../Common/LoadingIndicator';
import SelectClassFilter from '../Common/SelectClassFilter';
import StudentTableHeader from './StudentTableHeader';
import StudentTableBody from './StudentTableBody';
import StudentTablePagination from './StudentTablePagination';
import { Button, Box } from '@mui/material';
import StudentEditModal from '../modals/student-modals/StudentEditModal';
import { filterStudents } from 'src/utils/dataUtils';

const StudentTableMain = () => {
  // Context and state management
  const { appData, setAppData, updateStudent } = useData(); // Example of using context hook
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedClass, setSelectedClass] = useState('');
  const [showUnpaid, setShowUnpaid] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to set loading state based on appData
  useEffect(() => {
    if (appData.students.length > 0) {
      setIsDataLoading(false);
    }
  }, [appData]);

  // Handlers for UI actions
  const handleFeePaidClick = async (StudentID, currentFeePaid) => {
    const newFeePaid = currentFeePaid === 'yes' ? 'no' : 'yes';
    const updatedStudent = { ...appData.students.find((s) => s.StudentID === StudentID), FeePaid: newFeePaid };
    await updateStudent(StudentID, updatedStudent);
    setAppData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) => (student.StudentID === StudentID ? updatedStudent : student)),
    }));
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setPage(0); // Reset page when class filter changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Handler for pagination page change
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page when rows per page changes
  };

  const getClassName = (classID) => {
    const classInfo = appData.classes.find((cls) => cls.ClassID === classID);
    return classInfo ? classInfo.ClassName : 'Unknown'; // Get class name based on class ID
  };

  // Filtered student data based on selected filters
  const filteredStudents = filterStudents(appData.students, selectedClass, showUnpaid, 'Enabled');

  // Handlers for modal interactions
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.FirstName} ${student.LastName}?`)) {
      const updatedStudent = { ...student, Status: 'Disabled' };
      await updateStudent(student.StudentID, updatedStudent);
      setAppData((prevData) => ({
        ...prevData,
        students: prevData.students.map((s) => (s.StudentID === student.StudentID ? updatedStudent : s)),
      }));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSaveStudent = async (updatedStudent) => {
    await updateStudent(updatedStudent.StudentID, updatedStudent);
    setAppData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) => (student.StudentID === updatedStudent.StudentID ? updatedStudent : student)),
    }));
    handleCloseModal();
  };

  // Render loading indicator while data is loading
  if (isDataLoading) {
    return <LoadingIndicator />;
  }

  // Render student table and filters when data is loaded
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Filter controls */}
      <Box display="flex" justifyContent="space-between" p={2}>
        <SelectClassFilter selectedClass={selectedClass} handleClassChange={handleClassChange} classes={appData.classes} />
        <Button
          variant="contained"
          color={showUnpaid ? 'secondary' : 'primary'}
          onClick={() => setShowUnpaid((prev) => !prev)}
          sx={{ minWidth: 150, maxWidth: 200, p: 1, fontSize: '0.875rem' }}
        >
          {showUnpaid ? 'All Students' : 'Unpaid Fee Students'}
        </Button>
      </Box>

      {/* Table container */}
      <TableContainer component={Paper}>
        <StudentTableHeader /> {/* Table header */}
        {/* Table body with student data */}
        <StudentTableBody
          filteredStudents={filteredStudents}
          page={page}
          rowsPerPage={rowsPerPage}
          handleFeePaidClick={handleFeePaidClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          getClassName={getClassName}
        />
      </TableContainer>

      {/* Pagination component */}
      <StudentTablePagination
        filteredStudents={filteredStudents}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* Student edit modal */}
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

export default StudentTableMain;
