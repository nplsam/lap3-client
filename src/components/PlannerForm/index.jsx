import React from 'react'
import { usePlanner } from '../../contexts/PlannerContext';

const PlannerForm = ({ actionPost, currentTask }) => {

  const { inputDate, setInputDate, inputTag, setInputTag, inputContent, setInputContent, setTasks } = usePlanner()
  
  const handleInputDate = (e) => {
    setInputDate(e.target.value);
  }

  const handleInputTag = (e) => {
    setInputTag(e.target.value);
  }

  const handleInputContent = (e) => {
    setInputContent(e.target.value);
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      //
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

  async function createNewTask() {
    try {
      const response = await fetch('http://localhost:3000/planners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({date: inputDate, tag: inputTag, content: inputContent}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create a new task');
      }
  
      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.error('Error creating a new task:', error);
    }
  }

  async function updateTask() {
    try {
      const response = await fetch(`http://localhost:3000/planners/${currentTask._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
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
    } catch (error) {
      console.error('Error update a task:', error);
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
        <button type="submit" id='submit'>{actionPost ? 'Add task' : 'Save'}</button>
    </form>
  )
}

export default PlannerForm