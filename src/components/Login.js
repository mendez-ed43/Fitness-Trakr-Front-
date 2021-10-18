
import React, {useState, useEffect} from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'

const {REACT_APP_BASE_URL = 'http://fitnesstrac-kr.herokuapp.com/api'} = process.env;

const Login = ({setLoggedIn, setToken, setUsername, setPassword, username, password, setUser}) => {
    const params = useParams();
    const history = useHistory();
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (ev) => {
      try {
        ev.preventDefault();
        console.log('object :>> ', { username, password} );
        const resp = await fetch(`${REACT_APP_BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username, password})
        })
        const data = await resp.json();
        // console.log('<<><<< data', data);
        const { token } = data;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          setToken(token)
          setLoggedIn(true);
          setUsername('');
          setPassword('');
          setUser(
            {
              id:data.user.id,
              name:data.user.username
            }
          )
          history.push('/account');
        }
        
      } catch (error) {
        console.error(error)
      }
    }
    
    return <>
        <h1>
        | Login User |
        </h1>
        <form onSubmit = {handleSubmit} >
            <div class="input-group">
              
                <input type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <hr></hr>
                <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <hr></hr>
                <button type="submit" disabled={!password || !username} class="btn btn-primary">Submit</button>
                <hr></hr>
            </div>
            <div>New? Click here to <Link to = '/register'>register</Link> </div>
        </form>
    
    </>
}

export default Login;