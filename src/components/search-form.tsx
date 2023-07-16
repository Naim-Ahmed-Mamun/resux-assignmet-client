import React from "react";


const SearchForm = () => {
  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <form className="d-flex" onSubmit={handleSubmit}>
    <input
      className="form-control me-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
    <button className="btn btn-outline-success" type="submit">
      Search
    </button>
  </form>
  );
};

export default SearchForm;