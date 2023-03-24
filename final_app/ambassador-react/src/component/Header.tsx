import React from "react";
import { useEffect ,useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";
const Header=(props:{user:User})=>{

  const[title,setTitle]=useState("Welcome")
  const[description,setDescription]=useState("Share the link to earn money")
  const [redirect,setRedirect]=useState(false)
  // const [user,setUser]=useState<User|null>(null)
  useEffect(()=>{

    if(props.user?.id)

{    setTitle(`$${props.user.revenue}`)
      setDescription(`you have earnt this amount`)
} 

else{
  setTitle(`Welcome`)
  setDescription(`Share the link to earn money`)

}


  },[props.user])

let buttons

if(!props.user?.id){


buttons=(
  <p>
  <Link to={"/login"} className="btn btn-primary my-2">Login</Link>
  <Link to={"/register"} className="btn btn-secondary my-2">Register</Link>
</p>



)

}

return(

<div> 


<section className="py-5 text-center container">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">{title}</h1>
        <p className="lead text-muted">{description}</p>
          {buttons}
      </div>
    </div>
  </section>



</div>



)


}

// export default 

export default connect((state:{user:User})=>({

  user:state.user
  }))(Header)