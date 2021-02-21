import React from 'react'
import './AddedTaskList.css'

const AddedTaskList = (props) => {
  return (
    <>
      {props.tasks.map((ig) => (
        <div
          key={ig.id}
          id='tasklist'
          className={`card  ${
            ig.status === 'pending' ? 'pending' : 'completed'
          }`}
        >
          <div className='card-header'>
            {ig.status === 'pending' ? (
              <span>Task added on </span>
            ) : (
              <span>Task completed on </span>
            )}
            <strong>{ig.time}</strong>
            {ig.status === 'pending' ? (
              <button
                className='btn btn-success'
                onClick={props.changeStatus.bind(this, ig.id)}
              >
                mark completed
              </button>
            ) : (
              <button
                className='btn btn-success'
                onClick={props.deletetask.bind(this, ig.id)}
              >
                Delete Task
              </button>
            )}
          </div>
          <div className='card-body text-center'>
            <h5 className='card-title text-capitalize'>
              <strong>{ig.title}</strong>
            </h5>
            <p className='card-text'>{ig.description}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default AddedTaskList
