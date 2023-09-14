import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PlannerForm from '../PlannerForm';
import { usePlanner } from '../../contexts';

const PlannerItem = ({task, deleteTask }) => {

  const { setInputDate, setInputTag, setInputContent } = usePlanner();

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

  return (
    <>
      <div className='item' onClick={toggleItem}><div>{task.content}</div></div>
      {showItem && (
        <div className="full-item-container">
          <div className="full-item">
            <FontAwesomeIcon icon={faXmark} onClick={toggleItem}/>
            {!showEditButtons && (
              <>
                <p><span className='item-title'>Date: </span>{task.date}</p>
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
                <PlannerForm actionPost={false}/>
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