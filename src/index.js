import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import callApi from './CallApi';
import Homepage from './Homepage';
import Navigation from './Navigation';

const {REACT_APP_API_URL} = process.env;

const App = () => {
    const [username, setUsername] = useState();
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const [token, setToken] = useState([]);
    const [activities, setActivities] = useState();
    const [routines, setRoutines] = useState([]);

    const fetchRoutines = async () => {
        const respObj = await callApi({
            url: '/routines',
            token
        });
        const routinesData = await respObj.json();
        if(routinesData) { 
            setRoutines(routinesData)
        }
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
                    
                    <Route exact path = "/activities">
                        <Activities />
                    </Route>
                    
                    <Route exact path = "/routines">
                        <Routines routines={routines} setRoutines={setRoutines} token={token} fetchRoutines={fetchRoutines} />
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