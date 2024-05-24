
import { CircularProgress, TextField } from "@mui/material";
import { useFirebase } from '../../firebase';
import RevProfileBot from './RevProfileBot';
import { useState } from 'react';
import { signOut, updatePassword } from "firebase/auth";
const EditProfile = () => {
    const firebase=useFirebase();
    const currUser=firebase.user;
    const [loading,setloading]=useState(false);
    const [cp,setcp]=useState(false)
    const [np,setnp]=useState('');
    const [emailEdit,setEmailedit]=useState(false);
    const [profiledata,setProfiledata]=useState({name:currUser.displayName,email:currUser.email})

    const handleChange=(e)=>{
        // if(e.target.name==='email' && e.target.value!==currUser.email){
        //     setEmailedit(true);
        // }
        // if(e.target.name==='email' && e.target.value===currUser.email){
        //     setEmailedit(false);
        // }
        setProfiledata((curdata)=>{
            return {...curdata,[e.target.name]:e.target.value};
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // if(setEmailedit){
        //     return window.alert("verify your email address");
        // }
        firebase.updateprofile(profiledata.email,currUser,profiledata.name,setloading);
        setEmailedit(false);
        setcp(false);
    }
    const changePassword=()=>{
      setcp(!cp);
    }
    const changePasswordsubmit=async(e)=>{
      e.preventDefault();
        updatePassword(currUser,np)
        .then(()=>{
          window.alert("your password is succesfully changed")
          setnp('');
          console.log("password changes");
        })
        .catch(async(err)=>{
          window.alert("session timeout");
          await signOut(firebase.firebaseAuth);
        })
      
    }
    if(!emailEdit){
      return <RevProfileBot value={setEmailedit} email={currUser.email} name={currUser.displayName}/>
    }
  return (
    <div className="flex w-3/4 flex-wrap mt-8 bg-white rounded-lg shadow-lg shadow-slate-500 items-center justify-evenly p-4 h-96">
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="text-2xl w-full text-center font-bold">Personal Information</div>
      {loading?<CircularProgress/>:<div className="w-full justify-evenly flex justify-between flex-wrap mt-4">
        <TextField 
        value={9310432578} 
        disabled 
        label="Phone number"
        variant="outlined"
        className="outline-none md:w-1/4  w-full border-2 border-orange-500 pl-2"></TextField>
            <TextField  
        variant="outlined"
        name='email'
        value={profiledata.email}
        label="email"
        onChange={handleChange}
        className="outline-none md:w-1/4 w-full ml-20 border-2 border-orange-500 pl-2">
        </TextField>
         <TextField 
        value={profiledata.name}
        onChange={handleChange}
        label="Name"
        name='name'
        variant="outlined"
        className="outline-none md:w-1/4 w-full border-2 border-orange-500 pl-2"></TextField>
      </div>
      
}
<div className='w-full justify-center flex mt-10 relative '>
        <button className='w-36 h-10 rounded-md relativet text-white text-xl hover:shadow-slate-600' style={{backgroundColor:"#ff6d38"}}>Save</button>
        <button className='w-60 h-10 rounded-md relativet text-white ml-10 text-xl hover:shadow-slate-600' type='button' style={{backgroundColor:"#ff6d38"}} onClick={changePassword}>Change Password</button>
    </div> 
</form>
    {cp && <form className="flex" onSubmit={changePasswordsubmit}>
      <TextField label="new password" type="password" value={np} onChange={(e)=>setnp(e.target.value)}/>
      <button className="border-2 pr-4 pl-3">Change</button>
      </form>}
    </div>
  )
};

export default EditProfile;
