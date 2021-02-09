import React, { useState, useEffect } from 'react';
import './Taskmanager.css';
import AddTask from './Components/AddTask';
import AddedTaskList from './Components/AddedTaskList';

const TaskManager = () => {
    const [todoListonDashboard, settodoListonDashboard] = useState([]);

    const fetchdata = () => {
        fetch('https://todolist-71886-default-rtdb.firebaseio.com/ingredient.json',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                let dataTasks = [];
                for (const key in responseData) {
                    dataTasks.push({
                        'id': key,
                        'time': responseData[key].time,
                        'description': responseData[key].description,
                        'title': responseData[key].title

                    })
                }
                settodoListonDashboard(dataTasks);
            });
    }

    const deletedTask = (id) => {
        console.log(id);
        let deletequery = `https://todolist-71886-default-rtdb.firebaseio.com/ingredient/${id}.json`;
        console.log(deletequery);

        fetch(`https://todolist-71886-default-rtdb.firebaseio.com/ingredient/${id}.json`,
            {
                method: 'DELETE'
            }
        ).then((response) => {
            settodoListonDashboard(prevuserIngredientList => prevuserIngredientList.filter(task => task.id !== id))

        })
    }
    

    useEffect(() => { fetchdata(); }, []);

    const onAddTaskDataHandler = (task) => {
        fetch('https://todolist-71886-default-rtdb.firebaseio.com/ingredient.json',
            {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                return response.json();
            })
            .then((repsonseData) => {
                console.log(repsonseData);
                settodoListonDashboard(todoListonDashboard => [...todoListonDashboard, { id: repsonseData.name , ...task }]);
            });       
    }


    return (
        <>
            <header className="r">
                hey bro
            </header>
            <AddTask onAddTaskData={onAddTaskDataHandler} />
            <AddedTaskList tasks={todoListonDashboard} deletetask={deletedTask}/>
        </>

    );
}


export default TaskManager;