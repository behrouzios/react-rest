import React, {Component, SyntheticEvent} from "react";
import "./Register.css"
import axios from "axios";
import {Navigate} from "react-router-dom"
class Register extends Component{
    firstName=''
    lastName=''
    email=''
    password=''
    passwordConfrim=''
    userName=''
    state={redirect:false}
    submit= async(e:SyntheticEvent)=>{
    e.preventDefault()
    await axios.post("http://127.0.0.1:8000/api/ambassador/register",{first_name:this.firstName,
    last_name:this.lastName,
    email:this.email,
    password:this.password,
    confirm_password:this.passwordConfrim,
    username:this.userName
}) 
this.setState({
    redirect:true
})
}
render() {
    if (this.state.redirect){
        return <Navigate to={"/login"}/>
    }
    return(
        <main className="form-signin w-100 m-auto">
        <form onSubmit={this.submit}>
            <h1 className="h3 mb-3 fw-normal">Register Form</h1>
            <div className="form-floating">
            <input  className="form-control"  placeholder="first name" 
            onChange={e=>this.firstName=e.target.value}/>

            first name
            </div>
            <div className="form-floating">
            <input  className="form-control"  placeholder="last name"
            onChange={e=>this.lastName=e.target.value}/>
            last name 
            </div>
            <div className="form-floating">
            <input type="email" className="form-control"  placeholder="e-mail"
            onChange={e=>this.email=e.target.value}/>
            email
            </div>
            <div className="form-floating">
            <input  className="form-control"  placeholder="e-mail"
            onChange={e=>this.userName=e.target.value}/>
            username
            </div>
            <div className="form-floating">
            <input type="password" className="form-control"  placeholder="enter your password"
            onChange={e=>this.password=e.target.value}/>
                        
            Password
            </div>
            <div className="form-floating">
            <input type="password" className="form-control"  placeholder="confirm your password"
            onChange={e=>this.passwordConfrim=e.target.value}/>
            Confirm Password
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
        </form>
    </main>


    )

}
}








// const Register=()=>{
// return(

//     <main className="form-signin w-100 m-auto">
//         <form>
//             <h1 className="h3 mb-3 fw-normal">Register Form</h1>
//             <div className="form-floating">
//             <input  className="form-control"  placeholder="first name"/>
//             first name
//             </div>
//             <div className="form-floating">
//             <input  className="form-control"  placeholder="last name"/>
//             last name 
//             </div>
//             <div className="form-floating">
//             <input type="email" className="form-control"  placeholder="e-mail"/>
//             email
//             </div>
//             <div className="form-floating">
//             <input type="password" className="form-control"  placeholder="enter your password"/>
//             Password
//             </div>
//             <div className="form-floating">
//             <input type="password" className="form-control"  placeholder="confirm your password"/>
//             Confirm Password
//             </div>
//             <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
//             <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
//         </form>
//     </main>
 
// )
// }
export default Register