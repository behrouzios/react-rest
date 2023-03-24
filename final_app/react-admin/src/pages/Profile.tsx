import React,{SyntheticEvent, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../models/user"

import { connect } from "react-redux";
const Profile=()=>{

const [first_name,setfirstName]=useState("")
const [last_name,setlastName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [confirm_password,setconfirmPassword]=useState("")


useEffect(()=>{(async()=>{
        const {data}=await axios.get(`http://127.0.0.1:8000/api/administrator/user`)

        setfirstName(data.first_name)
        setlastName(data.last_name)
        setEmail(data.email)

        // setPassword(data.Password)
        // setconfirmPassword(data.confirm_password)
        })()

        },[])






const profileInfo=async(e:SyntheticEvent)=>{

e.preventDefault()

await axios.put(`http://127.0.0.1:8000/api/administrator/users/info`,{first_name,last_name,email})


}

const changePass=async(e:SyntheticEvent)=>{

e.preventDefault()

await axios.put(`http://127.0.0.1:8000/api/administrator/users/passwords`,{password,confirm_password})


}

return(

<div>
<form onSubmit={profileInfo} >

                <div className="form-floating">
                <input type="text" value={first_name} className="form-control" id="floatingInput" placeholder="first name"
                onChange={(e)=>(setfirstName(e.target.value))}/>
               first name
                </div>

                <div className="form-floating">
                <input type="text" value={last_name} className="form-control" id="floatingInput" placeholder="last name"
                onChange={(e)=>(setlastName(e.target.value))}/>
                last name 
                </div>
                <div className="form-floating">
                <input type="email" value={email} className="form-control" id="floatingPassword" placeholder="email"
              onChange={(e)=>{setEmail(e.target.value)}}/>
                email
                </div>

          
                <button className="w-100 btn btn-lg btn-primary" type="submit">submit</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
</form>



<form onSubmit={changePass}>
               

   
                <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
               onChange={(e)=>(setPassword(e.target.value))}/>
                Password
                </div>

                <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
               onChange={(e)=>(setconfirmPassword(e.target.value))}/>
                Confirm Password
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" >submit</button>

            </form>


</div>


)



}

export default connect((state:{user:User})=>({

  user:state.user
  })) (Profile)