import React from "react";
import axios from "axios";
import Story from "./Story/Story";
import Post from "./Post/Post";
import "./Main.css";
/*
const postBy = "sarojsh01";
const postByPhoto = "../../img/1.jpg";
const photo = "../../img/post.jpg";
const caption = { captionBy: postBy, caption: "This is epic" };
const like = 1000;
const comments = [
  {
    commentBy: "pooja_singh",
    mention: "sarohsh01",
    comment: "😂",
  },
  {
    commentBy: "bsthapit",
    mention: "sarojsh01",
    comment: "lol 😂",
  },
  {
    commentBy: "revatov",
    mention: "sarojsh01",
    comment: "haha",
  },
];
const postTime = "2020-05-03T08:12:12.002Z";

const posts = [
  {
    postBy: postBy,
    postByPhoto: postByPhoto,
    photo: photo,
    caption: caption,
    like: like,
    comments: comments,
    postTime: postTime,
  },
  {
    postBy: postBy + "1",
    postByPhoto: postByPhoto,
    photo: photo,
    caption: caption,
    like: like,
    comments: comments,
    postTime: postTime,
  },
  {
    postBy: postBy + "2",
    postByPhoto: postByPhoto,
    photo: photo,
    caption: caption,
    like: like,
    comments: comments,
    postTime: postTime,
  },
];
*/
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      stories: [],
      fetchedStory: false,
    };
  }

  componentDidMount = () => {
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
      }));
    });

    let tempStories = [];
    axios.get("http://localhost:3001/user?").then(function (response) {
      tempStories = response.data.map((myStory) => {
        let story = {
          userId: "",
          profilePhoto: "",
        };
        story.userId = myStory.userid;
        story.profilePhoto = imgUrl + myStory.profilephoto;
        return story;
      });
      that.setState(() => ({
        stories: tempStories,
        fetchedStory: true,
      }));
    });
  };

  render() {
    return (
      <main role="main" className="dark-need">
        <section className="main-section">
          <Story
            fetched={this.state.fetchedStory}
            stories={this.state.stories}
          />
          <Post posts={this.state.posts} />
        </section>
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
