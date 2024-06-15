import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { useEffect, useState } from "react";

import Header from "../extras/Header";
import FlightPrev from "./FlightPrev";
import FarePrev from "./FarePrev";
import TravellerDetails from "./TravellerDetails";

const BookingPart2 = () => {
    const {id1,id2,adult,child}=useParams();
    const navigate=useNavigate();
    const [flight1,setflight1]=useState({})
    const [flight2,setflight2]=useState({})
    const getFlight1=()=>{
        axios.get(`/users/getbreview/${id1}/`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            setflight1(res.data);
        })
        .catch(err=>{
            console.log(err);
            navigate("/flights/result");
    });
    }
    const getFlight2=()=>{
        axios.get(`/users/getbreview/${id2}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
        .then((res)=>{
            setflight2(res.data);
        })
        .catch(err=>{
            console.log(err);
            navigate("/flights/result");
    });
    }
    
    useEffect(()=>{
        getFlight1();
        getFlight2();
    },[])
  return (
    <div className="flex flex-wrap h-full">
    <div className="flex justify-around flex-wrap w-full mt-24 ml-2">
        <div className=" flex flex-col items-center">
            <p className="font-bold text-xl text-white border-2 w-full pl-2 ml-10 bg-blue-400">Departure</p>
            <FlightPrev flight={flight1}></FlightPrev>
        </div>
        <FarePrev flight1={flight1} flight2={flight2} a={adult} c={child}/>
    </div>
     <div className="ml-24 flex flex-col mt-4  items-center">
            <p className="font-bold text-xl text-white border-2 w-full pl-2 ml-10 bg-blue-400">Return</p>
            <FlightPrev flight={flight2}></FlightPrev>
        </div>  
        <TravellerDetails adult={adult} child={child} flight1={flight1} flight2={flight2}/>
    </div>
  )
};

export default BookingPart2;
