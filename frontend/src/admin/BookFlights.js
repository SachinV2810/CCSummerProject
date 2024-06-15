import { useEffect,useState } from "react";
import { CircularProgress, LinearProgress } from "@mui/material";
import axios from "../axios";
import Header from "./Header";
import { useFirebase } from "../firebase";

const BookFlights = () => {
    const [BookFlights,setBookFlights]=useState([]);
    const firebase=useFirebase();
    const [progress,setprogress]=useState(false);
    function formatISODate(isoDate) {
      const date = new Date(isoDate);
      const day = date.getUTCDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getUTCFullYear();
      const hours = String(date.getUTCHours()).padStart(2, '0'); 
      const minutes = String(date.getUTCMinutes()).padStart(2, '0'); 
      const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}`;
      return formattedDate;
    }
    useEffect(()=>{
      setprogress(true);
        axios.get("/admin/getbookings",{headers:{
            'Content-Type':'application/json',
            'Authorization':firebase.token
        }
        
        }).then(res=>{
          if(res.data.length!==0){
             setprogress(false);
          }
            setBookFlights(res.data)
            console.log(res.data);
    });
    },[])
    if(progress){
        return (
          <>
            <Header/>
            <div className="pt-20 relative top-44 flex justify-center">
                <CircularProgress/>
            </div>
          </>
        )
    }


  return (
    <>
    
     <Header/>
    <div className="flex justify-center pt-20 flex-wrap items-center h-full">
      <div className="text-center w-full text-3xl mb-4 font-bold italic text-blue-600">Booked and Cancelled Flights</div>
   <table className="border-collapse border border-black">
  <thead>
    <tr className="bg-blue-400">
      <th className="border border-black px-4 py-2">No.</th>
      <th className="border border-black px-4 py-2">Flight Type</th>
      <th className="border border-black px-4 py-2">Booking ID</th>
      <th className="border border-black px-4 py-2">Booking Date</th>
      <th className="border border-black px-4 py-2">Revenue Made</th>
      <th className="border border-black px-4 py-2">Canceled</th>
      <th className="border border-black px-4 py-2">Contact Email</th>
      <th className="border border-black px-4 py-2">Contact Mobile</th>
    </tr>
  </thead>
  <tbody>
    {BookFlights.length===0?<div>No flights Booked </div>:BookFlights.map((flight, index) => (
      <tr key={flight._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
        <td className="border border-black px-4 py-2">{index + 1}</td>
        <td className="border border-black px-4 py-2">{flight.flight[1] === null ? 'ONE-WAY' : 'ROUND'}</td>
        <td className="border border-black px-4 py-2">{flight._id}</td>
        <td className="border border-black px-4 py-2">{formatISODate(flight.bookingDate)}</td>
        <td className="border border-black px-4 py-2">{flight.totalPrice}</td>
        <td className="border border-black px-4 py-2 ">{flight.Cancelled}</td>
        <td className="border border-black px-4 py-2">{flight.contactEmail}</td>
        <td className="border border-black px-4 py-2">{flight.contactPhone}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
</>
  )
};

export default BookFlights;
