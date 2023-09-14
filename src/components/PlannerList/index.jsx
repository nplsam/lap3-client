import React from 'react'
import PlannerItem from '../PlannerItem'

const PlannerList = ({ data }) => {

    const sortByTime = (x, y) => {
        return new Date(x).getTime() - new Date(y).getTime();
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