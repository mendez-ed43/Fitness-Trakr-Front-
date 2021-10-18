import React, {useState}from 'react';
import { useParams, useHistory } from 'react-router';

import { SingleRoutine} from './';

const ViewRoutine = ({routines, token, user}) => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/user/routines')
    }


    const {routineId} = useParams();
    const [routine] = routines.filter(routine => routine.id === routineId);

    return <>
    <div className='singlepostview'>
        <SingleRoutine routine={routine} />
        
        <button className='backbutton' onClick={() =>
        handleClick()}>Back</button>

    
    
    </div>
    </>
}

export default ViewRoutine;