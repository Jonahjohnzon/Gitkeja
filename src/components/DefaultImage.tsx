import React from 'react'

interface Letter {
username?:string
}


const DefaultImage = (props:Letter) => {
  const FirstLetter =    props?.username?.charAt(0)?.toUpperCase();
  return (
    <div 
    className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" 
    style={{ width: "35px", height: "35px" }}
  >
   {FirstLetter  && <span className="p-0 m-0" style={{ fontSize: "20px" }}>{FirstLetter}</span>}
  </div> 
  )
}

export default DefaultImage