import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import ModalHeader from '../ModalHeader';
import StudentBodyModal from './StudentBodyModal';
import ModalFooter from '../ModalFooter';

/**
 * StudentEditModal Component
 * Modal for editing student details.
 * @param {Object} student - The student object containing initial data.
 * @param {boolean} open - Boolean to control modal open state.
 * @param {function} handleClose - Function to handle modal close.
 * @param {function} handleSave - Function to handle saving updated student data.
 */
const StudentEditModal = ({ student, open, handleClose, handleSave }) => {
  // State to hold form data
  const [formData, setFormData] = useState({ ...student });
  const [isFormValid, setIsFormValid] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    handleSave(formData);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="edit-student-modal" aria-describedby="edit-student-form">
      <Box sx={{ ...modalStyle }}>
        {/* Modal Header */}
        <ModalHeader title="Edit Student" handleClose={handleClose} />
        {/* Modal Body with form fields */}
        <StudentBodyModal formData={formData} handleChange={handleChange} setIsFormValid={setIsFormValid} />
        {/* Modal Footer with save and cancel buttons */}
        <ModalFooter handleSubmit={handleSubmit} handleClose={handleClose} isFormValid={isFormValid} />
      </Box>
    </Modal>
  );
};

// Style for the modal box
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1
};

export default StudentEditModal;
