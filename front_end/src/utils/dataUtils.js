/**
 * Filters an array of student objects based on selected criteria.
 * @param {Array} students - Array of student objects to filter.
 * @param {string|number} selectedClass - ID of the selected class to filter by.
 * @param {boolean} showUnpaid - Flag indicating whether to filter unpaid students.
 * @param {string} status - Status of the students to filter by ('Enabled' or 'Disabled').
 * @returns {Array} - Filtered array of student objects.
 */
export const filterStudents = (students, selectedClass, showUnpaid, status) => {
  // Filter the students array based on the following criteria
  return students.filter((student) => {
    // Check if selectedClass is defined and match student's ClassID
    const classMatch = selectedClass ? student.ClassID === parseInt(selectedClass) : true;

    // Check if showUnpaid is true and match student's FeePaid status
    const feeMatch = showUnpaid ? student.FeePaid === 'no' : true;

    // Match student's Status with provided status parameter
    const statusMatch = student.Status === status;

    // Return true if all conditions are met for this student, otherwise false
    return classMatch && feeMatch && statusMatch;
  });
};
