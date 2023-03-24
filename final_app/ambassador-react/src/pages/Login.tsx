
import axios from "axios";
import React, { SyntheticEvent, useState} from "react";
import { Navigate } from "react-router-dom";
import "./Login.css"
const Login=()=>{

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [redirect,setRedirect]=useState(false)
    
    const submit=async(e:SyntheticEvent)=>{
        e.preventDefault()
        await axios.post("http://127.0.0.1:8000/api/ambassador/login",{
            email,
            password},
     {withCredentials:true})
        setRedirect(true)
    }
    if (redirect){
      return <Navigate   to={"/"}/>
    }
    return(
        
        <main className="form-signin w-100 m-auto">
            
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                onChange={e=>setEmail(e.target.value)}/>
                Email address
                </div>
                <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                onChange={e=>setPassword(e.target.value)}/>
                Password
                </div>

                <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me 
                        </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
            </form>
    </main>
    
    )
    }
export default Login