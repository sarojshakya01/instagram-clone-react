import React from "react";
import axios from "axios";
import SuggestionRow from "./SuggestionRow";

class SuggestionPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchedSuggestion: false,
      suggestions: [],
    };
  }

  componentDidMount = () => {
    const self = this;
    const imgUrl = "../../img/userdata/";
    const loginUser = "sarojsh01";
    let tempSuggestions = [];

    axios
      .get("http://localhost:3001/suggestion?userId=" + loginUser, {
        timeout: 5000,
      })
      .then((response) => {
        let followedBy = response.data[0].followedby;
        let follows = response.data[1].follows;
        for (let i = 2; i < response.data.length; i++) {
          let suggestion = {
            userId: response.data[i].userid,
            profilePhoto: imgUrl + response.data[i].profilephoto,
            isFollowedBy:
              followedBy.indexOf(response.data[i].userid) === -1 ? false : true,
            commonFollowedBy: [],
          };

          for (let j = 0; j < response.data[i].followedby.length; j++) {
            if (follows.indexOf(response.data[i].followedby[j].userid) !== -1) {
              suggestion.commonFollowedBy.push(
                response.data[i].followedby[j].userid
              );
            }
          }

          if (suggestion.commonFollowedBy.length > 0) {
            tempSuggestions.push(suggestion);
          }
        }

        self.setState(() => ({
          suggestions: tempSuggestions,
          fetchedSuggestion: true,
        }));
      })
      .catch((err) => {
        // handle error
        self.setState(() => ({
          fetchedSuggestion: true,
        }));
      });
  };

  componentDidUpdate = () => {
    if (this.props.darkTheme) {
      const container = document.getElementById("side-panel-suggestion");
      const elems = container.parentElement.getElementsByClassName("dark-off");

      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.add("dark");
      }
    } else {
      const elems = document.getElementsByClassName("dark-off");

      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove("dark");
      }
    }
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;

    const suggestionList = suggestions.slice(0, 3).map((suggestion, index) => {
      return (
        <SuggestionRow key={index} index={index} suggestion={suggestion} />
      );
    });
    return suggestionList;
  };

  render() {
    return (
      <div id="side-panel-suggestion" className="suggestion-container dark-off">
        <div className="suggestion-header">
          <div className="suggestion-header-label">
            <div className="suggestion-header-label-content">
              {"Suggestions For You"}
            </div>
          </div>
          <a className="suggestion-see-all" href="/explore/people/">
            <div className="suggestion-see-all-content">{"See All"}</div>
          </a>
        </div>
        <div className="suggestion-body-container">
          <div className="suggestion-body-outer dark-off">
            <div className="suggestion-body-inner">
              <div className="suggestion-body">
                {!this.state.fetchedSuggestion ? (
                  <div className="story-loader">
                    <img
                      alt="Loading..."
                      src="../../img/loader.gif"
                      height="32"
                      width="32"
                    />
                  </div>
                ) : (
                  this.renderSuggestions()
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestionPanel;
