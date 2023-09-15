import React, { useEffect, useState } from 'react'
import PlannerList from '../PlannerList'
import { usePlanner } from '../../contexts/PlannerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const PlannerCalendar = ({showAddForm, setshowAddForm}) => {

    // Import data
    const { tasks, setInputDate } = usePlanner();

    // Define dynamic data
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [currentMonthArr, setCurrentMonthArr] = useState([])
    const [currentMonthStart, setCurrentMonthStart] = useState([])
    const [currentMonthEnd, setCurrentMonthEnd] = useState([])

    // Define static data
    const currentDate = new Date()
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    // Create right date format for + buttons
    function dateFormat (index) {
        return `${currentYear}-${currentMonth + 1 > 9 ? (currentMonth + 1) : '0' + (currentMonth + 1)}-${index + 1 > 9 ? (index + 1) : '0' + (index + 1)}T00:00`
    }

    // Change current month to next one
    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }
    // Change current month to previous one
    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    useEffect(() => {
        // Set currentMonthStart
        let startingDay = new Date(currentYear, currentMonth, 1).getDay() - 1
        if (startingDay === -1) {
            startingDay = 6
        }
        setCurrentMonthStart(new Array(startingDay).fill(0))

        // Set currentMonthLength
        const monthLenght = new Date(currentYear, currentMonth + 1, 0).getDate()
        const monthArr = new Array(monthLenght).fill([])

        // Update monthArr with day name index (0 to 6)
        let currentDay = startingDay
        for (let i = 0; i < monthArr.length; i++) {
            monthArr[i] = [...monthArr[i], currentDay]
            currentDay === 6 ? currentDay = 0 : currentDay += 1
        }

        // Update monthArr and if this month has current date, make value of that day = -1
        if (currentDate.getFullYear() === currentYear && currentDate.getMonth() === currentMonth) {
            monthArr[currentDate.getDate() - 1][0] = -1
        }

        // Update monthArr and if this month has task from tasks array, insert them into corresponding date array (index equal to the date)
        tasks.forEach(task => {
            const taskDate = new Date(task.date)
            const taskIndex = taskDate.getDate() - 1

            if(taskDate.getFullYear() === currentYear && taskDate.getMonth() === currentMonth) {
                monthArr[taskIndex] = [...monthArr[taskIndex], task]
            }
        });
        setCurrentMonthArr(monthArr)

        // Set currentMonthEnd
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
                        <div className='date-container'>
                            <div className={`date ${data[0] == 5 ? 'red-date' : ''}${data[0] == 6 ? 'red-date' : ''}`}>{index + 1}</div>
                            <FontAwesomeIcon icon={faPlus} onClick={() => {setshowAddForm(!showAddForm); setInputDate(dateFormat(index))}}/>
                        </div>
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
