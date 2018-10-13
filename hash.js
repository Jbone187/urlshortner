//let Hashids = require('hashids');

let bodyParser = require('body-parser');

let fs = require('fs');

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

    let answer = url + "/" + short;

    fs.writeFile("./public/data.json", JSON.stringify(answer), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("File has been created");
  });

    let query2 = `insert into String(Link, Short) values('${req.body.url}', '${short}')`;

    console.log(req.body.url);
    
    
    con.query(query2, function (err, result, fields) {
        if (err) throw err;
        console.log(result)

        
      });
console.log(answer);
      res.send(answer);

      

    });
    
    


  //let query = 'SELECT * FROM String';

  //let query2 = `insert into String(Link, Short) values('${url}', '${short}')`;

 // let query4 = `insert into String(Link, Short) values('https://google.com', 'uoiu87')`

  //let query3 = `SELECT Link, Short FROM String`;

  /*

  con.connect(function(err) {
    if (err) throw err;
    con.query(query4, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
*/


  /*
  app.get('/',function(req,res){

    con.query('SELECT * FROM String', function (error, results, fields) {

      console.log(results[0].Short);
     
    });
  

  });

 */

/*
  con.query('SELECT * FROM String WHERE Link = ?',[url], function (error, results, fields) {

    console.log(results[0].Link);
   
  });
*/




//console.log(url);

/*
app.get('/:id',function(req, res){


  let query5 = 'SELECT* FROM String WHERE Short = ?';


  con.connect(function(error) {
    
  
    con.query(query5, [req.params.id], function (error, result, fields) {

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

*/












/*
app.get('/:id',function(req,res){

  //throw new Error("BROKEN");

 // res.send(req.params.id)

  
  con.connect(function(err) {
    if (err) throw err;

    
    con.query(query3, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);

      
      if(result[0].Link === url && result[0].Short === short ){
console.log(url + short);
      }else{
          console.log("Wrong Data");
      };


    });


  });
  


console.log(req.params.id);

if(req.params.id === url2){

  res.redirect("https://google.com");

}else{

  res.send('Not Valid Url');

};




 });
 */
 
 /*--------------------Routing Over----------------------------*/
 
 app.listen(3000,function(){
 
     console.log("Node is Running on Port 3000");
 
 });
 
