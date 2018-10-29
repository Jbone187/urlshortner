let bodyParser = require("body-parser");

let validUrl = require("valid-url");

let fs = require("fs");

let express = require("express");

let mysql = require("mysql");

let url = "http://localhost:3000/";

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static("public"));

//Connection String
let con = mysql.createConnection({
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
      .substring(2, 30);

    //Makes url string
    let answer = url + short;
    //Sql query
    let query1 = `insert into String(Link, Short) values('${
      req.body.url
    }', '${short}')`;

    con.query(query1, function(err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
    //Json data send to client side
    res.json(answer);
  }
});

// Get request that allow created url to do redirct to url stored on db

app.get("/:id", function(req, res) {
  let query2 = "SELECT* FROM String WHERE Short = ?";

  con.connect(function(error) {
    con.query(query2, [req.params.id], function(error, result, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      }

      if (result.length > 0) {
        if (req.params.id) {
          res.redirect(result[0].Link);
        }
      } else {
        res.send("Not Valid Url");
      }
    });
  });
});

/*--------------------Routing Over----------------------------*/

app.listen(3000, function() {
  console.log("Node is Running on Port 3000");
});
