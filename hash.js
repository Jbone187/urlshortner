let Hashids = require('hashids');

let express = require('express');

let mysql = require('mysql');

let app = express();

let hashids = new Hashids();

let short = hashids.encode(1, 2, 3, 5)

let url = "http://localhost:3000/";

let url2 = "wpfLh9i0"


let con = mysql.createConnection({
    host: "192.151.151.76",
    user: "node_user",
    password: "Jasen2424!!",
    database: "node_url"
  });

  let query = 'SELECT * FROM String';

  let query2 = `insert into String(Link, Short) values('${url}', '${short}')`;

  let query3 = `SELECT Link, Short FROM String`;

 

/*
  con.query('SELECT * FROM String WHERE Link = ?',[url], function (error, results, fields) {

    console.log(results[0].Link);
   
  });
*/




//console.log(url);


app.get('/:id',function(req,res){

  //throw new Error("BROKEN");

 // res.send(req.params.id)

  /*
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
  

*/
console.log(req.params.id);

if(req.params.id === url2){

  res.redirect("https://google.com");

}else{

  res.send('Not Valid Url');

};




 });
 
 
 /*--------------------Routing Over----------------------------*/
 
 app.listen(3000,function(){
 
     console.log("Node is Running on Port 3000");
 
 });
 
