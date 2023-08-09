import React, { Component,Fragment} from 'react'
import Face6Icon from '@mui/icons-material/Face6'; 
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    

export class LoginEmployee extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            password : '',
            resData : '',

        }
    }

    logindata = async (e)=>{
        e.preventDefault();
        console.log(this.state.email)
        const formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        try{
            const response = await axios.post('/loginEmp', formData, {
                'headers' : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.status == 200){
                if(response.data.message == 'Login Successful'){
                    this.setState({resData : response.data.message});
                    localStorage.setItem('slno',response.data.usersl);
                    localStorage.setItem('image',response.data.image);
                    localStorage.setItem('token',response.data.token);
                    localStorage.setItem('role',response.data.role);

                    setTimeout(()=>{window.location.reload();},1500);
                    setTimeout(()=>{window.location.href = '/';},1500);
                      
                }else{
                    this.setState({resData : response.data.message});
                }
            }
        }catch(error){
            console.log(error)
        }
        
    }
    renderMessage=()=>{
        if(this.state.resData != ''){
            return  <div className='text-center'>
                <p>{this.state.resData}</p>
            </div>
        }else{
            return <div className='text-center'>
                <p>Please Enter Valid Email and Password ...</p>
            </div>
        }
    }

    async componentDidMount (){
        
    }
  render() {
    return (
        <Fragment>
            <div className='container-fluid login d-flex justify-content-center align-items-center flex-column'>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                    <div className='col col-md-12 mb-5 alertshadw'>{this.renderMessage()}</div>
                </div>
                <form method="POST"  encType='multipart/form-data'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                        <div className='col col-md-7 mb-2'><input onChange={(e)=>{this.setState({email : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Email@" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-7 mb-3'><input onChange={(e)=>{this.setState({password : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Password" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-10 d-flex justify-content-center smaline'>Looking For Buying ? Login Here ... &nbsp;<Link className='loginLink' to='/loginUser'>click me</Link></div>
                        <div className='col col-md-10 d-flex justify-content-center mb-3 smaline'>Are You A Seller ? Login Here ... &nbsp;<Link className='loginLink' to='/loginSeller'>click me</Link></div>
                        <div className='col col-md-10 d-flex justify-content-center mb-3'><button onClick={(e)=>{this.logindata(e)}} type="button" class="btn btn-sm btn-outline-info"><Face6Icon /> Login</button></div>
                        <div className='col col-md-10 d-flex justify-content-center mb-2 smaline'>Forgot Password ? ... &nbsp; <Link className='loginLink' to='/forgotPass'>click me</Link></div>

                    </div>
                </form>
            </div> 
        </Fragment>
    )
  }
}

export default LoginEmployee
