import React from "react";
import "./Post.css";

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
            ></textarea>
            <button disabled={this.state.btnDisabled} type="submit">
              {"Post"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default AddComment;
