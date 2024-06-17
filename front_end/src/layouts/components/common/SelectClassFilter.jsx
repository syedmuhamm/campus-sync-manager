import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

/**
 * SelectClassFilter Component
 * This component renders a dropdown filter for selecting a class.
 * @param {string} selectedClass - Currently selected class ID.
 * @param {function} handleClassChange - Function to handle class change event.
 * @param {Array} classes - Array of class objects to populate the dropdown options.
 */
const SelectClassFilter = ({ selectedClass, handleClassChange, classes }) => (
  <FormControl variant="outlined" sx={{ minWidth: 80, maxWidth: 150 }}>
    {/* Box for styling the label */}
    <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginBottom: '5px' }}>
      <InputLabel id="class-select-label">Select Class</InputLabel>
    </Box>
    {/* Select dropdown for choosing a class */}
    <Select
      labelId="class-select-label"
      id="class-select"
      value={selectedClass}
      onChange={handleClassChange}
      label="Select Class"
      size="small"
    >
      {/* Default option for selecting all classes */}
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      {/* Mapping over classes array to render each class as a MenuItem */}
      {classes.map((cls) => (
        <MenuItem key={cls.ClassID} value={cls.ClassID} sx={{ textAlign: 'center' }}>
          {cls.ClassName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectClassFilter;
