import { useEffect, useState } from "react";
import axios from "../../axios";
import BookingSuccFlightPrev from "../Booking/BookingSuccFlightPrev";
import Header from "../extras/Header";
import { useFirebase } from "../../firebase";
import UpcomingCard from "./UpcomingCard";

const Upcoming = () => {
    const [trips,setTrips]=useState([]);
    const firebase=useFirebase();
    function formatISODate(isoDate) {
            const date = new Date(isoDate);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
            return date.toLocaleString('en-US', options);
    }

    const user=firebase.user;
    const getTrips=()=>{
        axios.get("/getupcomingtrips",{
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
    <>
    <div className="pt-20">
        {trips.length!==0?<p className="text-center font-bold text-2xl">Upcoming Trips</p>:<p className="text-center font-bold text-2xl">No Upcoming Trips</p>}
        {trips && trips.map((trip,i)=>{
            return(
                <UpcomingCard trip={trip} i={i+1}/>
            )
        })}
    </div>
    </>
  )
};

export default Upcoming;
