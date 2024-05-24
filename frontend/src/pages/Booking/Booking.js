import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useEffect, useState } from "react";

import Header from "../extras/Header";
import FlightPrev from "./FlightPrev";
import FarePrev from "./FarePrev";
import TravellerDetails from "./TravellerDetails";

const Booking = () => {
    const {id,adult,child}=useParams();
    console.log(id);
    const [flight,setflight]=useState({})
    const getFlight=()=>{
        axios.get(`/getbreview/${id}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
        .then((res)=>{
            setflight(res.data);
        })
        .catch((err)=>console.log(err));
    }
    useEffect(()=>{
        getFlight();
    },[])
  return (
    <div className="flex flex-wrap h-full">
    <div className="flex justify-around w-full mt-24">
        <FlightPrev flight={flight}/>
        <FarePrev flight1={flight} a={adult} c={child}/>
    </div>
        <TravellerDetails adult={adult} child={child} flight1={flight}/>
    </div>
  )
};

export default Booking;
