import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

const FlightHomepage = () => {
let [flights,setflights]=useState([]);
let navigate = useNavigate();
    const getflights=()=>{
        axios.get("/activeflights",{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
        .then((res)=>{
            setflights(res.data);
        })
        .catch(err=>console.log(err));
    }
    useEffect(()=>{
        getflights();
    },[]);
  return (
    <div>
      {flights.map((flight,n)=>{
        return(
            <div key={flight._id} className="bg-blue-200 flex justify-between ml-6 mr-8" >
                <div>{n+1}). </div>
               <div>{flight.airline}&nbsp; {flight.flightNumber}</div>
               <div>Departure Airport={flight.departureAirport}&nbsp;&nbsp;&nbsp;Departure Time={flight.departureDateTime}</div> 
               <div>Arrival Airport={flight.arrivalAirport}&nbsp;&nbsp;&nbsp;Arrival Time={flight.arrivalDateTime}</div> 
               <div>Available Seats={flight.availableSeats}</div>
               <button className="bg-red-200" onClick={()=>navigate(`/modifyflight/${flight._id}`,{state:{flight}})}>Modify Flight</button>
            </div>
        )
      })}
    </div>
  )
};

export default FlightHomepage;
