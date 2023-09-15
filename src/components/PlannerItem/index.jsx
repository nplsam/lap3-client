import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PlannerForm from '../PlannerForm';
import { usePlanner } from '../../contexts/PlannerContext';

const PlannerItem = ({ task }) => {

  // Import data
  const { setInputDate, setInputTag, setInputContent, setTasks } = usePlanner();

  // Define form message
  const [message, setMessage] = useState('')

  // Define flags
  const [showItem, setShowItem] = useState(false)
  const [showEditButtons, setshowEditButtons] = useState()

  const toggleItem = () => {
    // toggle item
    setShowItem(!showItem)
    setshowEditButtons(false)

    // clean edit form
    setInputDate('')
    setInputTag('')
    setInputContent('')
  }

  const setupEditProcces = () => {
    // toggle buttons
    setshowEditButtons(!showEditButtons)

    // clean edit form
    setInputDate(task.date)
    setInputTag(task.tag)
    setInputContent(task.content)
  }

  const rollbackEditProcces = () => {
    // toggle buttons
    setshowEditButtons(!showEditButtons)

    // clean edit form
    setInputDate('')
    setInputTag('')
    setInputContent('')
  }

  // Delete task from DB and tasks state
  async function deleteTask(task) {
    try {
      const response = await fetch(`http://localhost:5000/planners/${task._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task');
      }

      setTasks((prevTasks) => prevTasks.filter((el) => el !== task));
      setShowItem(!showItem)
    } catch (error) {
      console.error('Error deleting the task:', error);

      // Display error message 
      setMessage('Failed to delete a task. Try again.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  return (
    <>
      <div className='item' onClick={toggleItem}>
        <div className='item-container'>
          <div className='item-time'>{new Date(task.date).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })} </div>
          <div className='item-content'>{task.content}</div>
        </div>
      </div>
      {showItem && (
        <div className="full-item-container">
          <div className="full-item">
            <FontAwesomeIcon icon={faXmark} onClick={toggleItem}/>
            {!showEditButtons && (
              <>
                <p><span className='item-title'>Time: </span>{new Date(task.date).toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" })}</p>
                <p><span className='item-title'>Date: </span>{new Date(task.date).toLocaleDateString('en-GB', { day:"numeric", weekday:"long", month:"short", year:"numeric"})}</p>
                <p><span className='item-title'>Tag: </span>{task.tag}</p>
                <div className='item-task-title'>Task:</div>
                <p className='item-task'>{task.content}</p>
                <div className='item-buttons-container'>
                  <button onClick={setupEditProcces}>Edit</button>
                  <button onClick={() => deleteTask(task)}>Delete</button>
                </div>
                {message && <p className='planner-message'>{message}</p>}
              </>
            )}
            {showEditButtons && (
              <>
                <PlannerForm actionPost={false} currentTask={task} showEditButtons={showEditButtons} setshowEditButtons={setshowEditButtons}/>
                <div className='item-buttons-container'>
                  <button className='fake-save-button'>Save</button>
                  <button onClick={rollbackEditProcces}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default PlannerItem
