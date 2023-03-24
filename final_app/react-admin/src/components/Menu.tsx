import React from "react"
import { NavLink } from "react-router-dom"
const Menu=()=>{
return(
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            
            <NavLink to={"/users"}className="nav-link active" aria-current="page" >
              <span data-feather="home" className="align-text-bottom"></span>
              USERS
              </NavLink>
          </li>
          <li className="nav-item">
            
            <NavLink to={"/products"}className="nav-link active" aria-current="page" >
              <span data-feather="home" className="align-text-bottom"></span>
              Product
              </NavLink>
              <li className="nav-item">
            
            <NavLink to={"/orders"}className="nav-link active" aria-current="page" >
              <span data-feather="home" className="align-text-bottom"></span>
              Orders
              </NavLink>
          </li>
          </li>
          
        </ul>
      </div>
    </nav>
)
}
export default Menu
