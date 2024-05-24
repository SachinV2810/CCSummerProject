import { useState,useEffect } from "react";
import { useFirebase } from "../../firebase";
import { CircularProgress } from "@mui/material";
const ProfilePrrevTop = () => {
    const firebase=useFirebase();
    const currUser=firebase.user;
    const [loading,setloading]=useState(false);
    const [photoUrl,setPhotoUrl]=useState('https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=');

    const handleChange=(e)=>{
        firebase.upload(e.target.files[0],currUser,setloading);
    }
        
    useEffect(()=>{
        if(currUser?.photoURL){
            setPhotoUrl(currUser.photoURL);
        }
    },[firebase.user])
  return (
      <div className="flex w-3/4 flex-wrap -mt-32 bg-white rounded-lg shadow-md shadow-slate-400 items-center justify-center p-4">
        <div className=" mr-10">{loading?<CircularProgress/>:<img src={photoUrl} className="rounded-full border-4 border-orange-400 w-40 h-40"></img>}
        <label className={loading?"hidden":"text-blue-800 hover:cursor-pointer"}>
        <input type="file" accept="image/jpeg" onChange={handleChange} className="hidden"></input>
         Change profile image
        </label>

        </div>
        <div className=" ">
            <p className="font-bold text-xl">{currUser.displayName?currUser.displayName:"New User"}</p>
            <p>{currUser.phoneNumber?currUser.phoneNumber:"9310432578"}</p>
            <p>{currUser.email}</p>
        </div>
    </div> 
  )
};

export default ProfilePrrevTop;
