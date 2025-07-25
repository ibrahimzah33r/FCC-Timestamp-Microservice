// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello bob'});
});

function isValidDate(date) {
  return !isNaN(new Date(date).getTime());
}

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let response = {};

  if (!date) {
    // No date provided, return current time
    const currentDate = new Date();
    response.unix = currentDate.getTime();
    response.utc = currentDate.toUTCString();
  } else {
    // If the date is a number = Unix
    let parsedDate;
    if (!isNaN(date)) {
      parsedDate = new Date(parseInt(date));
    } else {
      // Otherwise, try UTC
      parsedDate = new Date(date);
    }

    if (isValidDate(parsedDate)) {
      response.unix = parsedDate.getTime();
      response.utc = parsedDate.toUTCString();
    } else {
      response.error = "Invalid Date";
    }
  }

  res.json(response);
});

// Listen on port set in environment variable o@r default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
