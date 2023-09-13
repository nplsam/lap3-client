import React from 'react'
import { PlannerCalendar, PlannerForm } from '../../components'
import '../../assets/css/planner.css'

function PlannerPage() {

  return (
    <>
      <PlannerForm actionPost={true} />
      <PlannerCalendar />
    </>
  )
}

export default PlannerPage