import React from "react";
import Layout from "../component/Layout";
import Products from "./Products";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Product } from "../models/product";


const ProductsFrontEnd=()=>{

const [products,setProducts]=useState<Product[]>([])
const [filters,setFilters]=useState({s:""})
 useEffect(()=>{

  (async()=>{
      const {data}=await axios.get("http://127.0.0.1:8000/api/ambassador/products/frontend")

      setProducts(data)

  })()
 },[])

return(
<div>
 <Products prod={products} />
</div>

)



}

export default ProductsFrontEnd