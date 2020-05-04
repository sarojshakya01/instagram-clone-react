const express = require("express");
const mongo = require("mongodb");
const cors = require("cors");
const app = express();

const router = express.Router();

const uri = "mongodb+srv://sarojsh:sarojsh@cluster0-jb3wc.gcp.mongodb.net/";

// const uri = "mongodb://127.0.0.1:27017/";

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
      var dbobj = db.db("Instagram");
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

app.get("/user", function (request, response) {
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
      var dbobj = db.db("Instagram");
      dbobj
        .collection("user")
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

const port = 3001;

app.listen(port, function () {
  console.log("Server Running at localhost:" + port);
});
