import React from "react";
import axios from "axios";
import ResultRow from "./ResultRow";
import "./Search.css";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      clickSearch: false,
      dataFetched: true,
      value: "",
      results: [],
    };
  }

  handleClick = (e) => {
    document.getElementById("nav-search-input").focus();
    this.setState({ clickSearch: true });
  };

  handleBlur = () => {
    this.setState({ clickSearch: false });
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value, dataFetched: false });
    const self = this;
    const imgUrl = "../../img/userdata/";

    axios
      .get("http://localhost:3001/search?q=" + e.target.value, {
        timeout: 5000,
      })
      .then((response) => {
        const results = response.data.map((elem) => {
          let result = {
            userId: elem.userid,
            userName: elem.username,
            profilePhoto: imgUrl + elem.profilephoto,
          };
          return result;
        });
        self.setState({ results: results, dataFetched: true });
      })
      .catch(() => {
        self.setState({ results: [], dataFetched: true });
      });
  };

  renderResults = (data) => {
    const { results } = this.state;
    const resultRows = results.map((result, index) => {
      return <ResultRow key={index} result={result} />;
    });
    return resultRows;
  };

  render() {
    const { clickSearch, dataFetched } = this.state;

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
            {dataFetched ? (
              <div
                className="nav-search-clear-icon"
                role="button"
                tabIndex="0"
                onClick={this.handleBlur}
              ></div>
            ) : (
              <div className="nav-search-loader">
                <img alt={"loader"} src="../../img/loader.gif" />
              </div>
            )}

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
