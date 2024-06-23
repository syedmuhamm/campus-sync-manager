import React from 'react';
import { Box, CardMedia, Avatar, Typography, CardContent, AvatarGroup, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StudentInfoDialogBox = ({ user, onClose }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 500,
        // maxWidth: '90%',
        p: 0,
        borderRadius: 3,
        boxShadow: 24,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'white',
          zIndex: 1,
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' }
        }}
      >
        <CloseIcon />
      </IconButton>
      <CardMedia sx={{ height: '10rem' }} image='/images/cards/background-user.png' />
      <Avatar
        alt={user.FirstName}
        src='/images/avatars/1.png'
        sx={{
          width: 90,
          height: 90,
          left: '2rem',
          top: '11rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`,
        }}
      />
      <CardContent sx={{ mt: 10, pt: 0 }}>
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>{`${user.FirstName} ${user.LastName}`}</Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>{user.StudentAddress}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ px: 4 }}>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Gender:</strong> {user.Gender}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Date of Birth:</strong> {user.DateOfBirth}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Status:</strong> {user.Status}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Email:</strong> {user.StudentEmail}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Phone:</strong> {user.StudentPhoneNumber}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Guardian's Phone:</strong> {user.StudentGuardianPhoneNumber}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Father's Name:</strong> {user.StudentFatherName}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Fee Amount:</strong> {user.FeeAmount}</Typography>
          <Typography variant='body1' sx={{ mb: 1 }}><strong>Fee Paid:</strong> {user.FeePaid}</Typography>
        </Box>
      </CardContent>
    </Box>
  );
};

export default StudentInfoDialogBox;
