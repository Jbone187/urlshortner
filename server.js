let bodyParser = require("body-parser");
let validUrl = require("valid-url");
let express = require("express");
const mysql = require("mysql");
let url = "http://localhost:3000/";
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//Connection String
const connection = mysql.createConnection({
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

   connection.query(query1, function(err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
    //Json data send to client side
    res.json(answer);
  }
});

// Get request that allow created url to do redirct to url stored on db
app.get("/:id", function(req, res) {
  let query2 = "select* from string where short = ?";
  
  connection.connect(function(error) {
    connection.query(query2, [req.params.id], function(error, result, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      }
      // Searches DB for results associated with query 
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
