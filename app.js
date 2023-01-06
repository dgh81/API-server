

// ------------------------ Setup ------------------------ //
// (Express er middleware - Middleware er ret tydeligt i get og post funktionerne.
//  (req, res) - ("forespørgsel" vs "svar") - ("client" vs "server")... det er tydeligt af get og post at
//  app.get og app.post er hvad der sker mellem server og client)...
const express = require('express');
const app = express();
const fs = require("fs");
app.set('view engine', 'ejs');
app.listen(3000, () => console.log("lytter på port 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded());
// -------------------------------------------------------- //




// ----------------------- Routing ------------------------ //
app.get('/', (req, res) => {
 res.render('index', {title: 'Forside'});
});

app.get('/deleteStudent', (req, res) => {
 res.render('deleteStudent', {title: 'Slet Student'});
});

app.post('/deleteStudentStatus', (req, res) => {
 let id = req.body.id;

 jsonReader("./students.json", (err, jsonData) => {
  
  if (err) {
    console.log("error", err);
    return;
  };

 for (let i = 0; i < jsonData.students.length; i++) {
  if (jsonData.students[i].id == id) {
   jsonData.students.splice(i,1);
   break;
  };
 };

 let jsonStringStudents = JSON.stringify(jsonData, null, 2);
 console.log("jsonStringStudents", jsonStringStudents);
 jsonWriter('./students.json', jsonStringStudents);

 res.render('deleteStudentStatus', {title: 'Status', status: "Student successfully deleted"});

 });
});

app.get('/showAllStudents', (req, res) => {
  jsonReader("./students.json", (err, jsonData) => {
  
  if (err) {
    console.log("error", err);
    return;
  };
  // console.log("students.students[0].age",jsonData.students[0].age);
 res.render('showAllStudents', {studentsData: jsonData.students, title: 'Vis Alle'});
 });
});

app.get('/createStudent', (req, res) => {
 res.render('createStudent', {title: 'Create Student'});
});

app.get('/getStudent', (req, res) => {
 res.render('getStudent', {title: 'Find Student'});
});

app.post('/showStudent', (req, res) => {
 console.log("ID:", req.body.id);
 jsonReader("./students.json", (err, jsonData) => {
  
  if (err) {
    console.log("error", err);
    return;
  };

  jsonData.students.forEach(student => {
   if (student.id == req.body.id) {
    console.log(student);
    res.render('showStudent', {foundStudent: student, title: 'Vis Student'});
   }
  });

 });
});

app.post('/createStudentStatus', (req, res) => {
 if (req.body.firstname != "" && req.body.age != "" && req.body.id != "") {
  res.render('createStudentStatus', {studentStatus: 'succes!', title: 'Status'});
  // Students er allerede parsed af Readeren. Students er et javascript objekt:
  jsonReader("./students.json", (err, students) => {
   // TODO: Er det her nødvendigt?:
   if (err) {
    console.log("error", err);
    return;
   };

   const student = req.body;
   // Brug specifikke navngivne felter fra form, som repræsenterer objektet der skal gemmes:
   const newStudent = {
    id: student.id,
    age: student.age,
    names: [{firstname: student.firstname, middlename: student.middlename, surname: student.surname}]
   };
   // Tilføj newStudent til students:
   students['students'].push(newStudent);
   // Konverter javascript objekt tilbage til json string inden der skrives til json filen:
   let jsonStringStudents = JSON.stringify(students, null, 2);
   jsonWriter('./students.json', jsonStringStudents);
  });

 } else {
 res.render('createStudentStatus', {studentStatus: 'failed!', title: 'Status'});
}

});
// -------------------------------------------------------- //
 


// ---------------- FS READ / WRITE JSON ------------------ //
 //Læs fra json fil (cb = callback
 //i det her tilfælde er cb en (err og et object)
 //jsonReader("./students.json", (err, students) => {"
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
// -------------------------------------------------------- //