import React from "react";
import { connect } from "react-redux";
import { Navigate,Link } from "react-router-dom";
import { User } from "../models/user";
import axios from "axios";
import { NavLink } from "react-router-dom";


const Nav=(props:{user:User})=>{
  let menu

  if (props.user?.id){
    menu=(

      <div className="col-md-3 text-end">
      {/* <button type="button" className="btn btn-outline-primary me-2">Login</button> */}
      {/* <Navigate to={props.user.first_name} />{props.user.first_name} */}
      {/* <Link to={`/users/${user.id}/links`}>but</Link> */}
     <Link to={`/login`} type="button" className="btn btn-outline-primary me-2" onClick={async()=>(await axios.post("logout"))}>Logout</Link>

     <Link to={`/profile`} type="button" className="btn btn-primary">{props.user.first_name} {props.user.last_name}</Link>
    </div>
    )
  }
  else{  menu=(

    <div className="col-md-3 text-end">
    <Link to={`/login`} type="button" className="btn btn-outline-primary me-2">Login</Link>
    <Link to={`/register`} type="button" className="btn btn-primary">Sign-up</Link>
  </div>
  )}




return(

    <div>

<header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
      </a>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><NavLink to={"/"} 

                              className="nav-link px-2 link-secondary">FrontEnd</NavLink></li>

        <li><NavLink to={"/backend"} 

                              className="nav-link px-2 link-dark">BackEnd</NavLink></li>

      </ul>

  {menu}
    </header>
    </div>
)

} 

export default connect((state:{user:User})=>({

  user:state.user
  })) (Nav)