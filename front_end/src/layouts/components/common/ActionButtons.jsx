import React from 'react';
import { Button } from '@mui/material';

/**
 * ActionButtons Component
 * This component renders "Edit" and "Delete" buttons with specific styles and event handlers.
 *
 * Props:
 * - handleEditClick (function): Function to handle the "Edit" button click event.
 * - handleDeleteClick (function): Function to handle the "Delete" button click event.
 */
const ActionButtons = ({ handleEditClick, handleDeleteClick }) => (
  <>
    {/* Edit Button */}
    <Button
      variant="contained"
      color="primary"
      onClick={handleEditClick}
      sx={{ minWidth: 70, fontSize: '0.75rem', color: 'white !important' }}
    >
      Edit
    </Button>

    {/* Delete Button */}
    <Button
      variant="contained"
      color="secondary"
      onClick={handleDeleteClick}
      sx={{ minWidth: 70, fontSize: '0.75rem', color: 'white !important', marginLeft: '8px' }}
    >
      Delete
    </Button>
  </>
);

export default ActionButtons;
