import { useEffect,useState } from "react";
import axios from "../axios";

const BookFlights = () => {
    const [BookFlights,setBookFlights]=useState([]);
    useEffect(()=>{
        axios.get("/getbookings",{headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
        
        }).then(res=>{
            setBookFlights(res.data)
            console.log(res.data);
    });
    },[])
  return (
    <div>
      {BookFlights.map((flight,n)=>{
        return(
            <div key={flight._id} className="bg-blue-200 flex justify-between ml-6 mr-8" >
                <div>{n+1}). </div>
                <div>flight type:{flight.flight[1]===null?'ONE-WAY':"ROUND"}</div>
                <div>Booking id:{flight._id}</div>
                <div>Revenue made:{flight.totalPrice}</div>
                <div>Canceled:{flight.Cancelled}</div>
                <div>Contact email:{flight.contactEmail}</div>
            </div>
        )
      })}
    </div>
  )
};

export default BookFlights;
