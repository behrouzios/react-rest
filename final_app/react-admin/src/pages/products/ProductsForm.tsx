import React,{useState, SyntheticEvent, useEffect} from "react";
import axios from "axios";
import { Navigate,useParams } from "react-router-dom";
const ProductsForm=()=>{
const[title,setTitle]=useState('')
const[description,setDescription]=useState('')
const[image,setImage]=useState('')
const[price,setPrice]=useState('')
const[redirect,setRedirect]=useState(false)
const { id } = useParams();

useEffect(()=>{

        if (id){
(             

        async()=>{
       

        const {data}=await axios.get(`http://127.0.0.1:8000/api/administrator/products/${id}`)

        setTitle(data.title)
        setDescription(data.description)
        setImage(data.image)
        setPrice(data.price)
        }

)()
}},[])





const Submit=async(e:SyntheticEvent)=>{

e.preventDefault()
console.log("i am here")
// let formField= new FormData()
// formField.append("title",title)
// formField.append("description",description)
// formField.append("price",price)
// formField.append("image",image)
const data={title,description,image,price}


if (id){

        await axios.put(`http://127.0.0.1:8000/api/administrator/products/${id}`,data)
        setRedirect(true)
        // return( <Navigate to={"/products"}/>)
        
}

else{await axios.post(`http://127.0.0.1:8000/api/administrator/products`,data)
}



setRedirect(true)
// e.preventDefault()
}

if (redirect){
    return <Navigate to={"/products"}/>
}

return(
<div>
   
    <form  >
        <div>
                <textarea value={title} name="title" id="" placeholder="title" onChange={e=>setTitle(e.target.value)}/>


          
        </div>
        <div>
                <textarea value={description} name="description" id="" placeholder="description"  onChange={e=>setDescription(e.target.value)} />


       
        </div>
        <div>
                <textarea value={image} name="image" id="" placeholder="image" onChange={e=>setImage(e.target.value)}/>


            
        </div>
        <div>
                <input value={price} name="price" id="" placeholder="Price" type="number" onChange={e=>setPrice(e.target.value)}/>


              
        </div>
        
        <input type="submit" onClick={Submit}/> 
    </form>

    

</div>

)

}
export default ProductsForm