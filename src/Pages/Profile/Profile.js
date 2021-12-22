import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Nav from '../Shared/Nav/Nav';
import './Profile.css';

const Profile= () => {
    const navigate=useNavigate();
    const {user,isLoading,deleteUserAccount,logOut,updateUserName} = useAuth();
    const [name,setName] = useState('');
    const [userInfo,setUserInfo] = useState({});
    console.log(user.email)
    useEffect(()=>{
        fetch(`http://localhost:5000/user?email=${user.email}`)
        .then(res => res.json())
        .then(data => setUserInfo(data));
    },[user.email]);
    const handleUpdateName=e=>{
        e.preventDefault();
        console.log(name)
        updateUserName(name)
        console.log(user.displayName)
        fetch(`http://localhost:5000/users`,{
            method: 'PUT',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({name:name,id:userInfo._id})
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        e.target.reset();
    }
    const handleDeleteUser=e=>{
        e.preventDefault();
        console.log('deleted btn clickd')
        const answer= window.confirm('Are you want to delete the account?')
        if(!answer){
            return
        }else{
            console.log('proceed')
            fetch('http://localhost:5000/users',{
                method:'DELETE',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({id:userInfo._id})
            })
            .then(res => res.json())
            .then(data=> console.log(data))
            console.log('data of db cleared');
            deleteUserAccount();
            logOut();
        }
        // deleteUserAccount();
    }
    if(isLoading){
        return(
            <div>
                <h2 className="heading">loading</h2>
            </div>
        )
    }
    return(
        <div>
            <Nav></Nav>
            <h2 className="heading">{user.displayName} profile</h2>
            <div className="profile-edit-form-container">
                <h3>Update Name</h3>
                <form className="profile-update-form" onSubmit={e=>handleUpdateName(e)} >
                    <input type="text" onChange={e=>setName(e.target.value)} name="name" />
                    <button type="submit">Update</button>
                </form>
                <hr/>
                <form className="profile-delete-form">
                    <button onClick={e=>handleDeleteUser(e)}>Delete Account</button>
                </form>
            </div>
        </div>
    )
}

export default Profile;