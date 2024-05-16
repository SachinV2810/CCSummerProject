import React,{useState,useEffect} from "react";
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    onAuthStateChanged,
    } from 'firebase/auth';

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
export const useFirebase=()=>{
    return useContext(FirebaseContext);
} 

export const FirebaseProvider=(props)=>{
    const [user,SetUser]=useState(null);
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
        if(user){
            SetUser(user);
        }
        else{
            SetUser(0);
        }
        })
    },[])
    
    return(
        <FirebaseContext.Provider 
            value={{
                useFirebase,
                user,
                SetUser,
                firebaseAuth
                }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}
