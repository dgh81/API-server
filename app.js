// https://www.youtube.com/watch?v=Kw5tC5nQMRY&ab_channel=TheCodingTrain

// Husk at starte app og db.json på forskellige porte...
const express = require('express');
const app = express();

const jsonServer = require('json-server');

const fs = require("fs");


app.set('view engine', 'ejs');
app.listen(3000, () => console.log("lytter på port 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/api', (req, res) => {
 
 console.log("I got a request!!"); 
 console.log("req", req.body);
 
 const data = req.body;

 res.json({
  status: "success",
  test: "test",
  name: data.name
 });

});

app.get('/', (req, res) => {
 res.render('index', {title: 'Forside'});
});

// let students = document.getElementById("students");

app.get('/myapi', (req, res) => {
 res.render('myapi', {title: 'myapi'});
});

// app.get('/students', (req, res) => {
//  res.render('students', {title: 'students'});
// });

//  app.get('/students', (req, res) => {

//   console.log("I sent a response!!");
//   // console.log(res.json(data));

//   // res.json(data);

 

// //  jsonReader("./db.json", (err, db) => {
// //    if (err) {
// //      console.log(err);
// //      return;
// //    };


// //    // students.innerHTML = "";
// //    for (let i = 0; i < db.students.length; i++) {
    
// //     // students.innerHTML = db.students[i].name;
// //     console.log(db.students[i].name);
// //    };

// //    // console.log(db.students[0].name);
   
// //  });

// //  res.render('myapi', {title: 'API'});

// });

// function jsonReader(filePath, cb) {
//  console.log("Reader is running");
//  fs.readFile(filePath, (err, fileData) => {
//   console.log(filePath);
//    if (err) {
//      return cb && cb(err);
//    }
//    try {
//     console.log(fileData);
//      const object = JSON.parse(fileData);
//      return cb && cb(null, object);
//    } catch (err) {
//      return cb && cb(err);
//    }
 // });
// };


