import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { useEffect, useState } from "react";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import FlightPrev from "./FlightPrev";
import FarePrev from "./FarePrev";
import TravellerDetails from "./TravellerDetails";


const Booking = () => {
    const {id,adult,child}=useParams();
    const navigate=useNavigate()
    console.log(id);
    const [flight,setflight]=useState({})
    const getFlight=()=>{
        axios.get(`/users/getbreview/${id}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
        .then((res)=>{
            setflight(res.data);
        })
        .catch((err)=>{
            toast(err.response.data.msg);
            navigate("/flights/result");
            });
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
        <ToastContainer/>
    </div>
  )
};

export default Booking;
