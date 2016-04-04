var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require("fs");
var timestamp = require('timestamp');
var sys = require('util');
var exec = require('child_process').exec;
var cnt = 0;
var parseXlsx = require('excel');
var excel = require('excel-stream');
var path = require("path");
var async = require('async');


mongoose.connect('mongodb://127.0.0.1:27017/manish', function(err, res) {
    if (err) console.log(err);
});
var userSchema = new Schema({
DOI:{
    type:String,
    unique:true
},
Fetch_Time:String,
Triggered:String
});
var b = [];
var app = require('express')();
app.listen(8080);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var Sam = mongoose.model('xlsxdbs', userSchema);
module.exports = Sam;
var starttime = timestamp();


var p = "xlsxs/";
var arr=[];
var task=[];

// fs.readdir(p, function (err, files) {
//     if (err) {
//         throw err;
//     }
//     files.map(function (file) {
//         return path.join(p, file);
//     }).filter(function (file) {
//         return fs.statSync(file).isFile();
//     }).forEach(function (file) {
//       //  console.log(file);
//        if(path.extname(file)=='.xlsx')
//          arr.push(file);
//     });
   
//     for(var i=0;i<arr.length;i++)
//     {


//         console.log(arr[i]);

//     }
   
// });

fs.realpath(__dirname+'/xlsxs', function(err, path) {
    if (err) {
        console.log(err);
     return;
    }
    console.log('Path is : ' + path);
});
var cnt=0;
fs.readdir(__dirname+'/xlsxs', function(err, files) {
    if (err) return;
    for(var i=0;i<files.length;i++)
    callofduty(files[i]);
    console.log("counter"+cnt);
});

console.log(arr);
function callofduty(solder){

         solder='xlsxs/'+solder;
          task.push(solder);
         fs.createReadStream(String(solder))
        .pipe(excel())
         .on('data',function saveinmongo(temp)
         {
    
          var s= new Sam({
               DOI:temp.DOI,
              Fetch_Time:temp['Fetch Time'],
              Triggered:temp.Triggered,
          });
          console.log(s);
          s.save(function (err,result) {
            if (err) return console.log(err);
            cnt++;
            console.log(result);
          })

         });
        console.log(solder);
     }
     

// function saveinmongo(temp)
// {

    
//     var s= new Sam({
//          DOI:temp.DOI,
//         Fetch_Time:temp['Fetch Time'],
//         Triggered:temp.Triggered,
//     });
//     console.log(s);
//     s.save(function (err,result) {
//       if (err) return console.log(err);
//       cnt++;
//       console.log(result);
//     })
// }


app.get('/get', function(req, res) {
    Sam.find({}, function(err, result) {
        res.send(result);
    });
});
app.post('/post', function(req, res) {});
app.put('/put', function(req, res) {});
/*User.update({"name":name},{$set: {"name":name,"mobile":mobile} },function(err, data){   
          if (err) return res.send(err);
          res.send(data);
          }); */