import React, { useState } from 'react';
import './AddTask.css';
import Card from './Card';

const AddTask = (props) => {
    const [titleState, settitleState] = useState('');
    const [descriptionState, setDescriptionState] = useState('');

    const addnewTaskData = (event) => {
        let data = {
            title: titleState,
            description: descriptionState,
            time: new Date()
        };
        props.onAddTaskData(data);
        event.preventDefault();
    };

    return (
        <section className="task-form">
            <h1 className= "header-center">Task Manager</h1>
            <Card>
                <form onSubmit={addnewTaskData }>
                    <div className="form-control">
                        <label htmlFor="title" className="title-style">Title</label>
                        <input type="text" id="title"  value={titleState} onChange={event => {
                            settitleState(event.target.value);
                        }}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea role="textbox" rows="4" cols="60" type="text" id="description" value={descriptionState}

                            onChange={event => {
                                setDescriptionState(event.target.value);
                            }}/>
                    </div>
                    <div className="task-form__actions">
                        <button type="submit">Add Task</button>
                    </div>
                </form>
            </Card>
        </section>
    );
}

export default AddTask;
