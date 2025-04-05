import { LOGO_URL } from "../utilis/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilis/useOnlineStatus";
import { AiFillCheckCircle } from "react-icons/ai"
import { AiFillCloseCircle } from "react-icons/ai";
import Grocery from "./Grocery";
const Header=()=>{
const[btnNameReact,setbtnNameReact]=useState("Login");
const onlineStatus=useOnlineStatus();
    return(
    <div className="header"><div className="logo-container">
        <img className="logo" src={LOGO_URL}/>
    </div>
    <div className="nav-items">
        <ul>
            <li>
                OnlineStatus:{onlineStatus?<AiFillCheckCircle />
:<AiFillCloseCircle />
}
            </li>
            <li>  <Link to="/">Home</Link> </li>
            <li>
             <Link to="/grocery">Grocery</Link> 
            </li>
            <li>  <Link to="/about">About Us </Link> </li>
            <li>
             <Link to="/contact">Contact Us </Link> 
            </li>
            <li> <Link to="/cart">Cart</Link> </li>
            <button className="login" onClick={()=>{
            btnNameReact==="Login"?setbtnNameReact("Logout"):setbtnNameReact("Login");
                }}>{btnNameReact}</button>        </ul>
    </div>
    </div>)
}
export default Header;