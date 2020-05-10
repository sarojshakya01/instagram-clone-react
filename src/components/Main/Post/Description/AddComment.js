import React from "react";

const AddComment = (props) => {
  return (
    <section className="add-comment">
      <div>
        <form>
          {!props.dataFetched ? (
            <div className="add-comment-loader">
              <img alt={"Loader"} src="../../img/loader.gif" />
            </div>
          ) : null}

          <textarea
            placeholder={"Add a comment…"}
            autoComplete="off"
            autoCorrect="off"
            onChange={props.handleChange}
            value={props.value}
            onKeyDown={props.handlePostComment}
            disabled={!props.dataFetched}
          ></textarea>
          <button
            disabled={props.value === "" || !props.dataFetched ? true : false}
            type="button"
            onClick={props.handlePostCommentBtn}
          >
            {"Post"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddComment;
