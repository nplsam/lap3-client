import React from 'react'
import PlannerItem from '../PlannerItem'

const PlannerList = ({ tasks, setTasks }) => {

    const deleteTask = (task) => {
        let filteredTasks = tasks.filter(el => el !== task)
        setTasks(filteredTasks)
    }

    return (
        <div className='items-list'>
            {tasks.map((task, index) => (
                <PlannerItem key={index} task={task} deleteTask={deleteTask}/>
            ))}
        </div>
    )
}

export default PlannerList