import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { CLIENT_RENEG_WINDOW } from 'tls';
let credentials = require('../credentials.json');

const Authentication: React.FC = () => {
    function successCallback(googleUser: any) {
        console.log("user profile:")
        console.log(googleUser.profileObj);
        axios.post(
            'http://localhost:4000/oauth/google/login/', 
            {googleUser: googleUser},
            {headers: {'Content-Type': 'application/json'}}
            )
          .then(function (response) {
              console.log('response from backend:');              
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
        console.log('big object');
        console.log(googleUser);
    }

    function failureCallback(googleUser: any) {
        console.log("any:", googleUser);
    }
    let client_id = credentials['google_client_id']
    return (
        <GoogleLogin
            clientId={client_id}
            buttonText="Login"
            onSuccess={successCallback}
            onFailure={failureCallback}
            cookiePolicy={'single_host_origin'}
        />
    )
}
export default Authentication;