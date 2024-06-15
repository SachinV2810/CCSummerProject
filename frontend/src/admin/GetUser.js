import { useEffect, useState } from "react";
import React from 'react';
import {Card, CardContent, Typography, Box } from '@material-ui/core';
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
            }
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
     <div id="outer" className="flex flex-col items-center">
            {loader && <LinearProgress color="secondary" className="z-90" />}
            <Header />
            {users.map((user, n) => (
                <Card key={user.uid} className="shadow-md w-96 m-4 mt-10">
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h5" component="div">
                                {n + 1}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Name: {user.displayName ? user.displayName : "Undefined"}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Email: {user.email}
                            </Typography>
                            <Typography variant="body1" component="div">
                                UserId: {user.uid}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Admin access: {user.email === 'sachinvarmaiitjee@gmail.com' ? 'Yes' : 'No'}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Phone Number: {user.phoneNumber ? user.phoneNumber : "Undefined"}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </div>
    
  )
};

export default GetUser;
