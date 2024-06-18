import React from 'react';
import { Box, Button } from '@mui/material';

/**
 * ModalFooter Component
 * This component renders the footer section of a modal with Cancel and Save buttons.
 * @param {function} handleSubmit - Function to handle form submission.
 * @param {function} handleClose - Function to handle modal closure.
 */
const ModalFooter = ({ handleSubmit, handleClose, isFormValid }) => (
  <Box display="flex" justifyContent="flex-end" mt={2}>
    {/* Cancel Button */}
    <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }}>
      Cancel
    </Button>
    {/* Save Button */}
    <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!isFormValid}>
      Save
    </Button>
  </Box>
);

export default ModalFooter;
