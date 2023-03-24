import  React, {useEffect, useState} from "react"
import {Product} from "../../models/product"
import axios from "axios"
import {Link} from "react-router-dom"


const Products=()=>{

    const [products,setProducts]=useState<Product[]>([])
    useEffect(()=>{
        (
            async()=>{

                const {data}=await axios.get(`http://127.0.0.1:8000/api/administrator/products`) 
                console.log(data)
                setProducts(data)
            }


        )()

    },[])

    const del=async(id:any)=>{
        console.log(typeof(id))
        if(window.confirm("are you sure?")){
            await axios.delete(`http://127.0.0.1:8000/api/administrator/products/${id}`);

            setProducts(products.filter(p=>{return (p.id!=id)}))

            
        }
    }

    return(

<div>
<div className="pt-3 pb-2 mb-3 border-bottom"><button color="primary"><Link to={"/products/create"}>add new product</Link></button>
</div>
         
         <table className="table table-striped table-sm">
           <thead>
             <tr>
               <td>#</td>
               <td >image</td>
               <td >title</td>
               <td >price</td>
               <td >desription</td>
               <td >action</td>
            </tr>
           </thead>
           <tbody>
            {products.map(product=>{
              return(
                <tr key={product.id}>
                <td>{product.id}</td>
                <td><img src={product.image} width={50} height={50} alt="" /> </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td><button onClick={()=>(del(product.id))}> delete </button><button color="primary"><Link to={`/products/${product.id}/edit`}>Edit</Link></button> </td>

              </tr>
              
              )
            })}
             
           </tbody>
         </table>


</div>
        
    )

}

export default Products