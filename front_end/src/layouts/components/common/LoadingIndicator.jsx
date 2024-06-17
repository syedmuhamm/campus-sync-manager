import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * LoadingIndicator Component
 * This component renders a circular loading indicator centered within a box.
 */
const LoadingIndicator = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <CircularProgress /> {/* Renders the circular loading indicator */}
  </Box>
);

export default LoadingIndicator;
