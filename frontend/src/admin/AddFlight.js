import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { getIdToken } from "firebase/auth";
import { useFirebase } from "../firebase";

const AddFlight = () => {
    const date = new Date();
    const firebase=useFirebase()
    const curdate=`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const curtime=`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    const Navigate=useNavigate();
    const [loader,setloader]=useState(false);
    const [err,setErr]=useState('');
    const [flight, setFlight] = useState({
        AName: "",
        Fno: "",
        DA: "",
        AA: "",
        DD:curdate ,
        DT: curtime,
        AD: curdate,
        AT: curtime,
        price: "",
        AS:"",
        checkInBag:"",
        cabinBag:"",
        cancelCharge:"",
        seatClass: ""
    });

    const handleChange = (e) => {
        setErr('');
        const { name, value } = e.target;
        setFlight((prevFlight)=>{
            return {...prevFlight,[name]:value}
        })
    }

    const handleSubmit = (e) => {
        setloader(true);
        e.preventDefault();
        axios.post("/addflight",flight,{
            headers:{
                'Content-Type':'application/json', 
                'Authorization':firebase.token
            },
            withCredentials:true
        })
        .then((res)=>{
            if(res.status==200){
                console.log("saved");
                Navigate("/admin");
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
                <input placeholder="Airline Name" type="text" required name="AName" value={flight.AName} onChange={handleChange}></input>
                <input placeholder="Flight Number" name="Fno" type="Number" required value={flight.Fno} onChange={handleChange}></input>
                <input placeholder="Departure Airport" name="DA" type="text" required value={flight.DA} onChange={handleChange}></input>
                <input placeholder="Arrival Airport" name="AA" type="text" required value={flight.AA} onChange={handleChange}></input>
                <input placeholder="Departure Date" name="DD" min={curdate} required value={flight.DD} type="date" onChange={handleChange}></input>
                <input placeholder="Departure Time" name="DT"  required value={flight.DT} type="time" onChange={handleChange}></input>
                <input placeholder="Arrival Date" name="AD"required min={curdate}  value={flight.AD} type="date" onChange={handleChange}></input>
                <input placeholder="Arrival Time" name="AT"required value={flight.AT} type="time" onChange={handleChange}></input>
                <input placeholder="Available Seats" name="AS"required value={flight.AS} type="Number" onChange={handleChange}></input>
                <input placeholder="Price in INR" name="price"required type="number" value={flight.price} onChange={handleChange}></input>
                <input placeholder="Checkin Bag limit(in kg)"required name="checkInBag" type="Number" value={flight.checkInBag} onChange={handleChange}></input>
                <input placeholder="Cabin Bag limit(in kg)"required name="cabinBag"type="Number"  value={flight.cabinBag} onChange={handleChange}></input>
                <input placeholder="Cancellation Charges"required name="cancelCharge"type="Number" value={flight.cancelCharge} onChange={handleChange}></input>
                <input placeholder="Seat Classes" type="Text" name="seatClass"required value={flight.seatClass} onChange={handleChange} ></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddFlight;
