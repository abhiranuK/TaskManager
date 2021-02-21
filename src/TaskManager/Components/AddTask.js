import React, { useState } from 'react'
import './AddTask.css'

const AddTask = (props) => {
  const [titleState, settitleState] = useState('')
  const [descriptionState, setDescriptionState] = useState('')

  const addnewTaskData = (event) => {
    let newtime = new Date()

    let data = {
      title: titleState,
      description: descriptionState,
      time: newtime.toDateString(),
      status: 'pending',
    }
    props.onAddTaskData(data)
    event.preventDefault()
  }

  return (
    <div className='container add-task'>
      <form onSubmit={addnewTaskData}>
        <div className='form-group row'>
          <label htmlFor='title' className='control-label col-sm-2'>
            Title
          </label>
          <div className='col-sm-10'>
            <input
              className='form-control '
              type='text'
              id='title'
              value={titleState}
              onChange={(event) => {
                settitleState(event.target.value)
              }}
            />
          </div>
        </div>
        <div className='form-group row'>
          <label htmlFor='description' className='control-label col-sm-2'>
            Description
          </label>
          <div className='col-sm-10'>
            <textarea
              className='form-control'
              role='textbox'
              type='text'
              id='description'
              value={descriptionState}
              onChange={(event) => {
                setDescriptionState(event.target.value)
              }}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='text-center'>
            <button type='submit' className='btn btn-primary'>
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddTask
