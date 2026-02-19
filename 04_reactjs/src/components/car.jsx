import React from 'react'
const Car = ({ name , year , model , price}) => {
  return (
    <li>
        <p> name :{name}</p>
        <p> year :{year}</p>
        <p> model :{model}</p>
        <p> price :{price}</p>
    </li>
  )
}

export default Car