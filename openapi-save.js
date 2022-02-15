var fs = require('fs');
var http = require('http'); // or 'https' for https:// URLs

function saveUrl(fileName,url){
  console.log("Saving "+url+" OpenApi's json to : "+fileName);

  const file = fs.createWriteStream(fileName);
  const request = http.get(url, function(response) {
    response.pipe(file);
  });

  console.log("Successfully saved: "+fileName);
}

saveUrl("efo-openapi.json","http://localhost:8080/v3/api-docs");

