import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

/**
 * FeePaidSwitch Component
 * This component renders a switch control for indicating if a fee is paid or unpaid.
 *
 * Props:
 * - feePaid (string): Indicates if the fee is paid ('yes') or unpaid ('no').
 * - handleFeePaidClick (function): Function to handle click events on the switch control.
 */
const FeePaidSwitch = ({ feePaid, handleFeePaidClick }) => (
  <FormControlLabel
    control={
      <Switch
        checked={feePaid === 'yes'}  // Determines if the switch is checked based on feePaid prop
        onChange={handleFeePaidClick} // Handles click events on the switch
        color={feePaid === 'yes' ? 'success' : 'error'} // Changes color based on feePaid status
      />
    }
    label={feePaid === 'yes' ? 'Yes' : 'No'} // Displays 'Yes' or 'No' based on feePaid status
  />
);

export default FeePaidSwitch;
