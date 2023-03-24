import React from "react"
import { Navigate } from "react-router-dom"

const RedirectToUsers =()=>{
    return(

        <div>
            <Navigate to={"/users"}/>
        </div>

    )


}
export default RedirectToUsers