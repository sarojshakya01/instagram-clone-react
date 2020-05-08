import React from "react";

class AddComment extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      btnDisabled: true,
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value, btnDisabled: false });
  };

  postComment = (value, postId) => {
    this.setState({
      value: "",
    });

    if (value !== "") {
      this.props.handlePostComment(value, postId);
    }
  };

  handlePostComment = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = e.target.value;
      const postId = parseInt(e.currentTarget.closest("article").id);
      this.postComment(value, postId);
    }
  };

  handlePostCommentBtn = (e) => {
    const textareaElem = e.currentTarget.parentElement.elements[0];
    const value = textareaElem.value;
    const postId = parseInt(textareaElem.closest("article").id);
    this.postComment(value, postId);
  };

  render() {
    return (
      <section className="add-comment">
        <div>
          <form>
            <textarea
              placeholder={"Add a comment…"}
              autoComplete="off"
              autoCorrect="off"
              onChange={this.handleChange}
              value={this.state.value}
              onKeyDown={this.handlePostComment}
            ></textarea>
            <button
              disabled={this.state.btnDisabled}
              type="button"
              onClick={this.handlePostCommentBtn}
            >
              {"Post"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default AddComment;
