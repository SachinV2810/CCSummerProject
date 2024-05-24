import { useState } from "react";
import ResultCard2 from "./ResultCard2";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
const ResultCard = ({flightdata,a,c,w}) => {
    function extractDateTimeParts(date) {
            console.log(date);
            const datePart = date.slice(0, 10); // Extracts "YYYY-MM-DD"
            const timePart = date.slice(11, 16); // Extracts "HH:mm"
            return { date: datePart, time: timePart };
            }
    const departedPart=extractDateTimeParts(flightdata.departureDateTime)
    const arrivalPart=extractDateTimeParts(flightdata.arrivalDateTime);
    const navigate=useNavigate();
    const [hideMore,sethideMore]=useState(false);
    const handleReview=()=>{
        navigate(`/flights/review/${flightdata._id}/${a}/${c}`);
    }
  return (
    <div className={hideMore? "w-full flex mb-60  md:mb-48 ease-in-out duration-200":"w-full mb-10 flex  "}>
    <div className="bg-white shadow-lg border-2 shadow-blue-500/50 w-80 md:w-2/3 h-64 md:h-36  pl-4 pr-4">
        <p className="font-medium">{flightdata.airline}</p>
        <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-20">
                <p>{flightdata.departureAirport}</p>
                <p className="font-bold text-xl">{departedPart.time}</p>
            </div>
            <div className="self-end"> 
                <p className="font-bold text-lg">{Math.abs(Number(departedPart.time.split(':')[0])-Number(arrivalPart.time.split(':')[0]))}h{Math.abs(Number(departedPart.time.split(':')[1])-Number(arrivalPart.time.split(':')[1]))}m</p>
            </div>
            <div className="w-full md:w-20">
                <p>{flightdata.arrivalAirport}</p>
                <p className="font-bold text-xl">{arrivalPart.time}</p>
            </div>
            <div className="font-semibold text-lg self-end w-full md:w-12">&#8377;{flightdata.price}</div>
           {w==='oneway' && <button className='bg-orange-400 w-28 h-6 text-white font-bold text-md rounded-md hover:bg-orange-500' onClick={handleReview}>Book</button>
            }
        </div>
        <div className="justify-between w-full mt-4 flex">
            <div>
                <Rating name="read-only" value={2} readOnly />
            </div>
            <button onClick={()=>sethideMore(!hideMore)}>Read more</button>
        </div>
        
    </div>
        <ResultCard2 value={hideMore} flightdata={flightdata}/>
    </div>
  )
};

export default ResultCard;
