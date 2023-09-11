const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const request = require("request");
const { PORT } = require("./config.js");
const { API_KEY } = require("./config.js");
//call the enter point

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);
/////////////////////////////////////
app.get('/create-cat-list',(req, res) => {

const url="https://api.thecatapi.com/v1/images/search?limit=10&api_key=" +
API_KEY;

request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, res, data) => {
      if (err) {
        console.log("Error : ", err);
      } else if (res.statusCode !== 200) {
        console.log("Status", res.statusCode);
      } else {
        console.log(data)
        const newData = JSON.stringify(data);
        fs.writeFile("cat.json", newData, (err) => {
          if (err) throw err;
          console.log("sucess");   //??!!
        });
      }
    }
  );
  res.end("Success");
});
///////////////////////
app.get('/create-cat-breeds',(req, res) => {

  const url="https://api.thecatapi.com/v1/breeds";
  
  request.get(
      {
        url: url,
        json: true,
        headers: { "User-Agent": "request" },
      },
      (err, res, data) => {
        if (err) {
          console.log("Error : ", err);
        } else if (res.statusCode !== 200) {
          console.log("Status", res.statusCode);
        } else {
          console.log(data)
          const newData = JSON.stringify(data);
          fs.writeFile("catBreeds.json", newData, (err) => {
            if (err) throw err;
            console.log("sucess");   //??!!
          });
        }
      }
    );
    res.end("Success");
  });
  ///////////////////////

  app.get("/breed/:id", function (req, res) {
    const id = req.params.id;
  
    fs.readFile(
      __dirname + "/" + "catBreeds.json",
      "utf8",
      async function (err, data) {
        if (err) throw err;
        const result = await JSON.parse(data);
        const item = await result.breeds.find((item) => item.id == id);
        res.send(item);
      }
    );
  });
  
  //////////////////////////////////////////////////////////
  
  

let isInitialized = false;

function initialize() {
  // Do some initialization here
  const url =
    "https://api.thecatapi.com/v1/images/search?limit=10&api_key="+ API_KEY;
   

  //In very simple terms, this code is saying, "Hey, go ask this URL for some data. If there's an error or if there's a problem (status code not being 200), tell me. If everything is okay, let's save this data to a file."
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      const newData = JSON.stringify(data);
      fs.writeFile("cat.json", newData, (err) => {
        if (err) throw err;
        console.log("sucess");
      });
    });
}

////////////////////
app.use((req, res, next) => {
  if (!isInitialized) {
    // Check if the function has already been called
    initialize(); // Call the function if it hasn't been called yet
    isInitialized = true; // Set the flag variable to true
  }
  next();
});
////////////////////////////////////////////////////////////
app.get("/*", (req, res) => {
  console.log(req.url);

  // return;
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

///////////////////////////////////////////////////////////
app.listen(PORT || 4001, () => {
  console.log("Server running on port", PORT);
  //initialize()
});