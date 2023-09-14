import React, { useState } from 'react'
import { PlannerCalendar, PlannerForm } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/planner.css'

function PlannerPage() {

  const [showAddForm, setshowAddForm] = useState()

  const toggleAddForm = () => {
    setshowAddForm(!showAddForm)
  }

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