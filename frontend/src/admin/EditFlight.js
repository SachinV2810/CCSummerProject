import { useEffect, useState } from "react";
import axios from "../axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getIdToken } from "firebase/auth";
import { useFirebase } from "../firebase";

const EditFlight = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const firebase=useFirebase();
    const {id}=useParams();
    const {flight}=location.state;
    const f=flight;
      var date = new Date(f.departureDateTime);
    var date2=new Date(f.arrivalDateTime);

     const curdate=`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const curtime=`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    const curdate2=`${date2.getFullYear()}-${(date2.getMonth() + 1).toString().padStart(2, '0')}-${date2.getDate().toString().padStart(2, '0')}`;
    const curtime2=`${date2.getHours().toString().padStart(2, '0')}:${date2.getMinutes().toString().padStart(2, '0')}`;
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
        e.preventDefault();
        axios.post("/editFlight",{flight2,id},{
            headers:{
                'Content-Type':'application/json', 
                'Authorization':firebase.token
            },
            withCredentials:true
        })
        .then((res)=>{
            if(res.status==200){
                console.log("edited");
                navigate("/admin");
            }
        }).
        catch(err=>{
            console.log(err);
            setErr(err.response.data.msg);
        })
        console.log(flight);
    }

    return (
        <div>
            {err?<p>{err}</p>:""}
            <p>*All fields are compulsory</p>
            <form onSubmit={handleSubmit} className="flex flex-col w-60">
                <input placeholder="Airline Name" type="text" required name="AName" value={flight2.AName} onChange={handleChange}></input>
                <input placeholder="Flight Number" name="Fno" type="Number" required value={flight2.Fno} onChange={handleChange}></input>
                <input placeholder="Departure Airport" name="DA" type="text" required value={flight2.DA} onChange={handleChange}></input>
                <input placeholder="Arrival Airport" name="AA" type="text" required value={flight2.AA} onChange={handleChange}></input>
                <input placeholder="Departure Date" name="DD" min={curdate} required value={flight2.DD} type="date" onChange={handleChange}></input>
                <input placeholder="Departure Time" name="DT"  required value={flight2.DT} type="time" onChange={handleChange}></input>
                <input placeholder="Arrival Date" name="AD"required min={curdate}  value={flight2.AD} type="date" onChange={handleChange}></input>
                <input placeholder="Arrival Time" name="AT"required value={flight2.AT} type="time" onChange={handleChange}></input>
                <input placeholder="Available Seats" name="AS"required value={flight2.AS} type="Number" onChange={handleChange}></input>
                <input placeholder="Price in INR" name="price"required type="number" value={flight2.price} onChange={handleChange}></input>
                <input placeholder="Checkin Bag limit(in kg)"required name="checkInBag" type="Number" value={flight2.checkInBag} onChange={handleChange}></input>
                <input placeholder="Cabin Bag limit(in kg)"required name="cabinBag"type="Number"  value={flight2.cabinBag} onChange={handleChange}></input>
                <input placeholder="Cancellation Charges"required name="cancelCharge"type="Number" value={flight2.cancelCharge} onChange={handleChange}></input>
                <input placeholder="Seat Classes" type="Text" name="seatClass"required value={flight2.seatClass} onChange={handleChange} ></input>
                <button type="submit">Edit Flight</button>
            </form>
        </div>
    );
};

export default EditFlight;
