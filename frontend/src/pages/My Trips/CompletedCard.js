import React, { useEffect, useState, useSyncExternalStore } from 'react';
import './flightcard.css'
import { Rating } from '@mui/material';
import axios from '../../axios';
import { useFirebase } from '../../firebase';
import TripsPage from './TripsPage';
function CompletedCard({trip}) {
    const [review,setreview]=useState(false);
    const firebase=useFirebase()
    const [rating,setrating]=useState(0);
    const [text,settext]=useState("");
    const [issubmit,setissubmit]=useState(false);
    function formatISODate(isoDate) {
            const date = new Date(isoDate);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
            return date.toLocaleString('en-US', options);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log({tripid:trip._id,rating,text});
        axios.post("/users/postreview",{tripid:trip._id,rating,text},{
            headers:{
                'Authorization':firebase.user.uid,
                'Content-Type':'application/json'
            },
            withCredentials:true
        }).then((res)=>{
            setissubmit(true);
            setreview(false);
    })
        .catch(err=>console.log(err));
    }
    useEffect(()=>{
        axios.post("/users/isreviewSubmit",{trip:trip._id},
            {
            headers:{
                'Authorization':firebase.user.uid,
                'Content-Type':'application/json'
            },
            withCredentials:true
        }).then((res)=>{
            console.log(res.data);
            if(res.data.length){
                setissubmit(true);
            } 
            else{
                setissubmit(false);
            }
        })

    },[issubmit])
  return (
    <div className="flight-card">
      <div className="flight-header">
        <div className="flight-title">
          <h2>{trip.flightid.departureAirport} - {trip.flightid.arrivalAirport}</h2>
          <p>{trip.booking?.flight[1]!==null?" Round-Trip ":"One-Way "}  Booking ID - {trip.booking?._id}</p>
        </div>
        {issubmit?<button className="manage-booking font-bold text-xl">Thanks,for review!</button>:<button className="manage-booking font-bold text-xl" onClick={()=>setreview(!review)}>{!review?"Leave a review":"Hide review"}</button>}
      </div>
      <div className="flight-details ">
        <div className="departure">
          <h3>DEPARTURE</h3>
          <p>{formatISODate(trip.departureDateTime).split("GMT")[0]}</p>
          <p>{trip.flightid.departureAirport}</p>
        </div>
        <div className="arrival">
          <h3>ARRIVAL</h3>
          <p>{formatISODate(trip.arrivalDateTime).split("GMT")[0]}</p>
          <p>{trip.flightid.arrivalAirport}</p>
        </div>
        <div className="airline">
          <h3>{trip.flightid.airline} {trip.flightid.flightNumber}</h3>
        </div>
      </div>
      {review && 
      <form className='flex flex-wrap border-t-2 pl-4 pb-6' onSubmit={handleSubmit}>
        <div className='w-full'><Rating value={rating} onChange={(e,v)=>setrating(v)}/></div>
        <textarea placeholder='write your review' required className='border-2 pl-2 outline-none' cols={50} rows={4} value={text} onChange={(e)=>settext(e.target.value)}></textarea>
        <div className='w-full mt-3'><button className='bg-orange-400 rounded pl-2 pr-2' >Submit review</button></div>
      </form>
      }
    </div> 
  );
}

export default CompletedCard;