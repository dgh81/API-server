// const api_url = "http://localhost:8000/students";

// async function getapi(url) {
    
//  const response = await fetch(url);
 
//  var data = await response.json();
//  console.log(data[0]);

//  let students = document.getElementById("students");
//  for (let i = 0; i < data.length; i++) {
//   students.innerHTML += `<p>${data[i].name}</p>`;
//  };

// };

// getapi(api_url).then();






// const fs = require("fs");
// console.log("test")
// function getDataForTable(){
//  jsonReader(".students.json", (err, students) => {
   
//   if (err) {
//     console.log(err);
//     return;
//   };

//   try {
//    console.log("students:", students);
//   } catch (error) {
//    console.log(error);
//   }

//  });
// };

// getDataForTable();

// function jsonReader(filePath, cb) {
//  fs.readFile(filePath, (err, fileData) => {
//    if (err) {
//      return cb && cb(err);
//    }
//    try {
//      const object = JSON.parse(fileData);
//      return cb && cb(null, object);
//    } catch (err) {
//      return cb && cb(err);
//    }
//  });
// };