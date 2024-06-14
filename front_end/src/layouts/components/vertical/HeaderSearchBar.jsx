import React, { useState, useEffect, useCallback } from 'react'
import { TextField, Box, CircularProgress, List, ListItem, ListItemText, InputAdornment } from '@mui/material'
import { Magnify } from 'mdi-material-ui'
import { debounce } from 'lodash'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)

  // Simulated data fetch and filtering logic (replace with actual data fetching)
  const fetchData = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Mock data
    const data = {
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'David Brown' },
        { id: 4, name: 'Emily White' },
        { id: 5, name: 'Michael Johnson' },
      ]
    }
    return data
  }

  // Function to search for users based on searchTerm
  const searchData = useCallback(async (term) => {
    setLoading(true)
    const data = await fetchData()
    const lowerCaseTerm = term.toLowerCase()
    const results = data.users.filter(item => item.name.toLowerCase().includes(lowerCaseTerm))
    setLoading(false)
    return results
  }, [])

  // Debounced search function
  const debouncedSearch = useCallback(debounce(searchData, 300), [searchData])

  // Effect to handle search term changes and trigger search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      setSuggestionsOpen(false)
      return
    }

    debouncedSearch(searchTerm).then(results => {
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
    setSearchTerm(item.name)
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
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
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
                <ListItemText primary={result.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

export default SearchBar
