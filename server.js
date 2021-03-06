// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//this route is where challenge occurs.
//Check if given route parameter is a valid date string, either unix timestamp or (YYYY-MM-DD) format string.
//If date string is valid return unix and utc values of the string
//If empty return unix and utc values of NOW
//If date string is invalid return error
app.get("/api/timestamp/:date_string?", (req, res) => {
  let date = req.params.date_string;

  //if string is empty, assign current time to variable
  if (date == undefined) {
    date = new Date();
  }

  //check if string starts with "YYYY-". if true keep it as it is, if not convert to number
  const regex = /^....[-]/;
  date = regex.test(date) ? date : date * 1;

  if (new Date(date) == "Invalid Date") {
    console.log("here");
    res.json({ error: "Invalid Date" });
  } else {
    date = new Date(date);
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
