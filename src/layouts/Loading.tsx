import React from 'react'
import Spinner from '../components/Spinner'

const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center bg-light position-absolute top-0 start-0 w-100 vh-100 user-select-none'>
        <Spinner size='lg' type='grow'   className="text-secondary m-2"/>
        <Spinner type="grow" className="spinner-grow-sm m-2"  size='sm'/>
    </div>
  )
}

export default Loading