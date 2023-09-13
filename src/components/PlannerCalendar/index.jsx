import React, { useEffect, useState } from 'react'
import PlannerList from '../PlannerList'
import { usePlanner } from '../../contexts';

const PlannerCalendar = () => {

    const { tasks, setTasks } = usePlanner();

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonthArr, setCurrentMonthArr] = useState([])
    const [currentMonthStart, setCurrentMonthStart] = useState([])
    const [currentMonthEnd, setCurrentMonthEnd] = useState([])

    const currentDay = new Date().getDate()
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }
    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    useEffect(() => {
        // Set startingDate
        let startingDate = new Date(currentYear, currentMonth, 1).getDay() - 1
        if (startingDate === -1) {
            startingDate = 6
        }
        setCurrentMonthStart(new Array(startingDate).fill(0))

        // Set currentMonthLength
        const monthLenght = new Date(currentYear, currentMonth + 1, 0).getDate()
        const monthArr = new Array(monthLenght).fill([])

        tasks.forEach(task => {
            const taskDate = new Date(task.date)

            if(taskDate.getFullYear() === currentYear && taskDate.getMonth() === currentMonth) {
                monthArr[taskDate.getDate() - 1] = [...monthArr[taskDate.getDate() - 1], task]
            }
        });

        setCurrentMonthArr(monthArr)

        // Set endingDate
        let endingDate = new Date(currentYear, currentMonth, monthLenght).getDay() - 1
        if (endingDate === -1 ) {
            endingDate = 6
        }
        setCurrentMonthEnd(new Array(6 - endingDate).fill(0))

    }, [currentMonth, tasks])

    return (
        <div id='PlannerCalendar-container'>
            <div id='PlannerCalendar-controls'>
                <button onClick={prevMonth}>Previous</button>
                <div>{months[currentMonth]} {currentYear}</div>
                <button onClick={nextMonth}>Next</button>
            </div>
            
            <div id='PlannerCalendar'>
                {days.map((day, index) => (
                    <div className='dayname' key={index}>{day}</div>
                ))}
                {currentMonthStart.map((data, index) => (
                    <div className='day' key={index}>
                    </div>
                ))}
                {currentMonthArr.map((tasks, index) => (
                    <div className='day day-with-date' key={index}>
                        <div className='date'>{index + 1}</div>
                        <PlannerList tasks={tasks} setTasks={setTasks} />
                    </div>
                ))}
                {currentMonthEnd.map((data, index) => (
                    <div className='day' key={index}>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default PlannerCalendar