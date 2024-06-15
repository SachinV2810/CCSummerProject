import React, { useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useFirebase } from '../../firebase';
const TravellerDetails = ({ adult, child, flight1,flight2 }) => {
     const [open, setOpen] = useState(false);
      const firebase=useFirebase();
    const handleClose = () => {
      setOpen(false);
      };
    const handleOpen = () => {

      setOpen(true);
    };
    const navigate = useNavigate();
  const [adultData, setAdultData] = useState(
    Array.from({ length: Number(adult) }, () => ({ firstName: '', lastName: '', aadhar: '' }))
  );
  const [childData, setChildData] = useState(
    Array.from({ length: Number(child) }, () => ({ firstName: '', lastName: '' }))
  );
  const [contactInfo, setContactInfo] = useState({ email: '', mobile: '' });

  const handleInputChange = (index, field, value, isAdult = true) => {
    const data = isAdult ? [...adultData] : [...childData];
    data[index][field] = value;
    isAdult ? setAdultData(data) : setChildData(data);
  };

  const handleContactChange = (field, value) => {
    setContactInfo({ ...contactInfo, [field]: value });
  };
  
     const validateInputs = () => {
    for (let i = 0; i < adultData.length; i++) {
      if (!adultData[i].firstName || !adultData[i].lastName || !adultData[i].aadhar) {
        return false;
      }
    }
    for (let i = 0; i < childData.length; i++) {
      if (!childData[i].firstName || !childData[i].lastName) {
        return false;
      }
    }
    if (!contactInfo.email || !contactInfo.mobile) {
      return false;
    }
    return true;
  };
  const handleBook = async() => {
    handleClose();
    const option={
        amount:flight2?(Number(adult)+Number(child))*(Number(flight1.price)+Number(flight2.price))*100:(Number(adult)+Number(child))*Number(flight1.price)*100,
        currency:"INR"
    }
    console.log(option.amount);
     if (validateInputs()) {
          
            const res=await axios.post("/payment/getorderid",option,{
                headers:{
                    'Content-Type':'application/json'
                }
            }) 
            var options = {
                "key": process.env.REACT_APP_RAZORPAY_KEY_ID, 
                "amount": res.data.amount_due, 
                "currency": option.currency,
                "name": "FastANDair", 
                "description": "Test Transaction",
                "order_id": res.data.id, 
                "handler": async function (response){
                    const body={...response};
                    const validateRes=await axios.post("/payment/validatePayment",body,{
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    if(validateRes.data.msg==='success'){
                        window.localStorage.setItem('travelBody',JSON.stringify([adultData,childData,option,contactInfo]));
                        flight2?navigate(`/booking/${flight1._id}/${flight2._id}/${validateRes.data.orderId}/${validateRes.data.paymentId}`,{replace:true}):
                             
                        navigate(`/booking/${flight1._id}/${validateRes.data.orderId}/${validateRes.data.paymentId}`,{replace:true});
                    }
                },
                
                "prefill": { 
                    "name": "Sachin Verma", //your customer's name
                    "email": "sachinvarma2810@gmail.com", 
                    "contact": "9310432578"  //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "#"
                },
                "theme": {
                    "color": "#3399cc"
                }
};
var rzp1 = new window.Razorpay(options);
// 
rzp1.on('payment.failed', function (response){
       toast.error(response.error.description,{
        position:'top-center'
       })
});
    rzp1.open();
      
    } else {
      toast.error('Please fill all the required fields',{
        position:'top-center'
       }); 
    }
  };

  return (
    <div className="bg-white shadow-lg shadow-blue-200 md:w-1/2 md:ml-32 pl-2 flex flex-wrap mt-20 pb-10 pt-7">
      <p className="text-xl w-full font-bold ml-4">
        <PeopleIcon color='primary' /> Traveller details
      </p>
      <div className="w-full bg-slate-400 mt-1" style={{ height: '0.4px' }}></div>
      <div className="flex flex-wrap  mt-4">
        {adultData.map((_, i) => (
          <div key={i} className="flex md:flex-nowrap flex-wrap ">
            <div className="font-bold ml-4 mr-4">Adult {i + 1}</div>
            <form className="flex md:flex-nowrap flex-wrap  mb-3">
              <input
                required
                className="md:mr-4 border-2 border-blue-400 w-full md:w-max outline-none pl-2 h-8 rounded"
                placeholder="First Name"
                value={adultData[i].firstName}
                onChange={(e) => handleInputChange(i, 'firstName', e.target.value)}
              />
              <input
                required
                className="md:mr-4 border-2 border-blue-400 w-full md:w-max outline-none pl-2 h-8 rounded"
                placeholder="Last Name"
                value={adultData[i].lastName}
                onChange={(e) => handleInputChange(i, 'lastName', e.target.value)}
              />
              <input
                required
                className="md:mr-4 border-2 border-blue-400 w-full md:w-max outline-none pl-2 h-8 rounded"
                placeholder="Aadhar Number"
                maxLength={12}
                value={adultData[i].aadhar}
                onChange={(e) => handleInputChange(i, 'aadhar', e.target.value)}
              />
            </form>
          </div>
        ))}
      </div>
      {child > 0 && <div className="w-full bg-slate-400 mt-1 mb-4" style={{ height: '0.4px' }}></div>}
      <div className="flex flex-wrap w-full">
        {childData.map((_, i) => (
          <div key={i} className="flex w-full">
            <div className="font-bold ml-4 md:mr-4">Child {i + 1}</div>
            <form className="flex mb-3">
              <input
                required
                className="md:mr-4 border-2 border-blue-400 outline-none pl-2 h-8 rounded"
                placeholder="First Name"
                value={childData[i].firstName}
                onChange={(e) => handleInputChange(i, 'firstName', e.target.value, false)}
              />
              <input
                required
                className="md:mr-4 border-2 border-blue-400 outline-none pl-2 h-8 rounded"
                placeholder="Last Name"
                value={childData[i].lastName}
                onChange={(e) => handleInputChange(i, 'lastName', e.target.value, false)}
              />
            </form>
          </div>
        ))}
      </div>
      <div className="w-full bg-slate-400 mt-1 mb-4" style={{ height: '0.4px' }}></div>
      <div className="flex">
        <div>
          <label htmlFor="email" className="ml-4 md:mr-4">Email Address</label>
          <input
            className="md:mr-4 border-2 border-blue-400 w-60 outline-none pl-2 h-8 rounded"
            placeholder="Email"
            required
            autoComplete='off'
            id="email"
            value={contactInfo.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phno" className="md:ml-4 md:mr-4">Mobile Number</label>
          <input
            required
            autoComplete='off'
            className="border-2 border-blue-400 outline-none pl-2 h-8 rounded"
            placeholder="Mobile Number"
            id="phno"
            value={contactInfo.mobile}
            onChange={(e) => handleContactChange('mobile', e.target.value)}
          />
        </div>
      </div>
      <p className='font-light ml-4 mt-2 text-sm text-green-800'>*ticket will be sent to provided email and mobile.</p>
      <div className="w-full bg-slate-400 mt-4 mb-4" style={{ height: '0.4px' }}></div>
      <div className='flex justify-end w-full md:mr-12 mt-4'>
        <button className='bg-orange-500 text-white pr-3 pl-3 h-9 w-max rounded-lg' onClick={handleOpen}>Proceed to Payment</button>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 8}}
        open={open}
      >
        <div className='w-1/4 h-60 bg-white rounded pl-4 pr-4 pt-2 pb-2' >
          <div className='text-black font-bold text-2xl text-center'>Review Traveller's Details</div>
          <div className='text-black font-light text-md mt-4 text-center'>Ensure details match your govt. photo id as these can't be modified later.</div>
          <div className='mt-8 flex flex-wrap'> 
          <button className='w-full bg-orange-500 rounded mb-6' onClick={handleBook}>That's Correct</button>
          <button className='w-full text-blue-500 border-2 border-blue-400 rounded' onClick={handleClose}>No, I'll Edit This</button>
          </div>
        </div>
        
      </Backdrop>
      <ToastContainer/>
    </div>
  );
};

export default TravellerDetails;
