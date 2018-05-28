const express = require('express');
const app = express();
const port_express = 1200;
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb',extended:true}));

var fs=require('fs');
//指向 public/takepicture.html
console.log(__dirname);
app.use(express.static(__dirname + '/public'));
//listen port
app.listen(port_express, function () {
  console.log('Example app listening on port ' + port_express + ' !');
});
//MongoDB
//URL, may change due to different server
const db_url = 'mongodb://uidd2018_groupH:71222217@luffy.ee.ncku.edu.tw/uidd2018_groupH';
const db_name = 'uidd2018_groupH';
const db_col = 'Messages';
//import mongodb
var MongoClient = require('mongodb').MongoClient;
//Test DB connection
app.post("/Kmessage", function (req, res) {
    //console.log("yes");
   // console.log(req.body.picture);
   
    
    MongoClient.connect(db_url, function (err, client) {
      const db = client.db(db_name);
      const col = db.collection('Messages');
      //console.log(req.body.picture);
      
      if (err) console.log(err);
      col.insertOne({
        
        message: req.body.text,
        picture:req.body.picture
    
      });
      client.close();
    });
    res.send("send success");
  });
  


