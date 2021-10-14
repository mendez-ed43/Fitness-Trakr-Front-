
import React, { Children } from 'react';

const SingleRoutine = ({routine, children}) => {
    return routine ? 
    <div>
      <div>
          <li>
            <h3>{routine.name}</h3>
            <div>{routine.goal}</div>
            <div> {routine.creatorName} </div>
            {/* <div> {routine.activities} </div> */}
            {
              children
            }
          </li>
      </div>
    </div>
    : 'Loading...'
}
 
export default SingleRoutine;