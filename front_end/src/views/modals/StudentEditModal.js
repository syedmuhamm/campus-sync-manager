import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useData } from 'src/context/dataContext';

const StudentEditModal = ({ student, open, handleClose, handleSave }) => {
  const { appData } = useData(); // Access global app data using custom hook
  const [editedStudent, setEditedStudent] = useState({ ...student }); // State to manage edited student details

  // Effect to format the DateOfBirth field to a compatible format for input type="date"
  useEffect(() => {
    const formattedDateOfBirth = editedStudent.DateOfBirth ? editedStudent.DateOfBirth.split('T')[0] : '';
    setEditedStudent((prev) => ({
      ...prev,
      DateOfBirth: formattedDateOfBirth,
    }));
  }, [student]); // Re-run effect when the student prop changes

  // Handler for input changes, updating the corresponding field in the editedStudent state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for save button click, triggering the save function passed as prop
  const handleSaveClick = () => {
    handleSave(editedStudent);
  };

  // Function to get the class name from the class ID
  const getClassName = (classID) => {
    const classInfo = appData.classes.find((cls) => cls.ClassID === classID);
    return classInfo ? classInfo.ClassName : 'Unknown';
  };

  // Function to get the class ID from the class name
  const getClassID = (className) => {
    const classInfo = appData.classes.find((cls) => cls.ClassName === className);
    return classInfo ? classInfo.ClassID : null;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        {/* Input field for first name */}
        <TextField
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          name="FirstName"
          value={editedStudent.FirstName}
          onChange={handleChange}
        />
        {/* Input field for last name */}
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          name="LastName"
          value={editedStudent.LastName}
          onChange={handleChange}
        />
        {/* Input field for date of birth */}
        <TextField
          margin="dense"
          label="Date of Birth"
          type="date"
          fullWidth
          name="DateOfBirth"
          value={editedStudent.DateOfBirth}
          onChange={handleChange}
          required
        />
        {/* Input field for gender */}
        <TextField
          margin="dense"
          label="Gender"
          type="text"
          fullWidth
          name="Gender"
          value={editedStudent.Gender}
          onChange={handleChange}
        />
        {/* Input field for fee amount */}
        <TextField
          margin="dense"
          label="Fee Amount"
          type="text"
          fullWidth
          name="FeeAmount"
          value={editedStudent.FeeAmount}
          onChange={handleChange}
        />
        {/* Input field for fee paid status */}
        <TextField
          margin="dense"
          label="Fee Paid"
          type="text"
          fullWidth
          name="FeePaid"
          value={editedStudent.FeePaid}
          onChange={handleChange}
        />
        {/* Dropdown select for class */}
        <FormControl fullWidth margin="dense">
          <InputLabel id="class-select-label">Class</InputLabel>
          <Select
            labelId="class-select-label"
            id="class-select"
            value={getClassName(editedStudent.ClassID)}
            onChange={(e) => handleChange({ target: { name: 'ClassID', value: getClassID(e.target.value) } })}
            label="Class"
          >
            {appData.classes.map((cls) => (
              <MenuItem key={cls.ClassID} value={cls.ClassName}>
                {cls.ClassName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentEditModal;
