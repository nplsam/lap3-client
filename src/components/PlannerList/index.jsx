import React from 'react'
import PlannerItem from '../PlannerItem'

const PlannerList = ({ data }) => {

    // Sort tasks by time, from earliest to latest
    const sortByTime = (x, y) => {
        return new Date(x.date)- new Date(y.date);
    }
    

    return (
        <div className='items-list'>
            {data.slice(1).sort(sortByTime).map((task, index) => (
                <PlannerItem key={index} task={task}/>
            ))}
        </div>
    )
}

export default PlannerList