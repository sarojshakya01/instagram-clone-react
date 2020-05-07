import React from "react";
import "./Nav.css";

class Search extends React.Component {
  render() {
    return (
      <div className="nav-search">
        <input
          id="nav-search-input"
          className="nav-search-input"
          type="text"
          autoCapitalize="none"
          placeholder="Search"
        />
        <div
          className="nav-search-container dark-off"
          role="button"
          tabIndex="0"
        >
          <div className="nav-search-container-inner">
            <span className="nav-search-container-icon"></span>
            <span className="nav-search-container-search">Search</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
