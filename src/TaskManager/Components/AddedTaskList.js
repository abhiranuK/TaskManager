import React from 'react';
import './AddedTaskList.css';


const AddedTaskList = (props) => {  
    
   return (
           <>
            <h2 className="task-header">you have n Tasks pending</h2>
            
               {props.tasks.map(ig => (
                   <span className="bigbox" key={ig.id} onClick={ props.deletetask.bind(this, ig.id) }>
                        <span className="title">{ig.title}</span>
                        <span>{ig.description}</span>
                    </span>
                ))}            
        </>
    )
}

export default AddedTaskList;