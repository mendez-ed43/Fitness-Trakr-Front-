
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
const { REACT_APP_BASE_URL } = process.env;


const Account = ({ username, token }) => {


  return <>
    <h1> Your Account</h1>
    <div>
      {
        token ? <h3>
        You are logged in as {username} </h3> : 'Login, or create new account.'
        
        
      }

    </div>
    </>
};
 

export default Account;