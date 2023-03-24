import axios from "axios";
import React, { useEffect,useState,Dispatch } from "react";
import Menu from "./Menu";
import Nav from "./Nav"
import {User} from "../models/user"
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";
const Layout=(props:any)=>{
  const [redirect,setRedirect]=useState(false)
  // const [user,setUser]=useState<User|null>(null)
  useEffect(()=>{
    (
     async()=>{
        const {data}=await axios.get("http://127.0.0.1:8000/api/administrator/user",{withCredentials:true})
        console.log(data)
        // setUser(data)
        props.setUser(data)
     } 
    )()
  },[])


return(

<div>
  {/* <Nav user={user}/> */}
  <Nav/>
    <div>
    <div className="row">
  
 <div className="container-fluid">
     

     <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
         <h1 className="h2">USERS</h1>
        
       </div>

    </main>

    
    </div>
    </div>
    </div>


 
       <div className="table-responsive">
        {props.children}

</div>
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
