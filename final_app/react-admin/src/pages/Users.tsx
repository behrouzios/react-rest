import React, { useEffect,useState } from "react"
import Nav from "../components/Nav"
import Menu from "../components/Menu"
import Layout from "../components/Layout"
import axios from "axios"
import { Navigate } from "react-router-dom"
import {User} from "../models/user"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom"
import { useParams,Route,Routes } from "react-router-dom";







const Users=()=>{

    const [redirect,setRedirect]=useState(false)
    const [users,setUser]=useState<User[]>([])
    
    useEffect(()=>{(
       async () => {
       
        const {data}=await axios.get("http://127.0.0.1:8000/api/administrator/ambassadors")
        console.log(data)
        setUser(data)

        
       })()


             
    },[])
    // if (redirect){
    //   return <Navigate to={"/login"}/>
    // }
    function Child() {
      let { id } = useParams();
    
      return (
        <div>
          <h3>ID: {id}</h3>
        </div>
      );
    }

return(
 
  <Layout>
     <Menu /> 
         <table className="table table-striped table-sm">
           <thead>
             <tr>
               <td>#</td>
               <td >name</td>
               <td >Header</td>
               <td >action</td>

     
             </tr>
           </thead>
           <tbody>
            {users.map(user=>{
              return(
                <tr >
                <td>{user.id}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                
                <button> <Link to={`/users/${user.id}/links`}>but</Link> </button>
                

          
              </tr>
              )
            })}
             
           </tbody>
         </table>
  </Layout>

)
}
export default Users