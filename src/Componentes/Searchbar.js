import React from 'react';
function SearchBar({value, onSearch}){

  function getSearch(idValue){
    value = idValue;
    return onSearch(value);
  }
    
  return (
    <form className="d-flex">
      <input 
        className="form-control" 
        type="search" 
        placeholder="Buscar" 
        aria-label="Search"
        id="idSearch"
        onChange={()=>{getSearch(document.getElementById('idSearch').value);}}></input>
    </form>
  );
}

export default SearchBar;