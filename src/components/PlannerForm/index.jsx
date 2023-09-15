import React, { useState } from 'react'
import { usePlanner } from '../../contexts/PlannerContext';

const PlannerForm = ({ username, actionPost, currentTask, showEditButtons, setshowEditButtons }) => {

  // Import data
  const { inputDate, setInputDate, inputTag, setInputTag, inputContent, setInputContent, setTasks } = usePlanner()

  // Define form message
  const [message, setMessage] = useState('')
  
  // Handle all inputs on form
  const handleInputDate = (e) => {
    setInputDate(e.target.value);
  }
  const handleInputTag = (e) => {
    setInputTag(e.target.value);
  }
  const handleInputContent = (e) => {
    setInputContent(e.target.value);
  }

  // Handle form submiting
  const handleSubmit = (e) => {
      e.preventDefault();

      // Check what type of form it is and so create new task or update existing
      if (actionPost) {
        createNewTask();
      } else {
        updateTask();
      }

      // Clean inputs
      setInputDate('');
      setInputTag('');
      setInputContent('');
  }

  // Send new task to DB and update tasks state
  async function createNewTask() {
    try {
      const response = await fetch('http://localhost:5000/planners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.token
        },
        body: JSON.stringify({username: username, date: inputDate, tag: inputTag, content: inputContent}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create a new task');
      }
  
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data.respond]);
      // Display success message
      setMessage('Task created successfully!');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error creating a new task:', error);

      // Clean inputs
      setInputDate('');
      setInputTag('');
      setInputContent('');

      // Display error message 
      setMessage('Failed to create a task. Try again.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  // Update task in DB and update tasks state
  async function updateTask() {
    try {
      const response = await fetch(`http://localhost:5000/planners/${currentTask._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.token
        },
        body: JSON.stringify({date: inputDate, tag: inputTag, content: inputContent}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update a task');
      }
  
      setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === currentTask._id ? { ...task, date: inputDate, tag: inputTag, content: inputContent } : task
        )
      );

      // Display success message 
      setMessage('Task updated successfully!');
      setTimeout(() => {
        // Clean message
        setMessage('');
        // Change buttons
        setshowEditButtons(!showEditButtons)
      }, 1000);

    } catch (error) {
      console.error('Error update a task:', error);

      // Display error message 
      setMessage('Failed to update a task. Try again.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="date">Enter Date:</label>
        <input type="datetime-local" id='date' required onChange={handleInputDate} value={inputDate}/>
        <label htmlFor="tag">Enter tag:</label>
        <input type="text" id='tag' required onChange={handleInputTag} value={inputTag}/>
        <label htmlFor="content">Enter task:</label>
        <textarea type="textarea" id='content' required onChange={handleInputContent} value={inputContent}>
        </textarea>
        {message && <p className='planner-message'>{message}</p>}
        <button type="submit" id='submit'>{actionPost ? 'Add task' : 'Save'}</button>
    </form>
  )
}

export default PlannerForm
