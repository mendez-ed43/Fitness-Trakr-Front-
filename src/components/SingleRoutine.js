
import React, { Children } from 'react';
import {SingleActivity} from './'

const SingleRoutine = ({routine, children}) => {
    return routine ? 
    <div className='flexbox'>
      <div style={{margin: '.2rem'}} className='single_routine'>
          <li>
            <h3>{routine.name}</h3>
            <div>{routine.goal}</div>
            <div> {routine.creatorName} </div>
            <div>Private: {!routine.isPublic ? 'no' : 'yes' }</div>
            {
              routine.activities.length > 0 && <div>
                <span>Activities:</span>
                <ol>
                  {
                    routine.activities.map(activity => <li key = {activity.id}>
                      <SingleActivity activity = { activity }>
                        {
                          <>
                            <div>Reps: {activity.count}</div>
                            <div>Duration: {activity.duration} minutes</div>
                            <hr></hr>
                          </>
                        }
                      </SingleActivity>
                      {
                        children
                      }
                    </li>)
                  }
                </ol>
              </div>
            }
          </li>
      </div>
    </div>
    : 'Loading...'
}
 
export default SingleRoutine;