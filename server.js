let bodyParser = require('body-parser');

let fs = require('fs');

let express = require('express');

let mysql = require('mysql');

let url = "http://localhost:3000/";

let app = express();


app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static('public'));

//Connection String
let con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
  });



//Post request to create short url and add to db

  app.post('/',function(req, res){

   let short = Math.random().toString(36).substr(2, 5)

    console.log(short);

    let answer = url + short;

//Creates Json file that has new url
    fs.writeFile("./public/data.json", JSON.stringify(answer), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("File has been created");
  });

    let query1 = `insert into String(Link, Short) values('${req.body.url}', '${short}')`;

    console.log(req.body.url);
    
    
    con.query(query1, function (err, result, fields) {
        if (err) throw err;
        console.log(result)
 
      });

    console.log(answer);
      res.send("Pass");  

    });
    

// Get request that allow created url to do redirct to url stored on db

    app.get('/:id',function(req, res){


        let query2 = 'SELECT* FROM String WHERE Short = ?';
      
      
        con.connect(function(error) {
          
        
          con.query(query2, [req.params.id], function (error, result, fields) {
      
            console.log(result);
      
            if (error) {
              // console.log("error ocurred",error);
              res.send({
                "code":400,
                "failed":"error ocurred"
              });
        };
        console.log(result.length);
      
        if(result.length > 0){
      
          if(req.params.id){
            console.log(result.length);
            console.log(result[0].Link);
      
            res.redirect(result[0].Link);
          
          };
      
        }else{
      
          res.send('Not Valid Url');
        };
      
        });
        
       });
      
      
      });


      /*--------------------Routing Over----------------------------*/
 
 app.listen(3000,function(){
 
    console.log("Node is Running on Port 3000");

});
