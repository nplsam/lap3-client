import React, { useEffect, useState } from 'react'
import PlannerList from '../PlannerList'
import { usePlanner } from '../../contexts/PlannerContext'

const PlannerCalendar = () => {

    const { tasks } = usePlanner();

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonthArr, setCurrentMonthArr] = useState([])
    const [currentMonthStart, setCurrentMonthStart] = useState([])
    const [currentMonthEnd, setCurrentMonthEnd] = useState([])

    const currentDate = new Date()
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
        // Set startingDay
        let startingDay = new Date(currentYear, currentMonth, 1).getDay() - 1
        if (startingDay === -1) {
            startingDay = 6
        }
        setCurrentMonthStart(new Array(startingDay).fill(0))

        // Set currentMonthLength
        const monthLenght = new Date(currentYear, currentMonth + 1, 0).getDate()
        const monthArr = new Array(monthLenght).fill([])

        //
        let currentDay = startingDay
        for (let i = 0; i < monthArr.length; i++) {
            monthArr[i] = [...monthArr[i], currentDay]
            currentDay === 6 ? currentDay = 0 : currentDay += 1
        }

        //
        if (currentDate.getFullYear() === currentYear && currentDate.getMonth() === currentMonth) {
            monthArr[currentDate.getDate() - 1][0] = -1
        }

        tasks.forEach(task => {
            const taskDate = new Date(task.date)
            console.log(task)
            const taskIndex = taskDate.getDate() - 1

            if(taskDate.getFullYear() === currentYear && taskDate.getMonth() === currentMonth) {
                monthArr[taskIndex] = [...monthArr[taskIndex], task]
            }
        });

        setCurrentMonthArr(monthArr)

        // Set endingDay
        let endingDay = new Date(currentYear, currentMonth, monthLenght).getDay() - 1
        if (endingDay === -1 ) {
            endingDay = 6
        }
        setCurrentMonthEnd(new Array(6 - endingDay).fill(0))

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
                {currentMonthArr.map((data, index) => (
                    <div className={`day day-with-date ${data[0] == -1 ? 'current-date' : ''}`} key={index}>
                        <div className={`date ${data[0] == 5 ? 'red-date' : ''}${data[0] == 6 ? 'red-date' : ''}`}>{index + 1}</div>
                        <PlannerList data={data} />
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
