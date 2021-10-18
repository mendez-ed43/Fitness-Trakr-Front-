
import React, { Children } from 'react';

const SingleActivity = ({ children, activity}) => {
    return activity ?
        <div>
            <div>Name: {activity.name}</div>
            <div>Description: {activity.description}</div>
            <hr></hr>
            {
            children
            }
        </div>
        : 'Rendering...'
}

export default SingleActivity;