import { useEffect, useState } from "react";
import axios from "../axios";
import { LinearProgress } from "@mui/material";
import { useFirebase } from "../firebase";
import Header from "./Header";
const GetUser = () => {
    const [users,setUsers]=useState([]);
    const [loader,setloader]=useState(false);
    const firebase=useFirebase();
    const GetUserAll=()=>{
        setloader(true);
        axios.get("/admin/allusers",{
            headers:{
                'Content-Type':'application/json',
                'Authorization':firebase.token
            },
            withCredentials:true
        })
        .then((res)=>{
            setUsers(res.data);
            setloader(false);
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        GetUserAll();
    },[]);
  return (
    <div id="outer" className="flex flex-col">
        {loader && <LinearProgress color="secondary" className="z-90"/>}
         <Header/>
        <div className="pt-20">Click on Booked Flights to see which user book which flight</div>
        {users.map((user,n)=>{
            return (<div key={user.uid} className="shadow-md w-96 text-center">
                <h1>{n+1}</h1>
                <div>Name:{user.displayName?user.displayName:"Undefined"}</div>
                <div>Email:{user.email}</div>
                <div>userId:{user.uid}</div>
                <div>Admin acces:{user.email==='sachinvarmaiitjee@gmail.com'? <p>Yes</p>:<p>No</p>}</div>
                <div>PhoneNumber:{user.phoneNumber?user.phoneNumber:"Undefined"}</div>
            </div> )  
        })}
    </div>
    
  )
};

export default GetUser;
