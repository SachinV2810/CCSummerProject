import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { getIdToken } from "firebase/auth";
import { useFirebase } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";

const AddFlight = () => {
    const firebase=useFirebase()
    const Navigate=useNavigate();
    const [err,setErr]=useState('');
    const [flight, setFlight] = useState({
        AName: "",
        Fno: "",
        DA: "",
        AA: "",
        DD:"" ,
        DT: "",
        AD: "",
        AT: "",
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
        e.preventDefault();
        axios.post("/admin/addflight",flight,{
            headers:{
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
            toast.error(err.response.data.msg,{
                position:"top-center"
            })
        })
    }

    return (
        <div>
            <Header/>
            <p className="text-center pt-20">*All fields are compulsory</p>
            <div className="text-center text-3xl mb-4 font-bold italic text-blue-600">Fill Your Flight Details </div>
            <form onSubmit={handleSubmit} className="flex flex-wrap ml-96 w-1/2 ">
                <input placeholder="Airline Name" type="text" className="w-full outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" required name="AName" value={flight.AName} onChange={handleChange}></input>

                <input placeholder="Flight Number" name="Fno" type="Number" className="w-full outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4 mb-4" required value={flight.Fno} onChange={handleChange}></input>

                <input placeholder="Departure Airport" name="DA" className="w-full outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" type="text" required value={flight.DA} onChange={handleChange}></input>

                <input placeholder="Arrival Airport" name="AA" type="text" className="w-full outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" required value={flight.AA} onChange={handleChange}></input>

                <label className="w-full" htmlFor="DD">Departure Details:</label>
                <input placeholder="Departure Date" name="DD" id="DD"  className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"  required value={flight.DD} type="date" onChange={handleChange}></input>

                <input placeholder="Departure Time" name="DT" id="DD"  required value={flight.DT} className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" type="time" onChange={handleChange}></input>

                <label className="w-full" htmlFor="AA">Arrival Details:</label>
                <input placeholder="Arrival Date" name="AD"required className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" id="AA" value={flight.AD} type="date" onChange={handleChange}></input>
                <input placeholder="Arrival Time" name="AT"required value={flight.AT} className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" id="AA" type="time" onChange={handleChange}></input>
                <input placeholder="Available Seats" className="w-1/4 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4" name="AS"required value={flight.AS} type="Number" onChange={handleChange}></input>

                <input placeholder="Price in INR" name="price"required type="number" value={flight.price} onChange={handleChange} className="w-1/4 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"></input>

                <input placeholder="Checkin Bag limit(in kg)"required name="checkInBag" type="Number" value={flight.checkInBag} onChange={handleChange} className="w-1/4 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"></input>

                <input placeholder="Cabin Bag limit(in kg)"required name="cabinBag"type="Number"  value={flight.cabinBag} onChange={handleChange} className="w-1/4 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"></input>

                <input placeholder="Cancellation Charges"required name="cancelCharge"type="Number" value={flight.cancelCharge} onChange={handleChange} className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2 mb-4"></input>
                <input placeholder="Seat Classes" type="Text" name="seatClass"required value={flight.seatClass} onChange={handleChange} className="w-1/2 outline-blue-200 border-2 border-blue-200 h-8 pl-2" ></input>
                <button className="w-full shadow-lg hover:shadow-sm bg-blue-400  text-xl rounded-md">Submit</button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default AddFlight;
