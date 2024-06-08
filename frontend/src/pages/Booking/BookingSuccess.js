import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import Header from "../extras/Header";
import { CircularProgress } from "@mui/material";
import { useFirebase } from "../../firebase";
import BookingSuccFlightPrev from "./BookingSuccFlightPrev";

const BookingSuccess = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const currUser = firebase.user;
  const { flightid1, flightid2, orderId, paymentId } = useParams();
  const [flight, setFlight] = useState(JSON.parse(localStorage.getItem("flight")) || {});
  const [flight2, setFlight2] = useState(JSON.parse(localStorage.getItem("flight2")) || {});
  const [bookingid, setBookingId] = useState(localStorage.getItem("bookingid") || '');
  const [loader, setLoader] = useState(false);
  const date = new Date();
  const curdate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const [travellerDetails, setTravellerDetails] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    const body = window.localStorage.getItem("travelBody");
    if (body) {
      setTravellerDetails(JSON.parse(body));
    }
  }, []);

  useEffect(() => {
    if (travellerDetails) {
      axios.post("/payment/addbooking", { travellerDetails, flightid1, flightid2, orderId, paymentId, currUser }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .then((res) => {
        setFlight(res.data.flight);
        if (res.data.flight2) {
          setFlight2(res.data.flight2);
          localStorage.setItem("flight2", JSON.stringify(res.data.flight2));
        }
        else{
            localStorage.removeItem('flight2')
            setFlight2({});
        }
        setBookingId(res.data.bookingid);
        localStorage.setItem("flight", JSON.stringify(res.data.flight));
        localStorage.setItem("bookingid", res.data.bookingid);
      })
      .catch((error) => {
        setErr(error.response.data);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
    }
  }, [travellerDetails]);

  return (
    <>
      <div className="w-full pt-32 flex justify-center">
        {err === '' ? (
          <div className="h-max w-3/4 pb-20 flex flex-wrap justify-center shadow-blue-400 shadow-md">
            <div className="text-2xl text-center font-bold ">Thanks For Choosing us, Flight Booked Successfully !</div>
            <div className="flex w-full justify-evenly mt-4">
              <div>Payment Id: {paymentId}</div>
              <div>Booking date: {curdate}</div>    
              <div> Booking Id:{bookingid}</div>          
            </div>
            <div className="w-full bg-black" style={{height:"0.2px"}}></div>
            {Object.keys(flight2).length!==0? (
              <div>
                <div className="w-full mt-4">
                  <p className="font-bold text-center text-lg">Departure</p>
                  <BookingSuccFlightPrev flight={flight}/> 
                </div>
                <div className="mt-6">
                  <p className="font-bold text-center text-lg">Return</p>
                  <BookingSuccFlightPrev flight={flight2}/>
                </div>
              </div>
            ) : (
              <BookingSuccFlightPrev  flight={flight}/>
            )}
            <div className="w-full ">
              <div className='text-center text-xl font-semibold text-blue-400 mt-6'>Traveller Details</div> 
              <div className="text-center shadow-md flex p-4 justify-center flex-wrap ml-36 w-3/4 items-center">
                {travellerDetails && travellerDetails[0].map((adult,i) => {
                  return (
                    <div className="flex w-full ">
                      <div className="text-md font-medium mr-6 items-center">Adult {i+1}</div>
                      <div className="">Name-{adult.firstName} {adult.lastName}</div>
                    </div>
                  );
                })} 
              </div>
              <div>
                {travellerDetails && travellerDetails[1].map((child,i) => {
                  return (
                    <div key={i}>
                      <div>Child {i+1}</div>
                      <div>Name-{child.firstName} {child.lastName}</div>
                    </div>
                  );
                })} 
              </div>
            </div>
          </div>
        ) : (
          <div>
            Thank you, Session Timeout taking you to the Booking page
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default BookingSuccess;
