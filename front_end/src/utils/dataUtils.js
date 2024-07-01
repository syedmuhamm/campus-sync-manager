/**
 * Component for selecting a section within a class.
 * 
 * Props:
 * - selectedSection: Currently selected section ID.
 * - handleSectionChange: Function to handle section selection change.
 * - filteredSections: Array of sections to display in the dropdown.
 */
export const filterStudentsViaSelectedClassAndSection = (students, selectedClass, selectedSection, filterOption) => {
  return students.filter((student) => {
    // Check if the student's class matches the selectedClass filter
    const isClassMatch = selectedClass ? student.ClassID.ClassID === parseInt(selectedClass) : true;

    // Check if the student's section matches the selectedSection filter
    const isSectionMatch = selectedSection ? student.ClassSectionID.ClassSectionID === parseInt(selectedSection) : true;

    // Check if the student's fee payment status matches the filterOption 'unpaid'
    const isFeeMatch = filterOption === 'unpaid' ? student.FeePaid === 'no' : true;

    // Check if the student's status matches the filterOption 'disabled'
    const isStatusMatch = filterOption === 'disabled' ? student.Status.toLowerCase() === 'disabled' : student.Status.toLowerCase() !== 'disabled';

    // Return true only if all conditions match
    return isClassMatch && isSectionMatch && isFeeMatch && isStatusMatch;
  });
};