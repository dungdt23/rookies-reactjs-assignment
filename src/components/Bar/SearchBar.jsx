import React from 'react';
import { TextField, InputAdornment, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2%',mt: 2 }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: '100%', maxWidth: 600 }}
      />
    </Container>
  );
};

export default SearchBar;
