/**
 * Formats a given date into 'YYYY-MM-DD' format.
 * @param {string|Date} date - Date to format, can be a string or Date object.
 * @returns {string} - Formatted date string in 'YYYY-MM-DD' format.
 */
export const formatDate = (date) => {
  // Create a new Date object from the provided date string or Date object
  const d = new Date(date);

  // Get month and pad with leading zero if necessary
  const month = String(d.getMonth() + 1).padStart(2, '0');

  // Get day and pad with leading zero if necessary
  const day = String(d.getDate()).padStart(2, '0');

  // Get full year
  const year = d.getFullYear();

  // Return formatted date string in 'YYYY-MM-DD' format
  return `${year}-${month}-${day}`;
};
