import React, { useEffect, useState } from 'react'
import { PlannerCalendar, PlannerForm } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/planner.css'
import { usePlanner } from '../../contexts/PlannerContext';

function PlannerPage() {

  // Define data
  const { setTasks } = usePlanner();
  const [showAddForm, setshowAddForm] = useState()
  const [username, setUsername] = useState('')

  // Toggle flag for form popup
  const toggleAddForm = () => {
    setshowAddForm(!showAddForm)
  }

  // Function to get username
  const getUsername = async () => {
    try {
      const response = await fetch('https://project3-server-4bv6.onrender.com/auth/find', {
        method: 'GET',
        headers: {
          'Authorization': localStorage.token
        },
      });

      if(response.status != 200) {
        throw new Error('Failed to logout')
      }

      const data = await response.json()

      return data.response.username[0].username
      
    } catch (error) {
      console.error('Failde to get username: ', error)
    }
  }

  // Fetch all user tasks
  const fetchTasks = async () => {

    const usernameData = await getUsername()
    setUsername(usernameData)

    try {
      const response = await fetch(`https://project3-server-4bv6.onrender.com/planners/user/${usernameData}`, {
        method: 'GET',
        headers: {
          'Authorization': localStorage.token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json()
      setTasks(data.tasks)
    } catch (error) {
      console.error('Error fetching notes:', error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  

  return (
    <div id='planner'>
      <button id='addNewTask-button' onClick={toggleAddForm}>Add new task</button>
      <PlannerCalendar showAddForm={showAddForm} setshowAddForm={setshowAddForm} />
      {showAddForm && (
        <div id='addTask-form'>
          <div id='addTask-form-conatiner'>
            <FontAwesomeIcon icon={faXmark} onClick={toggleAddForm}/>
            <PlannerForm actionPost={true} username={username} />
          </div>
        </div>
      )}
    </div>
  )
}

export default PlannerPage
