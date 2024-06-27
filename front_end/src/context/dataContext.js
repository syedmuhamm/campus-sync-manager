import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    admins: [],
    students: [],
    classes: [],
    class_sections: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get('http://localhost:8000/cms/all_data/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const currentAdminResponse = await axios.get('http://localhost:8000/cms/admins/current/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const currentAdmin = currentAdminResponse.data;

      const updatedAdmins = response.data.admins.map(admin => ({
        ...admin,
        isCurrentAdmin: admin.admin_id === currentAdmin.admin_id
      }));

      setAppData({
        ...response.data,
        admins: updatedAdmins
      });

      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('auth-token');
      } else {
        setError('Error fetching data');
      }
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  }, []);

  const updateData = async (url, id, updatedData, type) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await axios.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAppData((prevData) => ({
        ...prevData,
        [type]: prevData[type].map((item) => (item.id === id ? response.data : item))
      }));

      return response.data;
    } catch (error) {
      setError(`Error updating ${type.slice(0, -1)}: ${id}`);
      console.error(`Error updating ${type.slice(0, -1)}:`, error);
    }
  };

  const updateAdmin = async (id, updatedAdmin) => {
    return await updateData(`http://localhost:8000/cms/admins/${id}/`, id, updatedAdmin, 'admins');
  };

  const updateStudent = async (id, updatedStudent) => {
    return await updateData(`http://localhost:8000/cms/students/${id}/`, id, updatedStudent, 'students');
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [fetchData]);

  return (
    <DataContext.Provider value={{ appData, setAppData, isLoading, error, fetchData, updateAdmin, updateStudent }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
