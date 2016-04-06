var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require("fs");
var tfs = require("fs");
var timestamp = require('timestamp');
var sys = require('util');
var exec = require('child_process').exec;
var cnt = 0;
var parseXlsx = require('excel');
var excel = require('excel-stream');
var path = require("path");
var async = require('async');
var byline = require('byline');
var xlsx = require('node-xlsx');
var starttime=timestamp();
var asyncTasks = [];
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
app.listen(3000);
var Sam = mongoose.model('xlsxdbs', userSchema);
module.exports = Sam;
var starttime = timestamp();

var p = "xlsxs/";
task=[];
var filecnt=0;
filenamearr=[];
tfs.open('tempfile.txt', 'w', function(err, fd) {
   if (err) {
       return console.error(err);
   }     
});


fs.realpath(__dirname+'/xlsxs', function(err, path) {
    if (err) {
        console.log(err);
     return;
    }

});
var cnt=0;

k=0;
fs.readdir(__dirname+'/xlsxs', function(err, files) {
    if (err) return;

  // for(var l=7;l<=files.length;l=l+7)
          {
       //     console.log("l===="+l);
          for(var j=0;j<files.length;j++)
         {
          console.log("j===="+j)
            var y=files[j];
            // tfs.appendFile('tempfile.txt',y , function (err) {
            //   if (err) return console.log(err);
            
            // });
               y=__dirname+"/xlsxs/"+y;
                filenamearr.push(y);
               task.push(
                function(callback)
                {
                  console.log("i");
              
                     var obj = xlsx.parse(filenamearr[k]); // parses a file 
                     console.log(filenamearr[k]);
                     k++;
                     console.log("--------------------");
                     console.log(k);
                     console.log("--------------------");
                       for(var i=0;i<obj[0].data.length;i++)
                       {

                  var s= new Sam({
                       DOI:obj[0].data[i][0],
                      Fetch_Time:obj[0].data[i][1],
                      Triggered:obj[0].data[i][2],
                  });
               //   console.log(s+i);
                
                  s.save(function (err) {
                     if (err);// console.log(err);
           
                     
                      cnt++;
                     //  console.log(s);
                     //  console.log(cnt);
                     //  callback(cnt);
                   
                   })


                
                }

                
                callback()
                }
                );

                }
            async.series(task, function(){
              console.log("++++++++++++++++++++++++++++++++++++++");
            console.log("end"); 
                 endtime=timestamp();
              var t=endtime-starttime;              
              var tt=parseInt(t / 1000 / 60) + ":" + (t / 1000 % 60);
              console.log(tt);
            console.log("++++++++++++++++++++++++++++++++++++++");
      //console.log(task.toString());
      
           });

        } 

           
});














// var LineByLineReader = require('line-by-line'),
//     lr = new LineByLineReader('tempfile.txt');


// lr.on('error', function (err) {

// });

// lr.on('line', function (line) {
//   asyncTasks.push(function() {
 
  
//     {
//                       line='/xlsxs/'+line;
  
//                       var obj = xlsx.parse(__dirname + line); // parses a file 
//                      for(var i=0;i<obj[0].data.length;i++)
//                      {

//                 var s= new Sam({
//                      DOI:obj[0].data[i][0],
//                     Fetch_Time:obj[0].data[i][1],
//                     Triggered:obj[0].data[i][2],
//                 });

              
//                 s.save(function (err) {
//                    if (err) console.log(err);
         
                   
//                     cnt++;
//                      console.log(s);
//                      console.log(cnt);
                
                 
//                  })


//             cnt++;
//           console.log(cnt);
//         }
              
//         }
  

        
//         });

// });

// lr.on('end', function () {

//     async.parallel(asyncTasks, function(){
//  console.log("end");
// });
     
              
      
 
// });







app.get('/get', function(req, res) {

  res.send(cnt);
});
app.post('/post', function(req, res) {});
app.put('/put', function(req, res) {});

