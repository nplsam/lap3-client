import React, { useState } from 'react'
import { PlannerCalendar, PlannerForm } from '../../components'
import '../../assets/css/planner.css'

function PlannerPage() {
  const [inputDate, setInputDate] = useState('')
  const [inputTag, setInputTag] = useState('')
  const [inputContent, setInputContent] = useState('')
  const [tasks, setTasks] = useState([{date: '2023-09-12', tag: 'tag', content: 'content'}])

  return (
    <>
      <PlannerForm inputDate={inputDate} setInputDate={setInputDate}
                   inputTag={inputTag} setInputTag={setInputTag} 
                   inputContent={inputContent} setInputContent={setInputContent}
                   tasks={tasks} setTasks={setTasks}/>
      <PlannerCalendar tasks={tasks} setTasks={setTasks}/>
    </>
  )
}

export default PlannerPage