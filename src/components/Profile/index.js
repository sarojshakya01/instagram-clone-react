import React from "react";
import axios from "axios";
import "./Profile.css";

const settingIcon =
  "M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z";

const imgUrl = "../../img/userdata/";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: [],
    };
  }

  componentDidMount = () => {
    const self = this;
    const params = {
      userId: window.location.pathname.replace("/", "").replace("/", ""),
    };

    axios
      .get(
        "http://https://instagram2-saroj.herokuapp.com//userDetails",
        { params },
        { timeout: 5000 }
      )
      .then((response) => {
        if (response.data.length > 0) {
          const user = [
            {
              userId: response.data[0].userid,
              userName: response.data[0].username,
              profilePhoto: imgUrl + response.data[0].profilephoto,
              followedBy: response.data[0].followedby,
              follows: response.data[0].follows,
              bio: response.data[0].bio,
              posts: response.data[0].posts,
            },
          ];
          self.setState({
            userInfo: user,
          });
        }
      });
  };

  render() {
    // if (this.props.darkTheme) {
    //   const elems = document.getElementsByClassName("dark-off");

    //   for (let i = 0; i < elems.length; i++) {
    //     elems[i].classList.add("dark");
    //   }
    // } else {
    //   const elems = document.getElementsByClassName("dark-off");

    //   for (let i = 0; i < elems.length; i++) {
    //     elems[i].classList.remove("dark");
    //   }
    // }

    if (this.state.userInfo.length === 0) return null;

    const {
      userId,
      userName,
      profilePhoto,
      followedBy,
      follows,
      bio,
      posts,
    } = this.state.userInfo[0];

    // if (posts[0] && posts[0].photo[0])
    // posts[0].photo[0]
    return (
      <main id="my-profile" className="profile-page dark-off">
        <div className="profile-page-inner">
          <header>
            <div className="profile-photo">
              <div className="profile-photo-inner">
                <div className="profile-photo-content">
                  <button title={"Change Profile Pic"}>
                    <img alt={"Change Profile Pic"} src={profilePhoto} />
                  </button>
                </div>
              </div>
            </div>
            <section>
              <div className="profile-setting dark-off">
                <h2>{userId}</h2>
                <a href="/">
                  {/* <a href="/accounts/edit/"> */}
                  <button type="button">{"Edit Profile"}</button>
                </a>
                <div className="setting-icon">
                  <button type="button">
                    <svg
                      aria-label="Options"
                      fill="#262626"
                      height="24"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        clipRule="evenodd"
                        d={settingIcon}
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <ul>
                <li>
                  <span>
                    <span>{posts.length} </span>
                    {"posts"}
                  </span>
                </li>
                <li>
                  <a href="/">
                    {/* <a href="/sarojsh01/followers/"> */}
                    <span>{followedBy.length} </span>
                    {"followers"}
                  </a>
                </li>
                <li>
                  <a href="/">
                    {/* <a href="/sarojsh01/followers/"> */}
                    <span>{follows.length} </span>
                    {"following"}
                  </a>
                </li>
              </ul>
              <div className="intro">
                <h3>{userName}</h3>
                <br />
                <span>{bio.intro}</span>
                <a href="/">{bio.website}</a>
                {/* <a href="/website?q=">{bio.website}</a> */}
              </div>
            </section>
          </header>
          <div className="highlight"></div>
          <div className="menu">
            <a className="current" href="/">
              {/* <a className="current" href={`/${userId}/`}> */}
              posts
            </a>
            <a href="/">igtv</a>
            <a href="/">saved</a>
            <a href="/">tagged</a>
            {/* <a href={`/${userId}/channel`}>igtv</a>
            <a href={`/${userId}/saved`}>saved</a>
            <a href={`/${userId}/tagged`}>tagged</a> */}
          </div>
          <div className="content">
            <article>
              <div>
                <div className="row-container">
                  <div className="content-row">
                    {posts[0] ? (
                      <div className="photo" height="293" width="293">
                        <img
                          alt="post"
                          height="100%"
                          width="100%"
                          src={`${imgUrl}${posts[0].photo[0]}`}
                        />
                      </div>
                    ) : null}
                    <div className="photo" height="293" width="293">
                      <img
                        alt="post"
                        height="100%"
                        width="100%"
                        src="../../img/userdata/sarojsh01_photo2.jpg"
                      />
                    </div>
                    <div className="photo" height="293" width="293">
                      <img
                        alt="post"
                        height="100%"
                        width="100%"
                        src="../../img/userdata/sarojsh01_photo3.jpg"
                      />
                    </div>
                  </div>
                  <div className="content-row">
                    <div className="photo" height="293" width="293">
                      <img
                        alt="post"
                        height="100%"
                        width="100%"
                        src="../../img/userdata/rebatov_photo1.jpg"
                      />
                    </div>
                    <div className="photo" height="293" width="293">
                      <img
                        alt="post"
                        height="100%"
                        width="100%"
                        src="../../img/userdata/rebatov_photo2.jpg"
                      />
                    </div>
                    <div className="photo" height="293" width="293">
                      <img
                        alt="post"
                        height="100%"
                        width="100%"
                        src="../../img/userdata/bidhan.sthapit_photo1.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    );
  }
}

export default Profile;
