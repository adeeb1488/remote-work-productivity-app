import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'

const Calendar = ({selectedDate, onDateChange}) => {
  return (
 <ReactDatePicker
 selected={selectedDate}
 onChange={(date)=>onDateChange(date)}
 inline
 />
  )
}

export default Calendar