import React, { useState, useEffect, useCallback } from 'react'
import { TextField, Box, CircularProgress, List, ListItem, ListItemText, InputAdornment, Avatar } from '@mui/material'
import { Magnify } from 'mdi-material-ui'
import { debounce } from 'lodash'
import { useData } from 'src/context/dataContext'
import dayjs from 'dayjs'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const { appData} = useData();  // accessing data from dataContext.js


  // Function to search for users based on searchTerm
  const searchData = useCallback(async (term) => {
    setLoading(true)

    // const data = await fetchData()
    const lowerCaseTerm = term.toLowerCase()

    const results = appData.students.filter(
      student => 
          student.FirstName.toLowerCase().includes(lowerCaseTerm)
          || student.LastName.toLowerCase().includes(lowerCaseTerm)
          || student.StudentEmail.toLowerCase().includes(lowerCaseTerm)
          || student.StudentAddress.toLowerCase().includes(lowerCaseTerm));
    setLoading(false)

    return results
  }, [appData.students])

  // Debounced search function that returns a promise
  const debouncedSearch = useCallback(
    debounce((term, resolve) => {
      searchData(term).then(resolve)
    }, 300),
    [searchData]
  )

  // Effect to handle search term changes and trigger search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setSuggestionsOpen(false)

      return
    }

    new Promise(resolve => debouncedSearch(searchTerm, resolve)).then(results => {
      setSearchResults(results)
      setSuggestionsOpen(true)
    })

    // Clean up debounced function on component unmount
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchTerm, debouncedSearch])

  // Function to handle item click in suggestions
  const handleItemClick = (item) => {
    setSearchTerm(`${item.FirstName} ${item.LastName}`)
    setSearchResults([]) // Clear suggestions
    setSuggestionsOpen(false) // Hide suggestions
  }

  const handleFocus = () => {
    setSuggestionsOpen(true)
  }

  const handleBlur = () => {
    // Delay closing suggestions to allow click event to trigger
    setTimeout(() => {
      setSuggestionsOpen(false)
    }, 200)
  }

  const calculateAge = (dateOfBirth) => {
    const dob = dayjs(dateOfBirth);
    const now = dayjs();
    const age = now.diff(dob, 'year');

    return age;
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        size='small'
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder='Search users...'
        sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              
              // Adjust padding and font size for a larger text field
              padding: '0px 35px', 
              fontSize: '16px',
            },
            '& .MuiInputLabel-outlined': {
              fontSize: '16px',
            },
          }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Magnify fontSize='small' />
            </InputAdornment>
          ),
          endAdornment: (
            loading && (
              <InputAdornment position='end'>
                <CircularProgress size={20} />
              </InputAdornment>
            )
          )
        }}
      />
      {suggestionsOpen && searchResults.length > 0 && (
        <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, bgcolor: 'background.paper', boxShadow: 3, zIndex: 1, maxHeight: 300, overflow: 'auto' }}>
          <List>
            {searchResults.map((result, index) => (
               <ListItem key={index} button onClick={() => handleItemClick(result)}>
               <Avatar src="" alt="Student Image" sx={{ marginRight: 2 }} />
               <ListItemText 
                 primary={`${result.FirstName} ${result.LastName}`} 
                 secondary={`W/O ${result.StudentFatherName}, ${calculateAge(result.DateOfBirth)}, ${result.StudentAddress}`}
                 />
             </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default SearchBar
