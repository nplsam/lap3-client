import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PlannerForm from '../PlannerForm';
import { usePlanner } from '../../contexts/PlannerContext';

const PlannerItem = ({ task }) => {

  const { setInputDate, setInputTag, setInputContent, setTasks } = usePlanner();

  const [showItem, setShowItem] = useState(false)
  const [showEditButtons, setshowEditButtons] = useState()

  const toggleItem = () => {
    setShowItem(!showItem)
    setshowEditButtons(false)

    // cleanEditForm
    setInputDate('')
    setInputTag('')
    setInputContent('')
  }

  const setupEditProcces = () => {
    // toggleButtons
    setshowEditButtons(!showEditButtons)

    // setupEditForm
    setInputDate(task.date)
    setInputTag(task.tag)
    setInputContent(task.content)
  }

  const rollbackEditProcces = () => {
    // toggleButtons
    setshowEditButtons(!showEditButtons)

    // cleanEditForm
    setInputDate('')
    setInputTag('')
    setInputContent('')
  }

  async function deleteTask(task) {
    try {
      const response = await fetch(`http://localhost:3000/notes/${task._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the task');
      }
      setTasks((prevTasks) => prevTasks.filter((el) => el !== task));
    } catch (error) {
      console.error('Error deleting the task:', error);
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
              </>
            )}
            {showEditButtons && (
              <>
                <PlannerForm actionPost={false} currentTask={task}/>
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