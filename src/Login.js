import React,{useEffect} from 'react'
import logo from "./gofloaters.JPG";
import { GoogleLogin } from 'react-google-login';
import "./App.css";
import {useHistory} from "react-router-dom";

function Login() {

    const history=useHistory();

    const responseGoogle = (response) => {
        if(response.accessToken)
        {
            sessionStorage.setItem("accessToken",response.accessToken)
            sessionStorage.setItem("auth","Authenticated");
            history.push("/mapview")  
        }
    }

    const responseGoogleFailure=(response)=>{
         sessionStorage.setItem("auth","Not Authenticated");   
    }

    return (
        <>
        <h1>Login in to Go Floaters App(Task)</h1>
        <div className="container-fluid login">
            
            <img src={logo} className="login__image"></img>
            <span><h2 className="login__heading">Go Floaters</h2></span><br></br>
            <GoogleLogin className="login__google"
    clientId="1048344310726-ahluipldt99e1h9hekbvmkvlrd6t34hv.apps.googleusercontent.com"
    buttonText="Login with google"
    onSuccess={responseGoogle}
    onFailure={responseGoogleFailure}
    cookiePolicy={'single_host_origin'}
  />
        </div>
        </>
    )
}

export default Login
