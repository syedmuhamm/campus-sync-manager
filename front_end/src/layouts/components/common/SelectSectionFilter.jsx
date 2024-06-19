import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';

const SectionSelect = ({ selectedSection, handleSectionChange, filteredSections }) => {
  return (

    // Container box with left margin
    <Box sx={{ marginLeft: 2 }}>
      {/* Form control for section selection */}
      <FormControl fullWidth margin="dense" sx={{ minWidth: 150, maxWidth: 200 }}>
        {/* Input label for section selection */}
        <InputLabel>Select Section</InputLabel>
        {/* Select dropdown for section */}
        <Select value={selectedSection} onChange={handleSectionChange} label="Select Section">
          {/* Default option for no selection */}
          <MenuItem value=""><em>All Sections</em></MenuItem>
          {/* Map through filtered sections to create dropdown options */}
          {filteredSections.map((section) => (
            <MenuItem key={section.ClassSectionID} value={section.ClassSectionID}>{section.ClassSectionName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SectionSelect;
