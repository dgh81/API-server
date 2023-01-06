// https://www.youtube.com/watch?v=Kw5tC5nQMRY&ab_channel=TheCodingTrain

// Husk at starte app og db.json på forskellige porte...
const express = require('express');
const app = express();

const jsonServer = require('json-server');
// const JSONdatabase = require('./students.json');

const fs = require("fs");
const { json } = require('express');

app.set('view engine', 'ejs');
app.listen(3000, () => console.log("lytter på port 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded());

// Denne post API kører kun 1 gang når index loaded:
app.post('/api', (req, res) => {
 // Print til server konsol:
 console.log("I got a request!!"); 
 console.log("req", req.body);
 
 const data = req.body;

 // Denne bliver autoprintet i frontend-konsollen på siden /index: 
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
  jsonReader("./students.json", (err, jsonData) => {
  
  if (err) {
    console.log("error", err);
    return;
  };
  console.log("students.students[0].age",jsonData.students[0].age);
  console.log("antal", jsonData.students.length);
  console.log(jsonData);
 res.render('myapi', {studentsData: jsonData.students});

 });

});


app.get('/form', (req, res) => {
 res.render('form', {title: 'form'});
});

app.post('/formPost', (req, res) => {

 console.log("I got a request from /formPost!!"); 



 // Students er allerede parsed af Readeren. Students er et javascript objekt:
 jsonReader("./students.json", (err, students) => {
  
  if (err) {
    console.log(err);
    return;
  };

  // Tilgå variable/properties i javascript objektet:
  console.log("students.students[0].age",students.students[0].age);
  console.log("antal", students.students.length);

  // Sæt nyt ID til næste ID i rækken:
  let newID = students.students.length

  // Byg ny student:
  // Brug req.body hvis alle felter i form repræsenterer objektet der skal gemmes:
  const student = req.body;

  // Brug specifikke navngivne felter fra form, som repræsenterer objektet der skal gemmes:
  // Det er muligt at redigere, slette, tilføje felter her. Fx er ID beregnet her og ikke sat i et form-felt:
  const newStudent = {
   // id: student.id,
   id: newID,
   name: student.name,
   age: student.age
  };

  // Vis students objektet i frontend konsollen:
  res.json({
   students
  });
  
  // Tilføj newStudent til students:
  students['students'].push(newStudent);

  // Konverter javascript objekt tilbage til json string inden der skrives til json filen:
  let jsonStringStudents = JSON.stringify(students, null, 2);

  console.log("my jsonStringStudents:", jsonStringStudents);

  jsonWriter('./students.json', jsonStringStudents);

 });
});


 
 // --------------------------------FS READ / WRITE JSON ----------------------------
 //Læs fra json fil:
 function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    };
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    };
  });
 };
 // Skriv til json-fil:
 function jsonWriter(jsonFilepath, jsonString) {
 fs.writeFile(jsonFilepath, jsonString, err => {
  if (err) {
      console.log('Error writing file', err);
  } else {
      console.log('Successfully wrote file');
  };
 });
};
// ---------------------------------------------------------------------------------