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
  name: data.name,
  age: data.age
 });

});

app.get('/', (req, res) => {
 res.render('index', {title: 'Forside'});
});

app.get('/myapi', (req, res) => {
 res.render('myapi', {title: 'myapi'});
});

//Læs direkte fra db.json:

jsonReader("./db.json", (err, students) => {
 if (err) {
   console.log(err);
   return;
 };
 console.log("test");
 console.log(students);
});

function jsonReader(filePath, cb) {
 fs.readFile(filePath, (err, fileData) => {
   if (err) {
     return cb && cb(err);
   }
   try {
     const object = JSON.parse(fileData);
     return cb && cb(null, object);
   } catch (err) {
     return cb && cb(err);
   }
 });
};