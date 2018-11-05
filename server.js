// If you haven't learned already, I would read this: https://wesbos.com/let-vs-const/
// Since you're declaring these once and not changing them, I suggest using const.
const bodyParser = require("body-parser");
const validUrl = require("valid-url");
const express = require("express");
const mysql = require("mysql");
const url = "http://localhost:3000/";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//Connection String
// It might be better to call this 'dbConnection' so other developers know it's for connecting to the database. Updated
const dbConnection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

//Post request to create short url and add to db
app.post("/", function(req, res) {
  //Validate url
  if (validUrl.isUri(req.body.url)) {
    //Generate random verbiage
    let short = Math.random()
      .toString(36)
      .substring(2, 7);

    //Makes url string
    let answer = url + short;
    //Sql query
    let query1 = `insert into String(Link, Short) values('${
      req.body.url
    }', '${short}')`;

    dbConnection.query(query1, function(err, result, fields) {
      if (err)
        // Maybe remove this console log? Updated
        throw err;
    });
    //Json data send to client side
    res.json(answer);
  }
});

// Get request that allow created url to do redirct to url stored on db
app.get("/:id", function(req, res) {
  let query2 = "select* from string where short = ?";

  dbConnection.connect(function(error) {
    dbConnection.query(query2, [req.params.id], function(
      error,
      result,
      fields
    ) {
      if (error) {
        res.send({
          code: 400,
          failed: "DB Error Ocurred"
        });
      }
      // Searches DB for results associated with query
      if (result.length > 0) {
        if (req.params.id) {
          res.redirect(result[0].Link);
        }
      } else {
        // What response code will this send back? Updated
        res.send({
          code: 500,
          failed: "DB Error Ocurred"
        });
      }
    });
  });
});

/*--------------------Routing Over----------------------------*/

app.listen(3000, function() {
  console.log("Node is Running on port 3000");
});
