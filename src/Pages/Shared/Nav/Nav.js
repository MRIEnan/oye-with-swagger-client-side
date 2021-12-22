import React from 'react';
import './Nav.css';
import { NavHashLink } from 'react-router-hash-link';
import useAuth from '../../../hooks/useAuth';

const Nav = () => {
    const {user,logOut} = useAuth();
    return (
        <div className='nav-main-container'>
            <div className='nav-options'>
                <ul>
                    {user.email && <li>
                        <NavHashLink to="/home">Home</NavHashLink>
                    </li>}
                    {user.email && <li>
                        <NavHashLink to="/profile">Profile</NavHashLink>
                    </li>}
                    {!user.email?<li>
                        <NavHashLink to="/login">Login</NavHashLink>
                    </li>
                    :
                    <li onClick={logOut}>
                        <NavHashLink to="/login">Logout</NavHashLink>
                    </li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Nav;