import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { callApi } from './Components';

import {SingleRoutine} from './Components' 
const { REACT_APP_BASE_URL } = process.env;

const Routines = ({ routines, setRoutines, token, fetchRoutines, username }) => {

    const handleDelete = async (routineId) => {
        console.log('url: ', `routines/${routineId}`);
        
        const respObj = await callApi({
            method: 'DELETE',
            url: `/routines/${routineId}`,
            token
        });
        console.log('respObj: ', respObj);
        await fetchRoutines();
    }
    
    return <>
    <div>
        <nav>
            {/* <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} posts={posts} />
            <SearchBar /> */}
        </nav>
            {
                
                routines.map (routine => <SingleRoutine key = {routine.id} routine={routine} token={token} username = {username}>
                    
                    {/* <Link to = {`/routines/${routine.id}`} >Details</Link> */}
                    {/* {
                    token && username && routine.creatorName && <button onClick={() => 
                    handleDelete(routine.id) } >DELETE</button>
                    } */}
                    </SingleRoutine>)
            }
    </div>     
    </>

}

export default Routines;