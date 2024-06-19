// src/utils/validationUtils.js

export const validateText = (value, fieldName) => {
    const textRegex = /^[a-zA-Z]+$/;
    if (!value || value.trim() === '') {
      return `${fieldName} is required`;
    } else if (!textRegex.test(value)) {
      return `${fieldName} can only contain letters`;
    }
    
    return '';
  };
  
  export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || value.trim() === '') {
      return 'Email is required';
    } else if (!emailRegex.test(value)) {
      return 'Invalid email address';
    }

    return '';
  };
  
  export const validatePhoneNumber = (value) => {
    const phoneRegex = /^[0-9+-]+$/;
    if (!value || value.trim() === '') {
      return 'Phone number is required';
    } else if (!phoneRegex.test(value)) {
      return 'Invalid phone number';
    }

    return '';
  };

export const validateNumber = (value, fieldName) => {
    if (!value || isNaN(value)) {
        return `${fieldName} must be a number`;
    }

    return '';
};

export const validateAddress = (value) => {
  const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;
  if (!value || value.trim() === '') {
    return 'Address is required';
  } else if (!addressRegex.test(value)) {
    return 'Invalid address';
  }

  return '';
};