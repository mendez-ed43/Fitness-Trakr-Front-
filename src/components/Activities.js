import React, { useState } from 'react';
import {SingleActivity} from './'

const Activities = ({activities, fetchActivities, loggedIn, token, userId}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const activityForm = () => {

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                const resp = await fetch(`${REACT_APP_BASE_URL}/activities`, {
                   method: 'POST',
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                   }, body: JSON.stringify ({name, description})
                })
                const data = await resp.json();
                if(data) {
                    setName('');
                    setDescription('');
                    await fetchActivities();
                }
                return<>
                   <div>
                   <h3>Create new activity:</h3>
                        <form onSubmit = {handleSubmit}>
                            <input type = 'text' placeholder = 'Activity' onChange = {(event) => setName(event.target.value)} value = {name}/>
                            <hr></hr>
                            <input type = 'text' placeholder = 'Activity Description' onChange = {(event) => setDescription(event.target.value)} value = {description}/>
                            <label>Private?</label>
                            <button type = 'submit' disabled = {!description || !name}>Create new routine</button>
                        </form>
                   </div>


                </>
                
            } catch (error) {
                console.error(error)
            }
        }
    }
    return <>
        <h1> Activities</h1>
        <div className='activities'>
            <form>
                {
                    userId ? activityForm() : null
                }
            </form>
        {
            activities ? activities.map(activity => <SingleActivity key = {activity.id} activity = {activity} />) : 'Rendering...'
        }


    </div>
            
        </>
};

export default Activities;