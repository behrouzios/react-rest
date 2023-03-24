import React from "react"
import {User} from "../models/user"
import {Link} from "react-router-dom"
import axios from "axios"
import { connect } from "react-redux"

const Nav=(props:{user:User|null})=>{
    const Logout=async()=>{
        await axios.post("http://127.0.0.1:8000/api/administrator/logout")
    }
    return(
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>
                        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"/>
                        <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                                
                        <Link to={"/profile"} className="nav-link px-3" >   {props.user?.first_name} {props.user?.last_name}</Link>
                        <Link to={"/login"} className="nav-link px-3" onClick={Logout} >sign out</Link>

                        </div>
                        </div>
        </header>
    )
}

export default connect((state:{user:User})=>({

    user:state.user
    }))(Nav)