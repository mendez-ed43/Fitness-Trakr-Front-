import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
    Navigation,
    callApi,
    Homepage,
    Routines
} from './Components'

const {REACT_APP_BASE_URL} = process.env;

const App = () => {
    const [username, setUsername] = useState();
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const [token, setToken] = useState([]);
    const [activities, setActivities] = useState();
    const [routines, setRoutines] = useState([]);

    console.log( "ReactUrl", `${REACT_APP_BASE_URL}`)

    const fetchRoutines = async () => {
        const respObj = await callApi({
            url: '/routines',
            token
        });
        console.log("fetchroutines!!!!!!", respObj)
        // const routinesData = await respObj.json();
        // if(routinesData) { 
        //     setRoutines(routinesData)
        // }
    }
    useEffect(() => {
        fetchRoutines();
    }, [token])

    return <>
        <div>
            <Navigation username={username} token={token} setUsername = {setUsername} setToken= {setToken}/>
            <div>
                <Switch>
                    <Route exact path = "/home">
                        <Homepage />
                    </Route>

                    {/* <Route exact path = "/account">

                    </Route> */}
                    
                    {/* <Route exact path = "/activities">
                        <Activities />
                    </Route> */}
                    
                    <Route exact path = "/routines">
                        <Routines username = {username} routines={routines} setRoutines={setRoutines} token={token} fetchRoutines={fetchRoutines} />
                    </Route>
                
                </Switch>
            </div>
        </div>

    </>
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
  document.getElementById('app'),
);