// src/DataContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create the DataContext with createContext
const DataContext = createContext();

// DataProvider component that wraps around the app to provide data context
export const DataProvider = ({ children }) => {
  // State to hold the application data
  const [appData, setAppData] = useState({
    admins: [],
    students: [],
    teachers: [],
    classes: []
  });

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to manage errors
  const [error, setError] = useState(null);

  // Function to fetch data from the backend
  const fetchData = useCallback(async () => {
    try {
      // Retrieve the authentication token from local storage
      const token = localStorage.getItem('auth-token');
      
      // Fetch data from the backend using the token for authorization
      const response = await axios.get('http://localhost:5000/allData', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update the appData state with the fetched data
      setAppData(response.data);
      // Set loading state to false after data is fetched
      setIsLoading(false);
    } catch (error) {
      // Handle any errors that occur during the fetch
      setError('Error fetching data');
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  }, []);

  // Generic function to handle data updates for different entity types
  const updateData = async (url, id, updatedData, type) => {
    try {
      // Retrieve the authentication token from local storage
      const token = localStorage.getItem('auth-token');
      
      // Send a PUT request to the backend to update the data
      const response = await axios.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update the appData state with the updated entity
      setAppData((prevData) => ({
        ...prevData,
        [type]: prevData[type].map((item) => (item.id === id ? response.data : item))
      }));

      // Return the updated data
      return response.data;
    } catch (error) {
      // Handle any errors that occur during the update
      setError(`Error updating ${type.slice(0, -1)}: ${id}`);
      console.error(`Error updating ${type.slice(0, -1)}:`, error);
    }
  };

  // Function to update an admin
  const updateAdmin = async (id, updatedAdmin) => {
    return await updateData(`http://localhost:5000/updateAdmin/${id}`, id, updatedAdmin, 'admins');
  };

  // Function to update a student
  const updateStudent = async (id, updatedStudent) => {
    return await updateData(`http://localhost:5000/updateStudent/${id}`, id, updatedStudent, 'students');
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    // Provide the context values to the children components
    <DataContext.Provider value={{ appData, setAppData, isLoading, error, fetchData, updateAdmin, updateStudent }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = () => useContext(DataContext);
