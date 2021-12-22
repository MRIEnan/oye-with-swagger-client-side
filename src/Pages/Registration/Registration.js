import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { NavHashLink } from 'react-router-hash-link';
import useAuth from '../../hooks/useAuth';
import './Registration.css';

const Registration = () => {
    const {user,registerUser} = useAuth()
    // const [userInfo,setUserInfo] = useState({})
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const handleRegistration = e =>{
        e.preventDefault();
        console.log('registration btn clicked');
        console.log(email,password,name)
        if(password !== password2){
            console.log("password doesn't match")
        }
        else{
            /* fetch('http://localhost:5000/users',{
                method: 'POST',
                headers:{
                'content-type':'application/json'
                },
                body: JSON.stringify({displayName:name,email:email,password:password})
            })
            .then(res=>res.json())
            .then(data=>{
                console.log('successfully added',data)
            }) */
            registerUser(email,password,name,navigate)
            e.target.reset();
        }
    }
    /* const handleOnChange= e => {
        const fieldName= e.target.name;
        const fieldValue= e.target.value;
        // console.log(fieldName,fieldValue);
        const newUserInfo={...userInfo};
        newUserInfo[fieldName]=fieldValue;
        setUserInfo(newUserInfo);
        console.log(userInfo)
    } */

    return (
        <div className="registration-main-container">
            <h2 className="heading">Registration</h2>
            <div className="registration-form-container">
                <form onSubmit={handleRegistration} className="registration-form">
                    <input type="text" onChange={e=>setName(e.target.value)} placeholder="Enter your name" name="name"/>
                    <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" name="email"/>
                    <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" name="password"/>
                    <input type="password" onChange={e=>setPassword2(e.target.value)} placeholder="Re-enter your password" name="password2"/>
                    <button type="submit">Registration</button>
                    <hr/>
                </form>
            </div>
            <p style={{margin: '5px auto'}}>Or</p>
            <p className="login-or-register">Already registered? Please <NavHashLink className="btn-special" to="/login">Login</NavHashLink></p>
        </div>
    );
};

export default Registration;