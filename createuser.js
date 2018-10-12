let Hashids = require('hashids');

let bodyParser = require('body-parser');

let express = require('express');

let mysql = require('mysql');

let app = express();

let hashids = new Hashids();



let url = "http://localhost:3000/";

//let url2 = "wpfLh9i0"

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));



let con = mysql.createConnection({
    host: "192.151.151.76",
    user: "node_user",
    password: "Jasen2424!!",
    database: "node_url"
  });



  app.post('/',function(req, res){

    let num = Math.floor((Math.random() * 10) + 1);

    console.log(num);

    let short = hashids.encode(num, num, num)

    let query2 = `insert into String(Link, Short) values('${req.body.url}', '${short}')`;

    console.log(req.body.url);
    
    
    

    con.connect(function(err) {
      if (err) throw err;
      con.query(query2, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(url + short);
      });
    });
    
    });


 app.listen(3000,function(){
 
     console.log("Node is Running on Port 3000");
 
 });
 