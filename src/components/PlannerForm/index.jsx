import React from 'react'
import { usePlanner } from '../../contexts';

const PlannerForm = ({ actionPost }) => {

  const { inputDate, setInputDate, inputTag, setInputTag, inputContent, setInputContent, tasks, setTasks } = usePlanner()
  
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
      setTasks([
          ...tasks, { date: inputDate, tag: inputTag, content: inputContent }
      ])
      setInputDate('')
      setInputTag('')
      setInputContent('')
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="date">Enter Date:</label>
        <input type="date" id='date' onChange={handleInputDate} value={inputDate}/>
        <label htmlFor="tag">Enter tag:</label>
        <input type="text" id='tag' onChange={handleInputTag} value={inputTag}/>
        <label htmlFor="content">Enter task:</label>
        <textarea type="textarea" id='content' onChange={handleInputContent} value={inputContent}>
        </textarea>
        <button type="submit" id='submit'>{actionPost ? 'Add task' : 'Save'}</button>
    </form>
  )
}

export default PlannerForm