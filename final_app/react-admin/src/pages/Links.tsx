import React, { useEffect,useState } from "react"
import Nav from "../components/Nav"
import Menu from "../components/Menu"
import Layout from "../components/Layout"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useParams } from 'react-router-dom';

import {User} from "../models/user"
import {Link} from "../models/link"


const Links=(props:any)=>{
  const [redirect,setRedirect]=useState(false)
  const [links,setLinks]=useState<Link[]>([])
  const { id } = useParams();

  useEffect(()=>{(
     async () => {
     
      const {data}=await axios.get(`http://127.0.0.1:8000/api/administrator/users/${id}/links` )
      console.log("hereee",data)
      setLinks(data)

      
     })()


           
  },[])
  // if (redirect){
  //   return <Navigate to={"/login"}/>
  // }
return(

  <div>
    <table className="table table-striped table-sm">
           <thead>
             <tr>
               <td>#</td>
               <td >total</td>
               <td >count</td>
               <td >revenuw</td>

     
             </tr>
           </thead>
           <tbody>
            {links.map(link=>{
              return(
                <tr key={link.id}>
                <td>{link.id}</td>
                <td>{link.code}</td>
                <td>{link.orders.length}</td>
          
              </tr>
              )
            })}
             
           </tbody>
         </table>
  </div>


)


}

export default Links