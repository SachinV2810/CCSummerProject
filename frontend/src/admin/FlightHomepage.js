import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";

  
const FlightHomepage = () => {
let [flights,setflights]=useState([]);
function formatISODate(isoDate) {
            const date = new Date(isoDate);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
            return date.toLocaleString('en-US', options);
    }
let navigate = useNavigate();
    const getflights=()=>{
        axios.get("/admin/activeflights",{
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
      <Header/>
      <div className="text-center text-3xl mb-4 font-bold italic text-blue-600 pt-20">All Active Flights</div>
      <table className="table-auto ml-28 mt-12 border-2 ">
  <thead>
    <tr className="bg-blue-400">
      <th className="px-4 py-2 border-r-2">No.</th>
      <th className="px-4 py-2 border-r-2">Airline & Flight Number</th>
      <th className="px-4 py-2 border-r-2">Departure</th>
      <th className="px-4 py-2 border-r-2">Arrival</th>
      <th className="px-4 py-2 border-r-2">Available Seats</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {flights.map((flight, index) => (
      <tr key={flight._id} className="">
        <td className="border px-4 py-2">{index + 1}</td>
        <td className="border px-4 py-2">{flight.airline} {flight.flightNumber}</td>
        <td className="border px-4 py-2">
          <div>Departure Airport: {flight.departureAirport}</div>
          <div>Departure Time:  <span className="text-blue-800">{formatISODate(flight.departureDateTime)}</span> </div>
        </td>
        <td className="border px-4 py-2">
          <div>Arrival Airport: {flight.arrivalAirport}</div>
          <div>Arrival Time:  <span className="text-blue-800">{formatISODate(flight.arrivalDateTime)}</span> </div>
        </td>
        <td className="border px-4 py-2">{flight.availableSeats}</td>
        <td className="border px-4 py-2">
          <button className="text-blue-700 font-bold italic"  onClick={()=>{
                if(new Date(flight.departureDateTime)<new Date() && new Date(flight.arrivalDateTime)>new Date()){
                  toast.warn("flight has departured and its running! update it after arrival",{position:"top-center"})
                }
                else{
                  navigate(`/modifyflight/${flight._id}`,{state:{flight}})}}
                }>
            Edit this flight
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      <ToastContainer autoClose={2000}/>
    </div>
  )
};

export default FlightHomepage;
