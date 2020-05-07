import React from "react";
import axios from "axios";
import SuggestionRow from "./SuggestionRow";
import "./SidePanel.css";

class SuggestionPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchedSuggestion: false,
      suggestions: [],
    };
  }

  componentDidMount = () => {
    const that = this;
    const imgUrl = "../../img/userdata/";
    const loginUser = "sarojsh01";
    let tempSuggestions = [];
    axios
      .get("http://localhost:3001/suggestion?userid=" + loginUser)
      .then(function (response) {
        let follower = response.data[0].follower;
        let followed = response.data[1].followed;
        for (let i = 2; i < response.data.length; i++) {
          let suggestion = {
            userId: "",
            profilePhoto: "",
            isFollower: false,
            commonFollower: [],
          };
          suggestion.userId = response.data[i].userid;
          suggestion.profilePhoto = imgUrl + response.data[i].profilephoto;
          suggestion.isFollower =
            follower.indexOf(response.data[i].userid) === -1 ? false : true;
          for (let j = 0; j < response.data[i].follower.length; j++) {
            if (followed.indexOf(response.data[i].follower[j].userid) !== -1) {
              suggestion.commonFollower.push(
                response.data[i].follower[j].userid
              );
            }
          }
          if (suggestion.commonFollower.length > 0) {
            tempSuggestions.push(suggestion);
          }
        }
        that.setState(() => ({
          suggestions: tempSuggestions,
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
    const suggestions = this.state.suggestions;

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
