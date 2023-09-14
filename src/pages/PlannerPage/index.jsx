import React, { useEffect, useState } from 'react'
import { PlannerCalendar, PlannerForm } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/planner.css'
import { usePlanner } from '../../contexts/PlannerContext';

function PlannerPage() {

  const { setTasks } = usePlanner();
  const [showAddForm, setshowAddForm] = useState()

  const toggleAddForm = () => {
    setshowAddForm(!showAddForm)
  }

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/planners/user/:username', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  

  return (
    <>
      <button id='addNewTask-button' onClick={toggleAddForm}>Add new task</button>
      <PlannerCalendar />
      {showAddForm && (
        <div id='addTask-form'>
          <div id='addTask-form-conatiner'>
            <FontAwesomeIcon icon={faXmark} onClick={toggleAddForm}/>
            <PlannerForm actionPost={true} />
          </div>
        </div>
      )}
    </>
  )
}

export default PlannerPage
