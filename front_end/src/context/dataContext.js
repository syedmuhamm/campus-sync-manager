// src/DataContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create a context to manage the application data
const DataContext = createContext();

// DataProvider component manages the state and provides data to the components
export const DataProvider = ({ children }) => {
    // State to store the application data
    const [appData, setAppData] = useState({
        admins: [],
        students: [],
        teachers: [],
        classes: []
    });

    // Function to fetch data from the backend API
    const fetchData = async () => {
        try {
            // Get the authentication token from local storage
            const token = localStorage.getItem('auth-token');
            // Send a GET request to fetch data from the API
            const response = await axios.get('http://localhost:5000/allData', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update the state with the fetched data
            setAppData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to update an admin's information
    const updateAdmin = async (id, updatedAdmin) => {
        try {
            // Get the authentication token from local storage
            const token = localStorage.getItem('auth-token');
            // Send a PUT request to update the admin data
            const response = await axios.put(`http://localhost:5000/updateAdmin/${id}`, updatedAdmin, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Log the response data
            console.log('Update response:', response.data);
            // Update the state with the updated admin data
            setAppData((prevData) => ({
                ...prevData,
                admins: prevData.admins.map((admin) => 
                    admin.id === id ? response.data : admin
                )
            }));
        } catch (error) {
            console.error('Error updating admin:', error);
            console.log('Error details:', error.response);
        }
    };

    // Function to update a student's information
    const updateStudent = async (id, updatedStudent) => {
        try {
            // Get the authentication token from local storage
            const token = localStorage.getItem('auth-token');
            // Send a PUT request to update the student data
            const response = await axios.put(`http://localhost:5000/updateStudent/${id}`, updatedStudent, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update the state with the updated student data
            setAppData((prevData) => ({
                ...prevData,
                students: prevData.students.map((student) => 
                    student.id === id ? response.data : student
                )
            }));
        } catch (error) {
            console.error('Error updating student:', error);
            console.log('Error details:', error.response);
        }
    };

    // Provide the data and functions to the components using the DataContext
    return (
        <DataContext.Provider value={{ appData,setAppData, fetchData, updateAdmin, updateStudent }}>
            {children}
        </DataContext.Provider>
    );
};

// Custom hook to access the data and functions from the DataContext
export const useData = () => useContext(DataContext);
