import { useState } from "react";
import Upcoming from "./Upcoming";
import Completed from "./Completed";
const TripsPage = () => {
    const [su,setsu]=useState(true);
    const [sco,setco]=useState(false);
    
  return (
    <>
    <div className="bg-blue-500 w-full h-32 absolute top-20 z-10">
       <p className="text-white font-bold w-1/3 mt-8 text-center text-2xl">Your Trips</p>
       <div className="flex w-3/4 justify-evenly">
        <div className={su?"text-white font-semibold mt-8 text-center text-lg border-b-4 w-60" :" w-60 text-white font-semibold mt-8 text-center text-lg"} style={{cursor:"pointer"}} onClick={()=>{setco(false);  setsu(true)}}>Upcoming Bookings</div>

        <div className={sco?"text-white font-semibold mt-8 text-center text-lg border-b-4 w-60" :" w-60 text-white font-semibold mt-8 text-center text-lg"} style={{cursor:"pointer"}} onClick={()=>{setco(true);  setsu(false)}}>Completed Bookings</div>
       </div>
    </div>
    {su && <Upcoming/>}
    {sco && <Completed/>}
    </>
  )
};

export default TripsPage;
