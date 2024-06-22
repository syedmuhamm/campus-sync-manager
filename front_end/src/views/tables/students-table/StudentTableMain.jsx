import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useData } from 'src/context/dataContext';
import LoadingIndicator from '../../../layouts/components/Common/LoadingIndicator';
import SelectClassFilter from '../../../layouts/components/Common/SelectClassFilter';
import StudentTableHeader from './StudentTableHeader';
import StudentEditModal from '../../../layouts/components/modals/student-modals/StudentEditModal';
import { filterStudentsViaSelectedClassAndSection } from 'src/utils/dataUtils';
import FeeDisabledStudentsFilter from '../../../layouts/components/common/FeeDisabledStudentsFilter';
import SelectSectionFilter from '../../../layouts/components/common/SelectSectionFilter';
import ActionButtons from '../../../layouts/components/Common/ActionButtons';
import FeePaidSwitch from '../../../layouts/components/common/FreePaidSwitch';
import StudentTablePagination from './StudennTablePagination';

const StudentTableMain = () => {
  const { appData, setAppData, updateStudent } = useData(); // Context hook for global state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(0); // Pagination current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page for pagination
  const [selectedClass, setSelectedClass] = useState(''); // Selected class for filtering
  const [selectedSection, setSelectedSection] = useState(''); // Selected section for filtering
  const [filterOption, setFilterOption] = useState('all'); // Filter option for fee disabled students
  const [selectedStudent, setSelectedStudent] = useState(null); // Selected student for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal open/close

  // Use effect to manage loading state based on app data
  useEffect(() => {
    if (appData.students.length > 0) {
      setIsLoading(false);
    }
  }, [appData]);

  // Handle fee paid switch click
  const handleFeePaidSwitch = async (studentId, currentFeePaidStatus) => {
    const updatedFeePaidStatus = currentFeePaidStatus === 'yes' ? 'no' : 'yes';
    const updatedStudent = { 
      ...appData.students.find((student) => student.StudentID === studentId), 
      FeePaid: updatedFeePaidStatus, 
      ClassSectionID: selectedSection 
    };
    await updateStudent(studentId, updatedStudent);
    setAppData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) => 
        student.StudentID === studentId ? updatedStudent : student
      ),
    }));
  };

  // Handle class selection change
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setSelectedSection(''); // Reset section when class changes
    setCurrentPage(0); // Reset page when class filter changes
  };

  // Handle section selection change
  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
    setCurrentPage(0); // Reset page when section filter changes
  };

  // Handle pagination page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Handle change in rows per page
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0); // Reset page when rows per page changes
  };

  // Get class name based on class ID
  const getClassName = (classId) => {
    const classInfo = appData.classes.find((cls) => cls.ClassID === classId);
    return classInfo ? classInfo.ClassName : 'Unknown';
  };

  // Filter students based on selected class and section
  const filteredStudents = filterStudentsViaSelectedClassAndSection(appData.students, selectedClass, selectedSection, filterOption);

  // Handle edit button click
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Handle delete button click
  const handleDeleteClick = async (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.FirstName} ${student.LastName}?`)) {
      const updatedStudent = { ...student, Status: 'disabled' };
      await updateStudent(student.StudentID, updatedStudent);
      setAppData((prevData) => ({
        ...prevData,
        students: prevData.students.map((s) => 
          s.StudentID === student.StudentID ? updatedStudent : s
        ),
      }));
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Handle save student
  const handleSaveStudent = async (updatedStudent) => {
    await updateStudent(updatedStudent.StudentID, updatedStudent);
    setAppData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) => 
        student.StudentID === updatedStudent.StudentID ? updatedStudent : student
      ),
    }));
    handleCloseModal();
  };

  // Handle filter option change
  const handleFilterOptionChange = (event) => {
    setFilterOption(event.target.value);
    setCurrentPage(0); // Reset page when filter changes
  };

  // Render loading indicator if data is loading
  if (isLoading) {
    return <LoadingIndicator />;
  }

  // Filter sections based on selected class
  const filteredSections = appData.classSections.filter((section) => section.ClassID == selectedClass);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box display="flex" justifyContent="space-between" p={2} alignItems="center">
        <Box display="flex" alignItems="center">
          <SelectClassFilter 
            selectedClass={selectedClass} 
            handleClassChange={handleClassChange} 
            classes={appData.classes} 
          />
          <SelectSectionFilter 
            selectedSection={selectedSection} 
            handleSectionChange={handleSectionChange} 
            filteredSections={filteredSections} 
          />
        </Box>
        <FeeDisabledStudentsFilter 
          filterOption={filterOption} 
          handleFilterChange={handleFilterOptionChange} 
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <StudentTableHeader />
          <TableBody>
            {filteredStudents.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((student) => (
              <TableRow key={student.StudentID} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell style={{ minWidth: 50 }}>{student.StudentID}</TableCell>
                <TableCell style={{ minWidth: 150 }}>{student.FirstName}</TableCell>
                <TableCell style={{ minWidth: 150 }}>{student.LastName}</TableCell>
                <TableCell style={{ minWidth: 100 }}>{student.FeeAmount}</TableCell>
                <TableCell style={{ minWidth: 100 }}>
                  <FeePaidSwitch 
                    feePaid={student.FeePaid} 
                    handleFeePaidClick={() => handleFeePaidSwitch(student.StudentID, student.FeePaid)} 
                  />
                </TableCell>
                <TableCell style={{ minWidth: 50 }}>{getClassName(student.ClassID)}</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  <ActionButtons 
                    handleEditClick={() => handleEditClick(student)} 
                    handleDeleteClick={() => handleDeleteClick(student)} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StudentTablePagination
        filteredStudents={filteredStudents}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        handleChangePage={handlePageChange}
        handleChangeRowsPerPage={handleRowsPerPageChange}
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

export default StudentTableMain;
