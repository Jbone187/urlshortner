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