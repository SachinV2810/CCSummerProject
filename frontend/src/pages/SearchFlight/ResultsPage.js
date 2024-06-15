import { useNavigate } from "react-router-dom";
import ResultCard from "./ResultCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const ResultsPage = () => {
  const [w,setw]=useState('');
  const [t3,sett3]=useState({});
const [resultdata, setResultData] = useState([]);
const [r, setR] = useState([]);
const navigate=useNavigate();
    const handleReview=(id1,id2)=>{
        navigate(`/flights/review/${id1}/${id2}/${t3.adult}/${t3.child}`);
    }
  
  useEffect(()=>{
   
    const t=window.localStorage.getItem('resultdata');
    const obj=window.localStorage.getItem('obj');
    sett3(JSON.parse(obj)[0]);
    const way=window.localStorage.getItem('way');
    setw(way);
    if(way==='oneway'){
      setResultData(JSON.parse(t)); 
    }
    else{
      const t1=JSON.parse(t);
      setR(t1);
    }
  },[])
    return(
     
      <div className="pt-20">
        <Link to="/flights" className="w-full flex justify-center"><p className="font-bold text-center text-white bg-orange-400 w-40 rounded-md mb-10 mt-8">UPDATE SEARCH</p></Link>
    <div className="pb-40">
    {w==='oneway'?<div className="flex flex-wrap flex-col relative items-center">
      {resultdata.map((result)=>{
        console.log(result)
        return <ResultCard key={result._id} flightdata={result} a={t3.adult} c={t3.child} w={w}/>
      })}
    </div>:<div className="flex ">
      <div className="flex flex-col flex-wrap">
        {r.map((result)=>{
        return<div key={result.going._id} className="relative  w-full flex justify-center items-center  md:ml-80 top-20"> 
        <ResultCard   flightdata={result.going} a={t3.adult} c={t3.child} w={w}/>
        <ResultCard flightdata={result.return} a={t3.adult} c={t3.child} w={w}/>
        <button className='bg-orange-400 w-40 h-6 text-white font-bold text-md rounded-md hover:bg-orange-500' onClick={()=>handleReview(result.going._id,result.return._id)}>Book</button>
      </div> 
      })}
      </div>
      </div>}
    </div>
    </div>
    )
  
};

export default ResultsPage;
