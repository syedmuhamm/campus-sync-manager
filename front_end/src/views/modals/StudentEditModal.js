import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const StudentEditModal = ({ student, open, handleClose, handleSave }) => {
  const [editedStudent, setEditedStudent] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    handleSave(editedStudent);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          name="FirstName"
          value={editedStudent.FirstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          name="LastName"
          value={editedStudent.LastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Age"
          type="number"
          fullWidth
          name="Age"
          value={editedStudent.Age}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Gender"
          type="text"
          fullWidth
          name="Gender"
          value={editedStudent.Gender}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Fee Amount"
          type="text"
          fullWidth
          name="FeeAmount"
          value={editedStudent.FeeAmount}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Fee Paid"
          type="text"
          fullWidth
          name="FeePaid"
          value={editedStudent.FeePaid}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Class ID"
          type="number"
          fullWidth
          name="ClassID"
          value={editedStudent.ClassID}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentEditModal;
