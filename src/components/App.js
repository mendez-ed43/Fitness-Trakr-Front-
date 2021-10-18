
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './bootstrap.min.css';
import './style.css';

import {
    Navigation,
    CallApi,
    Homepage,
    Routines,
    Login,
    Register,
    Activities,
    Account,
    MyRoutines,
    SingleRoutine,
    ViewRoutine
} from './';


const {REACT_APP_BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api'} = process.env;

const App = () => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState('')
    const [password, setPassword ] = useState('');
    const [activities, setActivities] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [myRoutines, setMyRoutines] = useState([]);
    const [token, setToken] = useState('');

    console.log( "ReactUrl", `${REACT_APP_BASE_URL}`)

    const getMeUser = async () => {
        try {
            const resp = await fetch(`${REACT_APP_BASE_URL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const data = await resp.json();
            const {username} = data;
            const {userId} = data
            setUserId(userId);
            setUsername(username);
            return;
            
        } catch (error) {
            console.error(error)
        }
    }
    
    const fetchRoutines = async () => {
        try {
            const resp = await fetch (`${REACT_APP_BASE_URL}/routines`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await resp.json();
            if (data){
                setRoutines(data)
            }
            
        } catch (error) {
            throw error
        }
    }

    const fetchActivities = async () => {
        try {
            const resp = await fetch (`${REACT_APP_BASE_URL}/activities`,{
                headers: {
                    'Content-Type': 'application/json'
            }});
            const data = await resp.json();
            if (data){
                setActivities(data);
            }
            
        } catch (error) {
            throw error;
        }
    }
   useEffect(() => {
       try {
           fetchRoutines();
           fetchActivities();
           getMeUser();
           
       } catch (error) {
           console.error(error);
           
       }
   }, [token]);

    useEffect(() => {
        console.log('toen<<<<<<', token)
        const foundToken = localStorage.getItem('token');
        if(foundToken) {
          setToken(foundToken)
          setLoggedIn(true);
        }
      });
    return <>
        <div>
            <Navigation token={token} setToken= {setToken} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUsername = {setUsername} setPassword = {setPassword}/>
            <div>
                <Switch>
                    <Route exact path = "/home">
                        <Homepage />
                    </Route>

                    <Route exact path = "/account">
                        <Account token={token} username = {username}/>
                    </Route>

                    <Route exact path = "/user/routines">
                        <MyRoutines SingleRoutine = {SingleRoutine} token={token} username = {username} myRoutines = {myRoutines} setMyRoutines = {setMyRoutines} />
                    </Route>
                    
                    <Route exact path = "/login">
                        <Login setToken= {setToken} token={token} setUsername = {setUsername}
                        setPassword = {setPassword} username = {username} password = {password} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user} />
                    </Route>

                    <Route exact path = "/register">
                        <Register setToken= {setToken} token={token} setUsername = {setUsername}
                        setPassword = {setPassword} username = {username} password = {password} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user}/>
                    </Route>
                    
                    <Route exact path = "/routines">
                        <Routines routines={routines} setRoutines={setRoutines} token={token} fetchRoutines={fetchRoutines} user = {user} />
                    </Route>

                    <Route exact path = "/routines/:routineId">
                        <ViewRoutine token = {token} routines = {routines}/>
                    </Route>

                    <Route exact path = "/activities">
                        <Activities userId = {userId} loggedIn = {loggedIn} token ={token} fetchActivities = {fetchActivities} activities={activities} setActivities={setActivities} fetchActivities = {fetchActivities} />
                    </Route>

                
                </Switch>
            </div>
        </div>

    </>
}

export default App;