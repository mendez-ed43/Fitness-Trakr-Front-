import React from 'react';
import {Link} from 'react-router-dom';
import {SingleRoutine} from './';

const Routines = ({ routines, user, token }) => {
    console.log('<<<<<<<', routines)
    return <>
    {
        routines ? routines.map(routine => <SingleRoutine key = {routine.id} routine = {routine}>
            {
                    routine.creatorName === user && token ? <button onClick={() => 
                    handleDelete(routine.id) } className='delete_button'>DELETE</button> : null
                    }
        </SingleRoutine>)
        : 'Rendering...'
    }
    </>;
}
export default Routines;