import React from "react";
import "./Post.css";

class AddComment extends React.Component {
  render() {
    return (
      <section className="add-comment">
        <div>
          <form>
            <textarea
              placeholder={"Add a comment…"}
              autoComplete="off"
              autoCorrect="off"
            ></textarea>
            <button disabled type="submit">
              {"Post"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default AddComment;
