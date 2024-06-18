/**
 * Filters an array of student objects based on selected criteria.
 * @param {Array} students - Array of student objects to filter.
 * @param {string|number} selectedClass - ID of the selected class to filter by.
 * @param {string} filterOption - Option indicating the type of filter ('all', 'unpaid', 'disabled').
 * @param {string} status - Status of the students to filter by ('enabled' or 'disabled').
 * @returns {Array} - Filtered array of student objects.
 */
export const filterStudentsViaSelectedClass = (students, selectedClass, filterOption, status) => {
  return students.filter((student) => {
    // Check if selectedClass is defined and match student's ClassID
    const classMatch = selectedClass ? student.ClassID === parseInt(selectedClass) : true;

    // Match student's Status with provided status parameter
    const statusMatch = status ? student.Status.toLowerCase() === status.toLowerCase() : true;

    // Additional filter based on filterOption
    let filterMatch;
    switch (filterOption) {
      case 'unpaid':
        filterMatch = student.FeePaid === 'no';
        break;
      case 'disabled':
        filterMatch = student.Status.toLowerCase() !== 'disabled'; // Invert the condition to exclude 'disabled'
        break;
      case 'all':
      default:
        filterMatch = true;
    }

    // Return true if all conditions are met for this student, otherwise false
    return classMatch && statusMatch && filterMatch;
  });
};
