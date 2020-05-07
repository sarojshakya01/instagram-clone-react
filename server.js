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

mongocli.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, db) {
    if (err) throw err;
    console.log("Database Connected Successfully at " + uri);
  }
);

app.get("/", function (request, response) {
  response.sendfile("./public/index.html");
});

app.get("/post", function (request, response) {
  const id = request.query.id;
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
      let dbobj = db.db("Instagram");
      dbobj
        .collection("post")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          response.send(result);
          db.close;
        });
    }
  );
});

app.post("/user", function (request, response) {
  const id = request.query.userid;
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
          follower: 0,
          followed: 0,
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
  const id = request.query.userid;
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
      let dbobj = db.db("Instagram");
      dbobj
        .collection("user")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          let followed = [];
          if (result[0].followed.length > 0) {
            followed = result[0].followed.map((elem) => {
              return elem.userid;
            });

            let dbobj2 = db.db("Instagram");
            dbobj2
              .collection("user")
              .find({
                userid: { $in: followed },
              })
              .project({
                _id: 0,
                password: 0,
                email: 0,
                gender: 0,
                country: 0,
                createdate: 0,
                follower: 0,
                followed: 0,
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
  const id = request.query.userid;
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
      let dbobj = db.db("Instagram");
      dbobj
        .collection("user")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          let followed = result[0].followed.map((elem) => {
            return elem.userid;
          });

          let follower = result[0].follower.map((elem) => {
            return elem.userid;
          });

          if (id !== undefined) {
            followed.push(id);
          }

          let dbobj2 = db.db("Instagram");
          dbobj2
            .collection("user")
            .find({
              userid: { $nin: followed },
            })
            .project({
              _id: 0,
              password: 0,
              email: 0,
              gender: 0,
              country: 0,
              createdate: 0,
              followed: 0,
            })
            .toArray(function (err, result) {
              if (err) throw err;
              let suggestionResult = result;
              followed.pop();
              suggestionResult.unshift({ followed: followed });
              suggestionResult.unshift({ follower: follower });
              response.send(result);
            });

          db.close;
        });
    }
  );
});

function test() {
  query = { userid: "sarojsh01" };
  mongocli.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      let dbobj = db.db("Instagram");
      dbobj
        .collection("user")
        .find(query)
        .project({ _id: 0 })
        .toArray(function (err, result) {
          if (err) throw err;
          let followed = [];
          if (result[0].followed.length > 0) {
            followed = result[0].followed.map((elem) => {
              return elem.userid;
            });

            followed.push("sarojsh01");

            let dbobj2 = db.db("Instagram");
            dbobj2
              .collection("user")
              .find({
                userid: { $nin: followed },
              })
              .project({
                _id: 0,
                password: 0,
                email: 0,
                gender: 0,
                country: 0,
                createdate: 0,
                follower: 0,
              })
              .toArray(function (err, result) {
                if (err) throw err;
                // response.send(result);
                let suggestionResult = result;
                followed.pop();
                suggestionResult.unshift({ followed: followed });
                console.log(suggestionResult);
              });
          } else {
            response.send("[]");
          }
          db.close;
        });
    }
  );
}

// test();

const port = 3001;

app.listen(port, function () {
  console.log("Server Running at localhost:" + port);
});
