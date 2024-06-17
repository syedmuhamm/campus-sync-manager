import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';

/**
 * ModalHeader Component
 * This component renders the header section of a modal with a title and close button.
 * @param {string} title - Title of the modal.
 * @param {function} handleClose - Function to handle modal closure.
 */
const ModalHeader = ({ title, handleClose }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    {/* Modal Title */}
    <Typography variant="h6" color="primary">{title}</Typography>
    {/* Close Button */}
    <IconButton onClick={handleClose}>
      x
    </IconButton>
  </Box>
);

export default ModalHeader;
