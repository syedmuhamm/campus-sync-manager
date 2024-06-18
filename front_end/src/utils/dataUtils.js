/**
 * Filters an array of student objects based on selected criteria.
 * @param {Array} students - Array of student objects to filter.
 * @param {string|number} selectedClass - ID of the selected class to filter by.
 * @param {string} filterOption - Option indicating the type of filter ('unpaid', 'disabled', 'all').
 * @returns {Array} - Filtered array of student objects.
 */
export const filterStudentsViaSelectedClass = (students, selectedClass, filterOption) => {
  return students.filter((student) => {
    switch (filterOption) {
      case 'unpaid':
        // Filter students who are unpaid and optionally by selected class
        return selectedClass ? student.ClassID === parseInt(selectedClass) && student.FeePaid === 'no' : student.FeePaid === 'no';

      case 'disabled':
        // Filter students who are disabled and optionally by selected class
        return student.Status.toLowerCase() === 'disabled' && (selectedClass ? student.ClassID === parseInt(selectedClass) : true);

      case 'all':
      default:
        // Filter students who are not disabled and optionally by selected class
        return !(student.Status.toLowerCase() === 'disabled') && (selectedClass ? student.ClassID === parseInt(selectedClass) : true);
    }
  });
};
