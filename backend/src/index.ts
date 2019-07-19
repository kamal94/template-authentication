// lib/app.ts
import express = require('express');
let credentials = require("../credentials.json");
let bodyParser = require('body-parser')
let CLIENT_ID = credentials['client_id']
const {OAuth2Client} = require('google-auth-library');

// Create a new express application instance
const app: express.Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World! I can reload!');
});

app.post('/oauth/google/login/', function(req, res) {
  console.log('got a callback from my frontend');
  console.log(req.body);
  let token: string = req.body.googleUser.tokenId;

  const client = new OAuth2Client(CLIENT_ID);
  async function verify(token: string) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    console.log(payload);
    
  }
  verify(token).catch(console.error);
  console.log("verification worked!");
  


});

app.get('/oauth/google/callback', function (req, res) {
  console.log("got a callback from google");
  console.log(req.body);
});


app.listen(4000, function () {
  console.log('Example app listgitening on port 4000!');
});