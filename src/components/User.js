import React from 'react'
import {useState} from "react";
const User = ({name}) => {
    const [count,setcount]=useState(0);
    const [count2]=useState(1);
  return (
    <div className="user-card">
        <h1>Count:{count}</h1>
        <h1>Count:{count2}</h1>
        <h2>Name:{name}</h2>
        <h3>Location:Dehradun</h3>
      <h4>Contact:@diyabari</h4>
    </div>
  )
}

export default User;
