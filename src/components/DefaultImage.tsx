import React from 'react'

interface Letter {
letter?:string
}


const DefaultImage = (props:Letter) => {
  return (
    <div 
    className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" 
    style={{ width: "35px", height: "35px" }}
  >
   {props?.letter && <span className="p-0 m-0" style={{ fontSize: "20px" }}>{props?.letter}</span>}
  </div> 
  )
}

export default DefaultImage