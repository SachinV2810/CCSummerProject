import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
const ResultCard = ({flightdata,a,c,w}) => {
    function formatISODate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); 
    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}`;

    return formattedDate;
}
    function getTimeDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffMs = Math.abs(d2 - d1);

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${diffHours}h${diffMinutes}m`;
}

    const date=new Date();
    const navigate=useNavigate();
    const [hideMore,sethideMore]=useState(false);
    const [hideReviews,sethideReviews]=useState(false);
    const handleReview=()=>{
        navigate(`/flights/review/${flightdata._id}/${a}/${c}`);
    }
  return (
    <div className="flex flex-wrap justify-center md:w-3/4 w-full  shadow-lg shadow-blue-300 border-2 border-yellow-300 mb-16">
        <div className="w-full md:pl-24 pl-14 ">
            <span className="mr-2">{flightdata.airline}</span>
            <span>{flightdata.flightNumber}</span>
        </div>
        <div className="flex md:w-4/5 w-3/4 items-center md:justify-around ">
            <div className="flex flex-col md:mr-0 mr-6">
                <span className="m">{flightdata.departureAirport}</span>
                <span className="font-semibold text-md">{formatISODate(flightdata.departureDateTime)}</span>
            </div>
            <div className="md:block hidden">
                <span className="font-medium">{getTimeDifference(flightdata.departureDateTime,flightdata.arrivalDateTime)}</span>
            </div>
            <div className="flex flex-col">
                <span className="m">{flightdata.arrivalAirport}</span>
                <span className="font-semibold text-md">{formatISODate(flightdata.arrivalDateTime)}</span>
            </div>
            <div >
                <span className="font-semibold text-xl">&#8377;{flightdata.price.toLocaleString("en-IN")}</span>
            </div>
            <div >
                <button className="bg-orange-400 w-20 text-white font-bold rounded-md md:ml-0 ml-2" onClick={handleReview}>Book</button>
            </div>
        </div>
        <div className="w-full flex justify-end pr-24">
            <span className="text-blue-700 cursor-pointer" onClick={()=>sethideReviews(!hideReviews)}>Read Reviews</span>
        </div>
        {hideReviews && 
        <div className="w-full  overflow-y-scroll h-36 overflow-x-hidden border-2 mt-4 pb-4 flex flex-wrap ">
            {flightdata.reviews.length!==0 && flightdata.reviews.map((review)=>{
                return <div key={review._id} className="w-full mt-1">
                    <div className="w-full ml-20">
                        <Rating value={review.rating} size="small"></Rating>
                    </div>
                    <div className="w-full ml-20">
                        <p className="italic">{review.comment} </p>
                    </div>
                </div>
            })}
            {flightdata.reviews.length==0 && <div className="w-full ml-20">
                        <p className="italic text-xl">No reviews yet </p>
                    </div>}
            
        </div>}
    </div>
  );
};

export default ResultCard;
