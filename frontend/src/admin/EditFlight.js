import { useEffect, useState } from "react";
import axios from "../axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getIdToken } from "firebase/auth";
import { useFirebase } from "../firebase";
import Header from './Header'
import { CircularProgress } from "@mui/material";

const EditFlight = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const firebase=useFirebase();
    const {id}=useParams();
    const {flight}=location.state;
     const [progress,setprogress]=useState(false);
    const f=flight;
      var date = new Date(f.departureDateTime);
    var date2=new Date(f.arrivalDateTime);

     const curdate=`${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate.toString().padStart(2, '0')}`;
     
    const curtime=`${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
    const curdate2=`${date2.getUTCFullYear()}-${(date2.getUTCMonth() + 1).toString().padStart(2, '0')}-${date2.getUTCDate.toString().padStart(2, '0')}`;
    const curtime2=`${date2.getUTCHours().toString().padStart(2, '0')}:${date2.getUTCMinutes().toString().padStart(2, '0')}`;
    const [err,setErr]=useState('');
    const [flight2, setFlight] = useState({
        AName: f.airline,
        Fno: f.flightNumber,
        DA: f.departureAirport,
        AA: f.arrivalAirport,
        DD:curdate ,
        DT: curtime,
        AD: curdate2,
        AT: curtime2,
        price: f.price,
        AS:f.availableSeats,
        checkInBag:f.baggage[0],
        cabinBag:f.baggage[1],
        cancelCharge:f.cancel,
        seatClass: f.seatClass
    });

    const handleChange = (e) => {
        setErr('');
        const { name, value } = e.target;
        setFlight((prevFlight)=>{
            return {...prevFlight,[name]:value}
        })
    }

    const handleSubmit = (e) => {
        setprogress(true);
        e.preventDefault();
        axios.post("/admin/editFlight",{flight2,id},{
            headers:{
                'Content-Type':'application/json', 
                'Authorization':firebase.token
            }
        })
        .then((res)=>{
            if(res.status==200){
                setprogress(false);
                console.log("edited");
                navigate("/admin");
            }
        }).
        catch(err=>{
            setprogress(false);
            console.log(err);
            setErr(err.response.data.msg);
        })
    }

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
        <div>
            <Header/>
            <p className="text-center pt-20">*All fields are compulsory</p>
            <div className="text-center text-3xl mb-4 font-bold italic text-blue-600">Fill Your Flight Details </div>
            <form onSubmit={handleSubmit} className="flex flex-wrap ml-96 w-1/2 ">
                <input placeholder="Airline Name" type="text" className="w-full outline-blue-200 border-2 border-blue-200 disabled:bg-green-100 h-8 pl-2 mb-4" required name="AName" value={flight2.AName} disabled></input>

                <input placeholder="Flight Number" name="Fno" type="Number" className="w-full outline-blue-200 border-2 disabled:bg-green-100 border-blue-200 h-8 pl-2 mb-4 mb-4" required value={flight2.Fno} disabled></input>

                <input placeholder="Departure Airport" name="DA" className="w-full outline-blue-200 border-2 border-blue-200 disabled:bg-green-100 h-8 pl-2 mb-4" type="text" required value={flight2.DA} disabled></input>

                <input placeholder="Arrival Airport" name="AA" type="text" className="w-full outline-blue-200 border-2 border-blue-200 disabled:bg-green-100 h-8 pl-2 mb-4" required value={flight2.AA} disabled></input>

                <label className="w-full" htmlFor="DD">Departure Details:</label>
                <input placeholder="Departure Date" name="DD" id="DD"  className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"  required value={flight2.DD} type="date" onChange={handleChange}></input>

                <input placeholder="Departure Time" name="DT" id="DD"  required value={flight2.DT} className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" type="time" onChange={handleChange}></input>

                <label className="w-full" htmlFor="AA">Arrival Details:</label>
                <input placeholder="Arrival Date" name="AD"required className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" id="AA" value={flight2.AD} type="date" onChange={handleChange}></input>
                <input placeholder="Arrival Time" name="AT"required value={flight2.AT} className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" id="AA" type="time" onChange={handleChange}></input>
                <input placeholder="Available Seats" className="w-1/4 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" name="AS"required value={flight2.AS} type="Number" onChange={handleChange}></input>

                <input placeholder="Price in INR" name="price"required type="number" value={flight2.price} onChange={handleChange} className="w-1/4 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"></input>

                <input placeholder="Checkin Bag limit(in kg)"required name="checkInBag" type="Number" value={flight2.checkInBag} onChange={handleChange} className="w-1/4 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"></input>

                <input placeholder="Cabin Bag limit(in kg)"required name="cabinBag"type="Number"  value={flight2.cabinBag} onChange={handleChange} className="w-1/4 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"></input>

                <input placeholder="Cancellation Charges"required name="cancelCharge"type="Number" value={flight2.cancelCharge} onChange={handleChange} className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"></input>
                <input placeholder="Seat Classes" type="Text" name="seatClass"required value={flight2.seatClass} disabled className="w-1/2 disabled:bg-green-100 outline-blue-200 border-2 border-blue-200 h-8 pl-2" ></input>
                <button className="w-full shadow-lg hover:shadow-sm bg-blue-400  text-xl rounded-md">Edit</button>
            </form>
        </div>
    );
};

export default EditFlight;
