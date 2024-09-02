import React from 'react';
import './SearchBar.css';

const SearchBar = ({searchTerm, setSearchTerm}) => {
  return (
    <div>
      <input
        className='input-search' 
        type="text"
        value={searchTerm}
        onChange={e=>setSearchTerm(e.target.value)}
        placeholder='Search widgets....'
      />
    </div>
  )
}

export default SearchBar