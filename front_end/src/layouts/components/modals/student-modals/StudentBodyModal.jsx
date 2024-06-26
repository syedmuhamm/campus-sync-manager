import React, { useEffect, useState } from 'react';
import { Box, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { formatDate } from 'src/utils/dateUtils';
import { validateText, validateEmail, validatePhoneNumber, validateNumber, validateAddress, validateDate } from 'src/utils/validationUtils';
import { useData } from 'src/context/dataContext';

/**
 * StudentBodyModal Component
 * This component renders a form for editing student details within a modal.
 * @param {object} formData - The current form data for the student.
 * @param {function} handleChange - Function to handle form input changes.
 */
const StudentBodyModal = ({ formData, handleChange, setIsFormValid }) => {
  const { appData } = useData(); // Using context hook
  const [errors, setErrors] = useState({});

  const handleValidation = (name, value) => {
    let error = '';
    switch (name) {
      case 'FirstName':
      case 'LastName':
      case 'StudentFatherName':
        error = validateText(value, name);
        break;
      case 'StudentEmail':
        error = validateEmail(value);
        break;
      case 'StudentPhoneNumber':
      case 'StudentGuardianPhoneNumber':
        error = validatePhoneNumber(value);
        break;
      case 'FeeAmount':
        error = validateNumber(value, 'Fee Amount');
        break;
      case 'StudentAddress':
        error = validateAddress(value, 'Student Address');
        break;
      case 'DateOfBirth':
        error = validateDate(value, 'Student Date of Birth')
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleChange(event);
    handleValidation(name, value);
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsFormValid(!hasErrors);
  }, [errors, setIsFormValid]);

  const getClassName = (classID) => {
    const classInfo = appData.classes.find(cls => cls.ClassID === classID);

    return classInfo ? classInfo.ClassName : 'Unknown';
  };

  const getClassID = (className) => {
    const classInfo = appData.classes.find(cls => cls.ClassName === className);

    return classInfo ? classInfo.ClassID : null;
  };

  const getSectionName = (sectionID) => {
    const sectionInfo = appData.classSections.find(sec => sec.ClassSectionID === sectionID);

    return sectionInfo ? sectionInfo.ClassSectionName : 'Unknown';
  };

  const getSectionID = (sectionName) => {
    const sectionInfo = appData.classSections.find(sec => sec.ClassSectionName === sectionName);

    return sectionInfo ? sectionInfo.ClassSectionID : null;
  };

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
            onChange={handleInputChange}
            error={!!errors.FirstName}
            helperText={errors.FirstName}
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
            onChange={handleInputChange}
            error={!!errors.LastName}
            helperText={errors.LastName}
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
            onChange={handleInputChange}
            error={!!errors.StudentEmail}
            helperText={errors.StudentEmail}
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
            onChange={handleInputChange}
            error={!!errors.StudentPhoneNumber}
            helperText={errors.StudentPhoneNumber}
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
            onChange={handleInputChange}
            error={!!errors.DateOfBirth}
            helperText={errors.DateOfBirth}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              name="Gender"
              value={formData.Gender}
              onChange={handleInputChange}
              label="Gender"
              error={!!errors.Gender}
            >
              {['Male', 'Female', 'Other'].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {errors.Gender && <p style={{ color: 'red' }}>{errors.Gender}</p>}
          </FormControl>
        </Grid>

        {/* Student Guardian and Student Guardian Phone Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Student Guardian Name"
            type="text"
            fullWidth
            name="StudentFatherName"
            value={formData.StudentFatherName}
            onChange={handleInputChange}
            error={!!errors.StudentFatherName}
            helperText={errors.StudentFatherName}
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
            onChange={handleInputChange}
            error={!!errors.StudentGuardianPhoneNumber}
            helperText={errors.StudentGuardianPhoneNumber}
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
            onChange={handleInputChange}
            error={!!errors.FeeAmount}
            helperText={errors.FeeAmount}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="fee-paid-select-label">Fee Paid</InputLabel>
            <Select
              labelId="fee-paid-select-label"
              id="fee-paid-select"
              name="FeePaid"
              label="FeePaid"
              value={formData.FeePaid}
              onChange={handleInputChange}
              error={!!errors.FeePaid}
            >
              {['yes', 'no'].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {errors.FeePaid && <p>{errors.FeePaid}</p>}
          </FormControl>
        </Grid>

        {/* Student address */}
        <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            label="Student Address"
            type="text"
            fullWidth
            name="StudentAddress"
            value={formData.StudentAddress}
            onChange={handleInputChange}
            error={!!errors.StudentAddress}
            helperText={errors.StudentAddress}
          />
        </Grid>

        {/* Status */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              name="Status"
              label="Status"
              value={formData.Status}
              onChange={handleInputChange}
              error={!!errors.Status}
            >
              {['enabled', 'disabled'].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {errors.Status && <p>{errors.Status}</p>}
          </FormControl>
        </Grid>

        {/* Dropdown select for class */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="class-select-label">Class</InputLabel>
            <Select
              labelId="class-select-label"
              id="class-select"
              value={getClassName(formData.ClassID)}
              onChange={(e) => handleChange({ target: { name: 'ClassID', value: getClassID(e.target.value) } })}
              label="Class"
            >
              {appData.classes.map(cls => (
                <MenuItem key={cls.ClassID} value={cls.ClassName}>
                  {cls.ClassName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Dropdown select for section */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="section-select-label">Section</InputLabel>
            <Select
              labelId="section-select-label"
              id="section-select"
              value={getSectionName(formData.ClassSectionID)}
              onChange={(e) => handleChange({ target: { name: 'ClassSectionID', value: getSectionID(e.target.value) } })}
              label="Section"
            >
              {appData.classSections.map(sec => (
                <MenuItem key={sec.ClassSectionID} value={sec.ClassSectionName}>
                  {sec.ClassSectionName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentBodyModal;
