import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

/**
 * FilterStudents Component
 * This component renders a dropdown filter for selecting the student filter option.
 * @param {string} filterOption - Currently selected filter option.
 * @param {function} handleFilterChange - Function to handle filter change event.
 */
const FeeDisabledStudentsFilter = ({ filterOption, handleFilterChange }) => {
    return(
        <FormControl fullWidth margin="dense" sx={{ minWidth: 150, maxWidth: 200 }}>
            <InputLabel id="filter-select-label">Filter Students</InputLabel>
            <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filterOption}
            onChange={handleFilterChange}
            label="Filter Students"
            >
            <MenuItem value="all">All Students</MenuItem>
            <MenuItem value="unpaid">Unpaid Fee Students</MenuItem>
            <MenuItem value="disabled">Disabled Students</MenuItem>
            </Select>
        </FormControl>
    );
}

export default FeeDisabledStudentsFilter;