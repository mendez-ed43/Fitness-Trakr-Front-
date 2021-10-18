

import React, {useState} from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'

const {REACT_APP_BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api'} = process.env;

const Register = ({setLoggedIn, setToken, setUsername, setPassword, username, password}) => {
    const[secondPassword, setSecondPassword] = useState('');
    const params = useParams();
    const history = useHistory();
    console.log('Before Submit: ' , `${params.method}` )

    const handleSubmit = async (ev) => {
      try {
        ev.preventDefault();
        console.log('object :>> ', { username, password} );
        const resp = await fetch(`${REACT_APP_BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        })
        const data = await resp.json();
        // console.log('<<><<< data', data);
        const { token, user } = data;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', user.username);
          setToken(token)
          setLoggedIn(true);
          setUsername('');
          setPassword('');
          history.push('/home');
        }
        
      } catch (error) {
        console.error(error)
      }
    }
    
    return <>
        <h1>
        | Register User |
        </h1>
        <form onSubmit = {handleSubmit} >
            <div >
              
                <input type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <hr></hr>
                <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <hr></hr>
                <input type="password" placeholder="password" value={secondPassword} onChange={(event) => setSecondPassword(event.target.value)}></input>
                <hr></hr>
                <button type="submit" disabled={!password || !username || password.length <8 || password !== secondPassword}>Submit</button>
                <hr></hr>
                {/* <span>New? Click here to <Link to = '/users/register'>register</Link> </span> */}
                {
                    password !== secondPassword && <span>Passwords do not match!</span>
                }
                {
                    password.length < 8 && <div>Password must be at least 8 characters!</div>
                }
            </div>
        </form>
    
    </>
}

export default Register;