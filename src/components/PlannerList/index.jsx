import React from 'react'
import PlannerItem from '../PlannerItem'
import { usePlanner } from '../../contexts';

const PlannerList = ({ data }) => {

    const { tasks, setTasks } = usePlanner();

    const deleteTask = (task) => {
        let filteredTasks = tasks.filter(el => el !== task)
        setTasks(filteredTasks)
    }

    return (
        <div className='items-list'>
            {data.slice(1).map((task, index) => (
                <PlannerItem key={index} task={task} deleteTask={deleteTask}/>
            ))}
        </div>
    )
}

export default PlannerList