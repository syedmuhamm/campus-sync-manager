import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

/**
 * SelectClassFilter Component
 * This component renders a dropdown filter for selecting a class.
 * @param {string} selectedClass - Currently selected class ID.
 * @param {function} handleClassChange - Function to handle class change event.
 * @param {Array} classes - Array of class objects to populate the dropdown options.
 */
const SelectClassFilter = ({ selectedClass, handleClassChange, classes }) => (
  <FormControl fullWidth margin="dense" sx={{ minWidth: 150, maxWidth: 200 }}>
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
      {classes.map((cls) => (
        <MenuItem key={cls.ClassID} value={cls.ClassID}>
          {cls.ClassName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectClassFilter;
