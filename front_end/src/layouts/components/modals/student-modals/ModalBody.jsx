import React from 'react';
import { Box, TextField, Grid } from '@mui/material';
import { formatDate } from 'src/utils/dateUtils';

/**
 * ModalBody Component
 * This component renders a form for editing student details within a modal.
 * @param {object} formData - The current form data for the student.
 * @param {function} handleChange - Function to handle form input changes.
 */
const ModalBody = ({ formData, handleChange }) => {
  // Format the date of birth for the input field
  const formattedDateOfBirth = formData.DateOfBirth ? formatDate(formData.DateOfBirth) : '';

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={2}>
        {/* First name and Last name */}
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
          />
        </Grid>

        {/* Email and Student Phone Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Student Email"
            type="text"
            fullWidth
            name="StudentEmail"
            value={formData.StudentEmail}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Student Phone Number"
            type="text"
            fullWidth
            name="StudentPhoneNumber"
            value={formData.StudentPhoneNumber}
            onChange={handleChange}
          />
        </Grid>

        {/* Date of Birth and Gender */}
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            name="DateOfBirth"
            value={formattedDateOfBirth}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Gender"
            type="text"
            fullWidth
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
          />
        </Grid>

        {/* Student Guardian and Student Guardian Phone Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Student Guardian"
            type="text"
            fullWidth
            name="StudentFatherName"
            value={formData.StudentFatherName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Student Guardian Phone Number"
            type="text"
            fullWidth
            name="StudentGuardianPhoneNumber"
            value={formData.StudentGuardianPhoneNumber}
            onChange={handleChange}
          />
        </Grid>

        {/* Fee Amount and Fee Paid */}
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Fee Amount"
            type="text"
            fullWidth
            name="FeeAmount"
            value={formData.FeeAmount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Fee Paid"
            type="text"
            fullWidth
            name="FeePaid"
            value={formData.FeePaid}
            onChange={handleChange}
          />
        </Grid>

        {/* Status */}
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            name="Status"
            value={formData.Status}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModalBody;
