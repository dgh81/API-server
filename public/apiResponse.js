const api_url = "http://localhost:8000/students";

async function getapi(url) {
    
 const response = await fetch(url);
 
 var data = await response.json();
 console.log(data[0]);

 let students = document.getElementById("students");
 for (let i = 0; i < data.length; i++) {
  students.innerHTML += `<p>${data[i].name}</p>`;
 };

};

getapi(api_url).then();