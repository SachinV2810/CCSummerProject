import { useState,useEffect } from "react";
import { useFirebase } from "../../firebase";
import axios from "../../axios";
import CompletedCard from "./CompletedCard";
const Completed = () => {
    const [trips,setTrips]=useState([]);
    const firebase=useFirebase();
    const user=firebase.user;
    const getTrips=()=>{
        axios.get("/users/getcompTrips",{
            headers:{
                'Content-Type':'application/json',
                'Authorization':user.uid
            },
            withCredentials:true
        })
        .then(res=>{
            setTrips(res.data);
    })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getTrips();
    },[])
  return (
    <div className="pt-20 relative top-44 flex flex-wrap justify-center ">
        {trips.length!==0?<p className="text-center font-bold text-2xl w-full">
        Hope you had a nice journey!
        </p>:<p className="text-center font-bold text-2xl w-full">No Completed Trips</p>}
        {trips && trips.map((trip,i)=>{
            return(
               <CompletedCard trip={trip} i={i+1} key={trip._id}/>
            )
        })}
    </div>
  )
};

export default Completed;
