import initializeAuthentication from '../firebase/firebase.init';
import { getAuth,getIdToken, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword ,signOut,deleteUser,onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

initializeAuthentication()

const useAuthentication = () =>{
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [authError,setAuthError] = useState('');

    const auth = getAuth();

    // register 
    const registerUser = (email,password,name,navigate) =>{
        setIsLoading(true)
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            setAuthError('');
            const newUser = {email:email, displayName: name};
            // save user to the database
            setUser(newUser);
            // send name to firebase afer creation
            saveUser(email,name,'POST');
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(()=>{
            }).then((error)=>{
            })
            navigate('/');
        })
        .catch((error) => {
            const errorMessage = error.message;
            setAuthError(errorMessage);
        })
        .finally(()=>setIsLoading(false))
    }

    // login 
    const loginUser = (email,password,location,navigate) =>{
        setIsLoading(true);
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user;
            const destination = location?.state?.from || '/home';
            navigate(destination);
            setAuthError('')
        })
        .catch((error) => {
            const errorMessage= error.message;
            setAuthError(errorMessage);
        })
        .finally(()=>setIsLoading(false));
    }

    // observer user state
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user)=>{
            if(user?.email){
                setUser(user)
                /* getIdToken(user)
                .then(idToken =>{
                    setToken(idToken);
                }) */
                setAuthError('')
            }
            else{
                setUser({})
            }
            setIsLoading(false)
        })
        return () => unSubscribe;
    },[]);

    
    // update name of user
    const updateUserName= (name)=>{
        setIsLoading(true)
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(()=>{
        }).catch((error)=>{
            const errorMessage = error.message;
            setAuthError(errorMessage);
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    // delete an user account
    const deleteUserAccount=()=>{
        setIsLoading(true)
        const user = auth.currentUser
        deleteUser(user)
        .then(()=>{
            setUser('');
            // user deleted
        }).catch((error)=>{
            const errorMessage=error.message;
            setAuthError(errorMessage)
        }).finally(()=>{
            setIsLoading(false)
        })
    }


    // log out 
    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
        .then(()=>{
            //sign-out successful
        })
        .catch((error) =>{
            // ann error occured
            const errorMessage= error.message;
            setAuthError(errorMessage);
        })
        .finally(()=>setIsLoading(false))
    }


    // save user to database
    const saveUser = (email,displayName,method) =>{
        const user = {email,displayName};
        fetch('http://localhost:5000/users',{
            method:method,
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then()
    }


    return {user,updateUserName,setUser,deleteUserAccount,isLoading,authError,registerUser,loginUser,logOut};
}

export default useAuthentication;