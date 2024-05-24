import React,{useState,useEffect} from "react";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage,ref, uploadBytes} from 'firebase/storage'
import {
    getAuth, 
    getIdToken, 
    onAuthStateChanged,
    onIdTokenChanged,
    sendEmailVerification,
    verifyBeforeUpdateEmail,
    updateEmail,
    updateProfile,
    } from 'firebase/auth';
import axios from './axios';
const firebaseConfig = {
  apiKey: "AIzaSyDBxChMXYvvhqvI8CWqXC-C1HH1nbNOZ-s",
  authDomain: "semesterproject-14bba.firebaseapp.com",
  projectId: "semesterproject-14bba",
  storageBucket: "semesterproject-14bba.appspot.com",
  messagingSenderId: "913956988816",
  appId: "1:913956988816:web:a69ebec0173899cfa6b515",
  measurementId: "G-KRJK9X0XTL"
};
const FirebaseContext=createContext(null);
const firebaseApp=initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseApp);
const storage=getStorage(firebaseApp);
export const useFirebase=()=>{
    return useContext(FirebaseContext);
} 


export const FirebaseProvider=(props)=>{
    const [user,SetUser]=useState(null);
    const [admin,setadmin]=useState(false);
    const [token,setToken]=useState('');
    async function upload(file,user,setloading){
        const fileref=ref(storage,user.uid +'.jpeg');
        setloading(true);
        const snapshot = await uploadBytes(fileref,file);
        const photoURL=await getDownloadURL(fileref);
        await updateProfile(user,{photoURL});
        setloading(false);
    }
    async function verifyEmail(user,setEmailedit){
        const res=await sendEmailVerification(user,{
            url:"http://localhost:3000/profile"
        });
        console.log(res);
    }
    async function updateprofile(email,user,displayName,setloading,seterr){
        setloading(true);
        await updateProfile(user,{displayName});
        if(email!==user.email){
        verifyBeforeUpdateEmail(user,email,{
            url:"http://localhost:3000/profile"
        })
        .then(()=>{
            window.alert("verification sent to provided mail");
        })
        .catch((err)=>{
            window.alert(err);
        })
        }
        setloading(false);

    }
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
        if(user){
            if(user.email==='sachinvarmaiitjee@gmail.com'){
                setadmin(true);
            }
            SetUser(user);
            user.getIdToken().then((token)=>{
                setToken(token);
            })
        }
        else{
            SetUser(0);
        }
        })
    },[])
    useEffect(()=>{
        if(token){
                axios.post('/gettoken',{},{
                    headers:{
                        'Authorization':'bearer '+ token
                    }
                })
                .then((res)=>{
                    console.log("normal user");
                })
                
        }
       
    },[token])
    
   
    return(
        <FirebaseContext.Provider 
            value={{
                useFirebase,
                user,
                SetUser,
                firebaseAuth,
                upload,
                updateprofile,
                verifyEmail,
                admin,
                setadmin,
                token
                }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}
