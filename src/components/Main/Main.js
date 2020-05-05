import React from "react";
import axios from "axios";
import Story from "./Story/Story";
import SidePanel from "./SidePanel/SidePanel";
import Post from "./Post/Post";
import "./Main.css";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      stories: [],
      suggestions: [],
      fetchedPost: false,
      fetchedStory: false,
      fetchedSuggestion: false,
      style: {
        left: "0px",
      },
    };
  }

  handleResize = () => {
    const element = document.getElementById("igpost-main");
    const leftPos = element.getBoundingClientRect().left + window.scrollX;

    const myStyle = {
      left: (leftPos + 642).toString() + "px",
    };
    this.setState(() => ({
      style: myStyle,
    }));
    this.props.updateTheme();
  };

  componentDidMount = () => {
    window.addEventListener("resize", this.handleResize);
    const element = document.getElementById("igpost-main");
    const leftPos = element.getBoundingClientRect().left + window.scrollX;

    const myStyle = {
      left: (leftPos + 642).toString() + "px",
    };

    this.setState(() => ({
      style: myStyle,
    }));

    let that = this;
    let tempPosts = [];
    const imgUrl = "../../img/userdata/";

    axios.get("http://localhost:3001/post?").then(function (response) {
      tempPosts = response.data.map((myPost) => {
        let post = {
          postBy: "",
          postByPhoto: "",
          photo: "",
          caption: { captionBy: "", caption: "" },
          like: 0,
          comments: [],
          postTime: "",
        };
        post.postBy = myPost.postby;
        post.postByPhoto = imgUrl + myPost.postbyphoto;
        post.photo = imgUrl + myPost.photo;
        post.caption.captionBy = myPost.postby;
        post.caption.caption = myPost.caption;
        post.like = myPost.like;
        post.postTime = myPost.posttime;

        post.comments = myPost.comments.map((cmnt) => {
          let tempComment = { commentBy: "", mention: "", comment: "" };
          tempComment.commentBy = cmnt.commentby;
          tempComment.mention = cmnt.mention;
          tempComment.comment = cmnt.comment;
          return tempComment;
        });
        return post;
      });
      that.setState(() => ({
        posts: tempPosts,
        fetchedPost: true,
      }));
    });

    let tempStories = [];
    const loginUser = "sarojsh01";
    axios
      .get("http://localhost:3001/story?userid=" + loginUser)
      .then(function (response) {
        tempStories = response.data.map((myStory) => {
          let story = {
            userId: "",
            profilePhoto: "",
            storyDate: "",
          };
          story.userId = myStory.userid;
          story.profilePhoto = imgUrl + myStory.profilephoto;
          story.storyDate = myStory.storydate;
          return story;
        });
        that.setState(() => ({
          stories: tempStories,
          fetchedStory: true,
        }));
      });

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

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleResize);
  };

  render() {
    return (
      <main role="main" className="dark-need">
        {window.innerWidth <= 1056 ? (
          <section className="main-section">
            <Story
              fetched={this.state.fetchedStory}
              stories={this.state.stories}
            />
            <Post
              fetchedPost={this.state.fetchedPost}
              posts={this.state.posts}
            />
          </section>
        ) : (
          <section className="main-section-2">
            <Post
              fetchedPost={this.state.fetchedPost}
              posts={this.state.posts}
            />
            <div className="post-story-gap"></div>
            <SidePanel
              style={this.state.style}
              fetchedStory={this.state.fetchedStory}
              fetchedSuggestion={this.state.fetchedSuggestion}
              profileInfo={this.props.profileInfo}
              stories={this.state.stories}
              suggestions={this.state.suggestions}
            />
          </section>
        )}

        <div>
          <form encType="multipart/form-data" method="POST" role="presentation">
            <input
              className="fileInput"
              accept="image/jpeg,image/png"
              type="file"
            />
          </form>
        </div>
      </main>
    );
  }
}

export default Main;
