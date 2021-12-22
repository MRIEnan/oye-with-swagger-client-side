import React,{useState,useEffect} from 'react';
import './Home.css';
import Nav from '../../Shared/Nav/Nav';
import useAuth from '../../../hooks/useAuth';

const Home = () => {
    const {user } = useAuth();
    console.log(user);
    return (
        <div className="home-main-container">
            <Nav></Nav>
            <div>
                <h3 className="heading">hello {user.displayName}</h3>
            </div>
        </div>
    );
};

export default Home;