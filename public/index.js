async function postData() {
 // https://developer.mozilla.org/en-US/docs/web/api/fetch_API/using_fetch
 data = {
  name:'daniel',
  age: 41
 };
 
 const options = {
  method: 'POST',
  headers: {
     'Content-Type': 'application/json'
   },
  body: JSON.stringify(data)
 };
 
 // fetch('api');
 const res = await fetch('api', options);
 const dataResponse = await res.json();
 console.log(dataResponse);

};

postData().then();