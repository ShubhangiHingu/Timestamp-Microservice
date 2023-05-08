// const express = require('express');
// const app = express();
// var path = require('path');
// var port = process.env.PORT || 8080;


// //TimeStamp Function
// const getTimestamp = date => ({
//     unix: date.getTime(),
//     utc: date.toUTCString()
// });


// app.use('/assets', express.static('assets'));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/views/index.html'));
// });

// app.get('/api/timestamp',(req,res)=>{
//     let timestamp = getTimestamp(new Date());
//     res.end(JSON.stringify(timestamp));
// });

// app.get('/api/timestamp/:dateString',(req,res)=>{
//     const dateString = req.url.split("/api/timestamp/")[1];
//     if (dateString === undefined || dateString.trim() === "") {
//         timestamp = getTimestamp(new Date());
//     } else {
//         const date = !isNaN(dateString) ?
//             new Date(parseInt(dateString)) :
//             new Date(dateString);

//         if (!isNaN(date.getTime())) {
//             timestamp = getTimestamp(date);
//         } else {
//             timestamp = {
//                 error: "invalid date"
//             };
//         }
//     }

//     res.end(JSON.stringify(timestamp));
// });

// app.use((req,res,next)=>{
//     res.status(400);

//     if(req.accepts('html')){
//         res.sendFile(path.join(__dirname + '/views/404.html'));
//     }
// });


// app.listen(port, () => {
//     console.log("Server Up  → PORT " + port);
// });
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { application } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  const currentDate = new Date().toUTCString()
  const currentUnix = Date.parse(currentDate)
  res.json({ unix: currentUnix, utc: currentDate })
})

// Handle request with date-string
app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date
  const dateStringRegex = /^[0-9]+$/
  const numbersOnly = dateStringRegex.test(dateString)

  if (!numbersOnly) {
    const unixTimestamp = Date.parse(dateString)
    const utcDate = new Date(unixTimestamp).toUTCString()

    unixTimestamp
    ? res.json({ unix: unixTimestamp, utc: utcDate })
    : res.json({ error: "Invalid Date" })
  } 
  else {
    const unixTimestamp = parseInt(dateString)
    const actualDate = new Date(unixTimestamp)
    const utcDate = actualDate.toUTCString()
    res.json({ unix: unixTimestamp, utc: utcDate })
  }
})

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});