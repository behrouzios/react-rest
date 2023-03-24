import axios from "axios";
import React, { useState } from "react";
import Layout from "../component/Layout";
import {Product} from "../models/product"


const Products=(props:{prod:Product[]})=>{
let generateButton,info
const [selected,setSelected]=useState<number[]>([])
const [notify,setNotify]=useState({
   show:false,
   error:false,
   message:""

})

const select=(id:number)=>{
if (selected.some(s=>s===id)){

    setSelected(selected.filter(s=>s!==id))
    return
}
setSelected([...selected,id])

}

const generate=async()=>{
    try{

    const {data}=await axios.post("links" ,{products:selected})
    console.log(data.code)
    setNotify({

        show:true,
        error:false,
        message:`link generated: http://localhost:5000/${data.code}`,
    
    })}
    catch(e){
        console.log("there is problem")
        setNotify({

            show:true,
            error:true,
            message:`please login`,
        
        })
        console.log(notify.message)
    }
    
}

if(selected.length>0){
generateButton=(<div className="input-group-append">

<button className="btn btn-info"onClick={generate}>Generate Link</button>

</div>)

if (notify.show){

    info=(
        <div className="col-md-12 mb-4">

                <div className={notify.error? "alert alert-danger":"alert alert-info" } role="alert">

                    {notify.message}

                </div>

        </div>
    )
}
else{
    <div className="col-md-12 mb-4">

    <div className={notify.error? "alert alert-danger":"alert alert-info" } role="alert">

        {notify.message}

    </div>

</div>

}
}
return(

<Layout>
    <div className="container">
        

    <div className="col-md-12 mb-4 input-group">
        <input type="text" className="form-control" placeholder="search" />

        
    </div>
    {generateButton}
    {notify.message}
{props.prod.map((product) => {return(

<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
<div className="col" key={product.id} onClick={()=>select(product.id)}>
  

  <div className={selected.some(s=>s===product.id)? "card shadow-sm selected":"card shadow-sm"}>


    <img src={product.image} alt="" height={200} />
    <div className="card-body">
      <p className="card-text">{product.title}</p>
      <div className="d-flex justify-content-between align-items-center">
        
        <small className="text-muted">${product.price}</small>
      </div>
    </div>
  </div>
</div>

</div>

)


})
} 
   
  </div>

  </Layout>



)



}
export default Products