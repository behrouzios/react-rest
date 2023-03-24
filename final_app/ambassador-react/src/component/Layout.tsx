import React from "react";
import { Dispatch } from 'react';
import Header from "./Header";
import Nav from "./Nav";
import {User} from "../models/user"
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";
import { useEffect,useState } from "react";
import axios from "axios";
const Layout=(props:any)=>{
  const [redirect,setRedirect]=useState(false)
  // const [user,setUser]=useState<User|null>(null)
  useEffect(()=>{
    (
     async()=>{
        const {data}=await axios.get("user",{withCredentials:true})
        console.log(data)
        // setUser(data)
        props.setUser(data)
     } 
    )()
  },[])

return(
<div>

<Nav/>
 

 <main>
 
 <Header/>
   <div className="album py-5 bg-light">
    {props.children}
   </div>
 
 </main>
 

</div>
)
}
const mapStateToProps=(state:{user:User})=>({

    user:state.user
    })
    const mapDistapthToProps=(dispatch:Dispatch<any>)=>({
    
     
        setUser:(user:User)=>dispatch(setUser(user))
      
    })
    
    export default connect(mapStateToProps,mapDistapthToProps) (Layout)
    