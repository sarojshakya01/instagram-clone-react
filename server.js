const express = require("express");
const mongo = require("mongodb");
const cors = require("cors");
const app = express();

const router = express.Router();

// const uri = "mongodb+srv://sarojsh:sarojsh@cluster0-jb3wc.gcp.mongodb.net/";

const uri = "mongodb://127.0.0.1:27017/";

const mongocli = mongo.MongoClient;

app.use(express.static("public"));
app.use("/api", router);
app.use(cors());

function dbConnectionTest() {
  console.log("Database connection testing...");
  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;
      console.log("Database Connected Successfully at " + uri);
      db.close;
      console.log("Database connection closed!");
    }
  );
}

app.get("/", function (request, response) {
  response.sendfile("./public/index.html");
});

app.get("/post", function (request, response) {
  const id = request.query.postId;
  let query = {};
  if (id !== undefined && id.length > 0) {
    query = { id: id };
  }
  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;

      let dbobj = db.db("Instagram");
      dbobj
        .collection("post")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          result.unshift({ loginUser: "sarojsh01" });
          response.send(result);
          db.close;
        });
    }
  );
});

app.post("/user", function (request, response) {
  const id = request.query.userId;
  const pw = request.query.password;
  let query = {};
  if (id !== undefined && id.length > 0) {
    query = { userid: id, password: pw };
  }
  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;

      let dbobj = db.db("Instagram");
      dbobj
        .collection("user")
        .find(query)
        .project({
          _id: 0,
          password: 0,
          email: 0,
          gender: 0,
          country: 0,
          createdate: 0,
          followedby: 0,
          follows: 0,
          storydate: 0,
        })
        .toArray(function (err, result) {
          if (err) throw err;
          response.send(result);
          db.close;
        });
    }
  );
});

app.get("/search", function (request, response) {
  const q = request.query.q;

  if (q === undefined || q.length === 0) {
    response.send("[]");
    return;
  }

  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;
      let dbobj = db.db("Instagram");
      dbobj
        .collection("user")
        .find({ userid: { $regex: q } })
        .project({
          _id: 0,
          password: 0,
          email: 0,
          gender: 0,
          country: 0,
          createdate: 0,
          followedby: 0,
          follows: 0,
          storydate: 0,
        })
        .toArray(function (err, result) {
          if (err) throw err;
          response.send(result);
          db.close;
        });
    }
  );
});

app.get("/story", function (request, response) {
  const id = request.query.userId;
  let query = {};
  if (id !== undefined && id.length > 0) {
    query = { userid: id };
  }
  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;

      let dbobj = db.db("Instagram");
      dbobj
        .collection("user")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          let follows = [];
          if (result[0].follows.length > 0) {
            follows = result[0].follows.map((elem) => {
              return elem.userid;
            });

            let dbobj2 = db.db("Instagram");
            dbobj2
              .collection("user")
              .find({
                userid: { $in: follows },
              })
              .project({
                _id: 0,
                password: 0,
                email: 0,
                gender: 0,
                country: 0,
                createdate: 0,
                followedby: 0,
                follows: 0,
              })
              .toArray(function (err, result) {
                if (err) throw err;
                response.send(result);
              });
          } else {
            response.send("[]");
          }
          db.close;
        });
    }
  );
});

app.get("/suggestion", function (request, response) {
  const id = request.query.userId;
  let query = {};
  if (id !== undefined && id.length > 0) {
    query = { userid: id };
  }
  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;

      let dbobj = db.db("Instagram");
      dbobj
        .collection("user")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          let follows = result[0].follows.map((elem) => {
            return elem.userid;
          });

          let followedBy = result[0].followedby.map((elem) => {
            return elem.userid;
          });

          if (id !== undefined) {
            follows.push(id);
          }

          let dbobj2 = db.db("Instagram");
          dbobj2
            .collection("user")
            .find({
              userid: { $nin: follows },
            })
            .project({
              _id: 0,
              password: 0,
              email: 0,
              gender: 0,
              country: 0,
              createdate: 0,
              follows: 0,
              storydate: 0,
            })
            .toArray(function (err, result) {
              if (err) throw err;
              let suggestionResult = result;
              follows.pop();
              suggestionResult.unshift({ follows: follows });
              suggestionResult.unshift({ followedby: followedBy });
              response.send(result);
            });

          db.close;
        });
    }
  );
});

app.post("/likePost", function (request, response) {
  const id = parseInt(request.query.postId);
  const liked = request.query.liked === "true";
  const likedBy = "sarojsh01";

  let updateCondition;

  if (liked) {
    updateCondition = {
      $addToSet: { likes: likedBy },
    };
  } else {
    updateCondition = { $pull: { likes: likedBy } };
  }

  let query = {};
  if (id !== undefined && id > 0) {
    query = { postid: id };
  }

  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;

      let dbobj = db.db("Instagram");
      dbobj.collection("post").findOneAndUpdate(query, updateCondition);

      dbobj
        .collection("post")
        .find()
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          response.send("[]");
          db.close;
        });
    }
  );
});

app.post("/addComment", function (request, response) {
  const id = parseInt(request.query.postId);
  const newComment = {
    commentby: request.query.commentBy,
    mention: request.query.mention,
    comment: request.query.comment,
    likes: [],
  };

  if (newComment.commentby === "" || newComment.comment === "") {
    response.send("[]");
    return;
  }

  let query = {};
  if (id !== undefined && id > 0) {
    query = { postid: id };
  } else {
    response.send("[]");
    return;
  }

  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;

      let dbobj = db.db("Instagram");
      dbobj.collection("post").findOneAndUpdate(query, {
        $push: { comments: newComment },
      });

      dbobj
        .collection("post")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          response.send(result[0].comments);
          db.close;
        });
    }
  );
});

app.post("/likedComment", function (request, response) {
  const id = parseInt(request.query.postId);
  const commentId = parseInt(request.query.commentId);
  const likedBy = request.query.likedBy;
  const liked = request.query.liked === "true";

  const keyString = "comments." + commentId.toString() + ".likes";
  let updateCondition;

  if (liked) {
    updateCondition = {
      $addToSet: { [keyString]: likedBy },
    };
  } else {
    updateCondition = {
      $pull: { [keyString]: likedBy },
    };
  }

  let query = {};
  if (id !== undefined && id > 0) {
    query = { postid: id };
  } else {
    response.send("[]");
    return;
  }

  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;

      let dbobj = db.db("Instagram");
      dbobj.collection("post").findOneAndUpdate(query, updateCondition);

      dbobj
        .collection("post")
        .find(query)
        .project({ _id: 0 })
        .toArray((err, result) => {
          if (err) throw err;
          response.send(result[0].comments[commentId].likes);
          db.close;
        });
    }
  );
});

const port = 3001;

app.listen(port, function () {
  console.log("Server Running at localhost:" + port);
  dbConnectionTest();
});
