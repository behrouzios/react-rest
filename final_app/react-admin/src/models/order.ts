import { OrderItem } from "./orderItem";

export interface Order{

id:number;
first_name:string;
last_name:string;

ambassado_email:string;
total:number;
order_items:OrderItem[]
}