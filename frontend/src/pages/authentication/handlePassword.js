import { useState } from "react";
import { useFirebase } from "../../firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from "react-router-dom";
import axios from "../../axios";
const HandlePass=()=>{
    const [email,setEmail]=useState("");
    const [err,setErr]=useState("");
    const [sent,setsent]=useState(false);
    const [loader,setloader]=useState(false);
    const firebase=useFirebase();
    const handleChange=(e)=>{
      setErr("");
        setEmail(e.target.value);
    }
    const handleSubmit=async(e)=>{
      setloader(true);
        e.preventDefault();
        const res=await axios.get("/admin/allusers",{
          headers:{
            'Content-Type':'application/json',
          }
        })
        if(res){
          const users=res.data;
          const found=users.some(user=>user.email===email);
            if(found){
              sendPasswordResetEmail(firebase.firebaseAuth,email,{
            url:"https://projectclientside.vercel.app/login"
        })
        .then((res)=>{
            setsent(true);
            setloader(false);
    
        })
        .catch(err=>{
            console.log(err);
            setErr("error from firebase");
            setloader(false);
        })
            }
            else{
              setloader(false);
              setErr("user is not registered with us !");
            }
          }
          
        }
        
    
    // sendPasswordResetEmail(firebase.firebaseAuth,email);

    return(
      <>
         {loader && <LinearProgress color="secondary" className="w-full h-2"/>}
         <div style={{backgroundImage:"url('./login.jpg')"}} className="w-full h-screen bg-cover flex justify-center items-center flex-wrap ">
      {err.length===0?"":<div className="w-96 h-8 bg-red-700 absolute top-40 text-white text-center rounded pt-1"><FontAwesomeIcon icon={faXmarkCircle} className="mr-2"/>{err}</div>}
        <div className="h-80 w-96 bg-white/75  text-center flex flex-wrap justify-center items-center">
          {sent?<div className="text-xl">
            Password reset link sent to your email!    
        </div>:
          <div>
          <div className="merienda relative top-6 h-20">Forget Password</div>
          <form className="h-2/3 flex flex-wrap justify-center items-center" onSubmit={handleSubmit}>
            
            <input 
            placeholder="registered email" 
            type="email" 
            name="email"
            required style={ {outline:"none"}} 
            className="w-3/4 h-12 pl-4 rounded-xl"
            value={email}
            onChange={handleChange}
            autoComplete="off"
            ></input>
            <button className="w-3/4 mt-8 h-12 rounded-xl text-white font-bold text-md" style={{backgroundColor:"#ff6d38"}}>Send Password reset mail</button>
            <Link className="w-full text-blue-900 mt-4" to="/login">Login</Link>
          </form>
          </div>
        }
        </div>

    </div>
    </>
    )
} 

export default HandlePass;
