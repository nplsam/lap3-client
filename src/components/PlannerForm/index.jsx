import React from 'react'

const PlannerForm = ({ inputDate, setInputDate, inputTag, setInputTag, inputContent, setInputContent, tasks, setTasks }) => {

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
        <label htmlFor="content">Enter content:</label>
        <input type="text" id='content' onChange={handleInputContent} value={inputContent}/>
        <button type="submit" id='submit'>Add task</button>
    </form>
  )
}

export default PlannerForm