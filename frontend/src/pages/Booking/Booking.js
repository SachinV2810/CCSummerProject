import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { useEffect, useState } from "react";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import FlightPrev from "./FlightPrev";
import FarePrev from "./FarePrev";
import TravellerDetails from "./TravellerDetails";
import { useFirebase } from "../../firebase";

const Booking = () => {
    const {id,adult,child}=useParams();
  const firebase=useFirebase();
    const navigate=useNavigate()
    console.log(id);
    const [flight,setflight]=useState({})
    const getFlight=()=>{
      firebase.setloader(true);
        axios.get(`/users/getbreview/${id}`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            setflight(res.data);
          firebase.setloader(false);
        })
        .catch((err)=>{
            toast(err.response.data.msg);
            navigate("/flights/result");
            });
      
    }
    useEffect(()=>{
        getFlight();
    },[])
 if (!firebase.loader) {
    return (
        <div className="flex flex-wrap h-full">
            <div className="flex md:nowrap wrap justify-around md:w-full  mt-24">
                <FlightPrev flight={flight} />
                <FarePrev flight1={flight} a={adult} c={child} />
            </div>
            <TravellerDetails adult={adult} child={child} flight1={flight} />
            <ToastContainer />
        </div>
    );
}

return null;
};

export default Booking;
