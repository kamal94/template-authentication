"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
let credentials = require("../credentials.json");
let bodyParser = require('body-parser');
let CLIENT_ID = credentials['client_id'];
const { OAuth2Client } = require('google-auth-library');
// Create a new express application instance
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
    res.send('Hello World! I can reload!');
});
app.post('/oauth/google/login/', function (req, res) {
    console.log('got a callback from my frontend');
    console.log(req.body);
    let token = req.body.googleUser.tokenId;
    const client = new OAuth2Client(CLIENT_ID);
    function verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            //const domain = payload['hd'];
        });
    }
    verify(token).catch(console.error);
});
app.get('/oauth/google/callback', function (req, res) {
    console.log("got a callback from google");
    console.log(req.body);
});
app.listen(4000, function () {
    console.log('Example app listgitening on port 4000!');
});
//# sourceMappingURL=index.js.map