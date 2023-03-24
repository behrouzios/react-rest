import React, { useEffect,useState } from "react"
import axios from "axios"
import { Order } from "../models/order"


const Orders=()=>{

    const [orders,setOrders]=useState<Order[]>([])
    useEffect(()=>{(
        async () => {
        
         const {data}=await axios.get("http://127.0.0.1:8000/api/administrator/orders")
         console.log(data)
         setOrders(data) 
         
        })()
 
 
              
     },[])

return(
    <div>
        <table>

            {orders.map(order=>(

                <tr key={order.id}>
                    <td>{order.first_name} {order.last_name}</td>
                    <td>{order.total}</td>
                    <td>{order.ambassado_email}</td>
                    {order.order_items.map(item=>(
                        <tr>
                            <td>admin revenue: {item.admin_revenue}</td>
                            <td>ambassador_revenue: {item.ambassador_revenue}</td>
                            <td>price of this item: {item.price}</td>
                            <td>quantity: {item.quantity}</td>
                        </tr>

                    ))}


                </tr>



            ))}
         


        </table>

    </div>
)


}

export default Orders