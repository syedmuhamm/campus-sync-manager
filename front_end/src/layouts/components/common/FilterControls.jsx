import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';

/**
 * FilterControls Component
 * This component renders filter controls for selecting classes and toggling unpaid fee students.
 *
 * Props:
 * - selectedClass (string): The currently selected class ID.
 * - handleClassChange (function): Function to handle class selection change.
 * - showUnpaid (boolean): Boolean state indicating whether to show unpaid fee students.
 * - setShowUnpaid (function): Function to toggle the showUnpaid state.
 * - classes (array): Array of classes to populate the select dropdown.
 */
const FilterControls = ({ selectedClass, handleClassChange, showUnpaid, setShowUnpaid, classes }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
      {/* Select Class Dropdown */}
      <FormControl variant="outlined" sx={{ minWidth: 80, maxWidth: 150 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginBottom: '5px' }}>
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
          {/* Default "All" Option */}
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {/* Dynamically rendered class options */}
          {classes.map((cls) => (
            <MenuItem key={cls.ClassID} value={cls.ClassID} sx={{ textAlign: 'center' }}>
              {cls.ClassName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Toggle Button for Unpaid Fee Students */}
      <Button
        variant="contained"
        color={showUnpaid ? 'secondary' : 'primary'}
        onClick={() => setShowUnpaid((prev) => !prev)}
        sx={{ minWidth: 150, maxWidth: 200, padding: '6px 16px', fontSize: '0.875rem' }}
      >
        {showUnpaid ? 'All Students' : 'Unpaid Fee Students'}
      </Button>
    </div>
  );
};

export default FilterControls;
