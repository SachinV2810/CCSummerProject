import { useState } from "react";
import BookingSuccFlightPrev from "../Booking/BookingSuccFlightPrev";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebase";
import axios from "../../axios";
const UpcomingCard = ({trip,i}) => {
  const [success,setsucesss]=useState(true);
  const navigate=useNavigate();
  const Resheduled=trip.flightid.predepartureDateTime!==trip.flightid.departureDateTime  && trip.predepartureDateTime!==trip.departureDateTime;
  const firebase=useFirebase();
  const [open,setOpen]=useState(false);
  const handleClose = () => {
      setOpen(false);
      };
    const handleOpen = () => {

      setOpen(true);
    };
  const {user}=firebase;
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

function formatISODate2(isoDate) {
            const date = new Date(isoDate);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
            return date.toLocaleString('en-US', options);
    }



    const [hide,sethide]=useState(false);
    const handleCancel=()=>{
      handleClose()
      axios.delete(`/users/cancel/${trip._id}/${trip.booking._id}/${trip.flightid._id}/${user.uid}`,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':firebase.token
        }
      }).then((res)=>{
          window.location.reload();
          setsucesss(true);
          setTimeout(() => {
            setsucesss(false);
          }, 5000);
        
        })
      .catch(err=>console.log(err));
    }
  return (
     <div className="mb-10">
        <div className="w-3/4 flex text-lg items-center justify-between hover:cursor-pointer h-12 ml-40 shadow-lg pl-6" onClick={()=>sethide(!hide)}><div className="flex">Upcoming Flight {i}
        {Resheduled && <div className="bg-red-300 h-8 w-32 rounded-xl text-center">Resheduled</div>}</div>
        <div>{hide?<KeyboardArrowDownIcon fontSize="large" />:<KeyboardArrowUpIcon fontSize="large" />}</div>
        </div>
        {hide && <div className=" w-3/4 pb-10 pt-8 shadow-sm h-max shadow-orange-400 ml-40 pl-4 pr-4 ">
              <div className="flex justify-between">
                <div><span className="font-bold">Booking Id</span> {trip?.booking._id}</div>
                <div><span className="font-bold">Booking date </span> {formatISODate2(trip?.booking.bookingDate).split("GMT")[0]}</div>
                </div> 
               <div><span className="font-bold">Price Paid</span> &#x20B9;{trip?.booking.totalPrice}</div>
               {Resheduled && <div className="flex justify-between">
                     <div><span className="font-bold">Previous Departure Details </span>{formatISODate(trip.predepartureDateTime)}</div>
                    <div><span className="font-bold">Previous Arrival Details </span>{formatISODate(trip.prearrivalDateTime)}</div>
                    
               </div>}
               <div className="flex justify-between">
                     <div><span className="font-bold">Departure Details </span>{formatISODate(trip.flightid.departureDateTime)}</div>
                    <div><span className="font-bold">Arrival Details </span>{formatISODate(trip.flightid.arrivalDateTime)}</div>
                    
               </div>
              
               <div>
                <BookingSuccFlightPrev flight={trip.flightid}/>
               </div>
               <div className="w-full ">
              <div className='text-center text-xl font-semibold text-blue-400 mt-6'>Traveller Details</div> 
              <div className="text-center flex p-4 justify-center flex-wrap ml-4 w-3/4 items-center">
                {trip.booking.adultDetails.map((adult,i) => {
                  return (
                    <div className="flex w-full ">
                      <div className="text-lg font-medium mr-6 items-center">Adult {i+1}</div>
                      <div className="text-lg">Name-{adult.firstName} {adult.lastName}</div>
                    </div>
                  );
                })} 
              </div>
              <div className="text-center flex p-4 justify-center flex-wrap ml-4 w-3/4 items-center">
                {trip.booking.childDetails.map((child,i) => {
                  return (
                    <div className="flex w-full ">
                      <div className="text-lg font-medium mr-6 items-center">Child {i+1}</div>
                      <div className="text-lg">Name-{child.firstName} {child.lastName}</div>
                    </div>
                  );
                })} 
              </div>
            </div>

               <div className="border-2 relative bottom-0 pl-2 mt-6">
                <div className="font-medium">Web-CheckIn will open 48 hours before flight departure</div>
                <div>*Notification about Web-checkIn will be send to email provided at time of booking</div>
                </div>
                <div className="justify-end flex mt-8">
                  {/* <div><button className="bg-orange-300 pl-2 pr-2 text-lg rounded ml-4 hover:">Modify</button></div> */}
                  <div><button className="bg-orange-500 pl-2 pr-2 text-lg rounded ml-4 hover:" onClick={handleOpen}>Cancel</button></div>
                </div>
        </div>}
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 8}}
        open={open}
      >
        <div className='w-1/4 h-64 bg-white rounded pl-4 pr-4 pt-2 pb-2' >
          <div className='text-black font-bold text-2xl text-center'>Cancel Your Trip</div>
          <div className='text-black  text-md mt-4 text-center'>Money paid with cancellation charged &#x20B9;{trip.booking.totalPrice-trip.flightid.cancel} will be refunded to your Bank Account</div>
          <div className='mt-8 flex flex-wrap'> 
          <button className='w-full text-xl bg-orange-600 rounded mb-6 pt-1 pb-1' onClick={handleCancel}>Cancel</button>
          <button className='w-full text-blue-500 border-2 pt-2 pb-2 border-blue-400 rounded' onClick={handleClose}>No,Close This</button>
          </div>
        </div>
        
      </Backdrop>
    </div>
  )
};

export default UpcomingCard;
