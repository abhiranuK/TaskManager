import React, { useState, useEffect } from 'react'
import './Taskmanager.css'
import AddTask from './Components/AddTask'
import AddedTaskList from './Components/AddedTaskList'

const TaskManager = () => {
  const [todoListonDashboard, settodoListonDashboard] = useState([])
  const [pendingTask, setPendingTask] = useState([])
  const [completedTask, setCompletedTask] = useState([])

  const fetchdata = () => {
    fetch(
      'https://todolist-71886-default-rtdb.firebaseio.com/ingredient.json',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        let dataTasks = []
        for (const key in responseData) {
          dataTasks.push({
            id: key,
            time: responseData[key].time,
            description: responseData[key].description,
            title: responseData[key].title,
            status: responseData[key].status,
          })
        }
        settodoListonDashboard(dataTasks)
      })
  }

  const deletedTask = (id) => {
    console.log(id)
    let deletequery = `https://todolist-71886-default-rtdb.firebaseio.com/ingredient/${id}.json`
    console.log(deletequery)

    fetch(
      `https://todolist-71886-default-rtdb.firebaseio.com/ingredient/${id}.json`,
      {
        method: 'DELETE',
      }
    ).then((response) => {
      settodoListonDashboard((prevuserIngredientList) =>
        prevuserIngredientList.filter((task) => task.id !== id)
      )
    })
  }
  const getTaskByStatus = (status) => {
    console.log('pending', status)
    fetch(
      'https://todolist-71886-default-rtdb.firebaseio.com/ingredient.json',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        let dataTasks = []
        for (const key in responseData) {
          if (responseData[key].status == status) {
            dataTasks.push({
              id: key,
              time: responseData[key].time,
              description: responseData[key].description,
              title: responseData[key].title,
              status: responseData[key].status,
            })
          }
          console.log('dataTAskss', dataTasks)
          settodoListonDashboard(dataTasks, [])
        }
      })
  }
  useEffect(() => {
    fetchdata()
  }, [])

  const onAddTaskDataHandler = (task) => {
    fetch(
      'https://todolist-71886-default-rtdb.firebaseio.com/ingredient.json',
      {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((repsonseData) => {
        console.log(repsonseData)
        settodoListonDashboard((todoListonDashboard) => [
          ...todoListonDashboard,
          { id: repsonseData.name, ...task },
        ])
      })
  }

  const changeStatus = (key) => {
    const item = todoListonDashboard.filter((item) => item.id === key)
    let task = {
      description: item[0].description,
      title: item[0].title,
      time: item[0].time,
      status: 'completed',
    }
    deletedTask(key)
    onAddTaskDataHandler(task)
  }
  return (
    <>
      <div className='container'>
        <h1 className='header-center'>Task Manager</h1>
        <AddTask onAddTaskData={onAddTaskDataHandler} />

        <div className='container text-center'>
          <button
            onClick={() => {
              fetchdata()
            }}
            className='btn btn-success btn-margin'
          >
            All
          </button>
          <button
            onClick={() => {
              getTaskByStatus('completed')
            }}
            className='btn btn-success btn-margin'
          >
            Completed
          </button>
        </div>
        <section>
          <h2 className='task-header'>Tasks</h2>
        </section>
        <div>
          <AddedTaskList
            tasks={todoListonDashboard}
            deletetask={deletedTask}
            changeStatus={changeStatus}
          />
        </div>
      </div>
    </>
  )
}

export default TaskManager
