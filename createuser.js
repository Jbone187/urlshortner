//let Hashids = require('hashids');

let bodyParser = require('body-parser');

let express = require('express');

let mysql = require('mysql');

let app = express();

//let hashids = new Hashids();



let url = "http://localhost:3000/";

//let url2 = "wpfLh9i0"

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));



let con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
  });



  app.post('/',function(req, res){

   

    let short = Math.random().toString(36).substr(2, 5)

    console.log(short);


    let query2 = `insert into String(Link, Short) values('${req.body.url}', '${short}')`;

    console.log(req.body.url);
    
    
    con.query(query2, function (err, result, fields) {
        if (err) throw err;
        console.log(result)

        
      });

      res.send("Pass");

    });
    
