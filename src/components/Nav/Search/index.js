import React from "react";
import axios from "axios";
import ResultRow from "./ResultRow";
import "./Search.css";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      clickSearch: false,
      value: "",
      results: [],
    };
  }

  handleClick = (e) => {
    this.setState({ clickSearch: true });
    e.currentTarget.click();
  };

  handleBlur = () => {
    this.setState({ clickSearch: false });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    const that = this;
    const imgUrl = "../../img/userdata/";
    axios
      .get("http://localhost:3001/search?q=" + e.target.value)
      .then((response) => {
        const results = response.data.map((elem) => {
          let result = {
            userId: elem.userid,
            userName: elem.username,
            profilePhoto: imgUrl + elem.profilephoto,
          };
          return result;
        });
        that.setState({ results: results });
      });
  };

  renderResults = (data) => {
    const results = this.state.results;
    const resultRows = results.map((result, index) => {
      return <ResultRow key={index} result={result} />;
    });
    return resultRows;
  };

  render() {
    const clickSearch = this.state.clickSearch;

    return (
      <div
        className="nav-search dark-off"
        onClick={this.handleClick}
        onBlur={this.handleBlur}
      >
        <input
          id="nav-search-input"
          className="nav-search-input"
          type="text"
          autoCapitalize="none"
          placeholder="Search"
          onChange={this.handleChange}
          value={this.state.value}
        />
        {clickSearch ? (
          <>
            <span className="nav-search-icon-left"></span>
            <div
              className="nav-search-clear-icon"
              role="button"
              tabIndex="0"
              onClick={this.handleBlur}
            ></div>
            {this.state.results.length > 0 ? (
              <div>
                <div className="search-result-arrow"></div>
                <div className="search-result-container">
                  <div className="search-result">{this.renderResults()}</div>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="nav-search-container" role="button" tabIndex="0">
              <div className="nav-search-container-inner">
                <span className="nav-search-icon"></span>
                <span className="nav-search-label">Search</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Search;
