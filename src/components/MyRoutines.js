
import React, {useState, useEffect} from 'react';
import { Link} from "react-router-dom";

import { SingleRoutine } from './'
const { REACT_APP_BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api' } = process.env;

const MyRoutines = ({username, token, setMyRoutines, myRoutines}) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false)

    const fetchMyRoutines = async () => {
        
        try {
            if(username) {
                const resp = await fetch (`${REACT_APP_BASE_URL}/users/${username}/routines`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                console.log("<<<<", resp)
                const data = await resp.json();
                if (data) {
                    setMyRoutines(data);
                } else {
                    setMyRoutines([]);
                }
            }
            return
            
        } catch (error) {
            console.error(error)
        };
    };

    // const updateRoutine = async (name, goal, routineId) => {
    //     const field = {};
    //     const updateName = prompt('Name: ', name);
    //     const updateGoal = prompt('Goal: ', goal);
    //     if(updateName) {
    //         fields.name = updateName;
    //     }
    //     if(updateGoal) {
    //         fields.goal = updateGoal;
    //     }
    //     try {
    //         const resp = await fetch (`${REACT_APP_BASE_URL}/routines/${routineId}`, {
    //             method: "PATCH",
    //             header: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(fields)
    //         })
            
    //     } catch (error) {
    //         console.error(error)
    //         alert(error)
    //     }
    // }

    const handleDelete = async (routineId) => {
        try {
            await fetch(`${REACT_APP_BASE_URL}/routines/${routineId}`, {
               method: 'DELETE',
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
               }
            })
            await fetchMyRoutines();
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const resp = await fetch(`${REACT_APP_BASE_URL}/routines`, {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
               }, body: JSON.stringify ({name, goal, isPublic})
            })
            const data = await resp.json();
            if(data) {
                setName('');
                setGoal('');
                setIsPublic(false);
                await fetchMyRoutines();
            }
            return;
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        try {
            fetchMyRoutines();
        } catch (error) {
            console.error(error)
        }
    }, [])

    return <>
    <div>
        <h3>Create new routine:</h3>
        <form onSubmit = {handleSubmit}>
            <input type = 'text' placeholder = 'Routine' onChange = {(event) => setName(event.target.value)} value = {name}/>
            <hr></hr>
            <input type = 'text' placeholder = 'Goal' onChange = {(event) => setGoal(event.target.value)} value = {goal}/>
            <label>Private?</label>
            <select onChange= {(event) => setIsPublic(event.target.value)} value = {isPublic}>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </select>
            <button type = 'submit' disabled = {!goal || !name}>Create new routine</button>
            
        {
            myRoutines.length > 0 
            ? myRoutines.map(routine => {
                    return <SingleRoutine key = {routine.id} routine = {routine}>
                        <Link to = {`/routines/${routine.id}`} className='detail_butn'>Details</Link>
                        {
                            <button onClick = {() => handleDelete(routine.id)}>Delete Routine</button>
                        }
                        

                    </SingleRoutine>
                }) : null
        }
        </form>
    </div>
        </>




}
export default MyRoutines;