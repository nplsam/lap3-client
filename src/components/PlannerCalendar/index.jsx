import React, { useEffect, useState } from 'react'
import PlannerItem from '../PlannerItem'

const PlannerCalendar = ({ tasks, setTasks }) => {

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonthArr, setCurrentMonthArr] = useState([])
    const [currentMonthStart, setCurrentMonthStart] = useState([])

    const currentDay = new Date().getDate()
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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
        const monthArr = new Array(monthLenght).fill(0)

        tasks.forEach(task => {
            const taskDate = new Date(task.date)

            if(taskDate.getFullYear() === currentYear && taskDate.getMonth() === currentMonth) {
                monthArr[taskDate.getDate() - 1] = task
            }
        });

        setCurrentMonthArr(monthArr)

    }, [currentMonth])

  return (
    <div id='PlannerCalendar-container'>
        <button onClick={nextMonth}>Previous</button>
        <button onClick={prevMonth}>Next</button>
        <div id='PlannerCalendar'>
            <div className='dayname'>Mon</div>
            <div className='dayname'>Tue</div>
            <div className='dayname'>Wed</div>
            <div className='dayname'>Thu</div>
            <div className='dayname'>Fri</div>
            <div className='dayname'>Sat</div>
            <div className='dayname'>Sun</div>
            {currentMonthStart.map((data, index) => (
                <div className='day' key={index}>
                </div>
            ))}
            {currentMonthArr.map((data, index) => (
                <div className='day' key={index}>
                    <div>{index + 1}</div>
                    <div className=''>{data.content}</div>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default PlannerCalendar