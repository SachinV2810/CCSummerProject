const FarePrev = ({flight1,flight2,a,c}) => {
  return (
    <div className="bg-white pl-4 pr-4 shadow-lg shadow-blue-200 basis-1/4 h-64 flex flex-wrap content-start">
        <p className="font-bold text-2xl w-full text-center  h-10">Fare Summary</p>
        <div className="flex w-full flex-wrap">
        <div className="flex w-full justify-between items-center">
            <div>
            <div className="text-center font-semibold text-xl">Base fare</div>
            </div>
            <div className="w-20 font-bold self-start text-xl">
                &#x20B9;{flight2?Number(flight1.price)+Number(flight2?.price):Number(flight1.price)}
            </div>
        </div>
        <div className="w-full justify-between flex mt-6">
            <div >
                   <span className=" text-center">{a} Adults</span>
            </div>
            <span className="w-20 font-bold self-start">
                &#x20B9;{flight2?a*(Number(flight1.price)+Number(flight2?.price)):a*(Number(flight1.price))}
            </span>
        </div>
        {c>0 && <div className="w-full justify-between flex mt-2">
            <div >
                   <span className=" text-center">{c} Children</span>
            </div>
            <span className="w-20 font-bold self-start">
                &#x20B9;{flight2?c*(Number(flight1.price)+Number(flight2?.price)):c*(Number(flight1.price))}
            </span>
        </div>}
        <div className="w-full bg-slate-400 mt-4 " style={{height:"0.4px"}}></div>
        <div className="w-full justify-between flex mt-6 ">
            <div >
                   <span className=" text-center text-lg font-medium text-blue-600">Grand Total</span>
                {c>0 && <span className="w-full text-center">{c} Child</span>}
            </div>
            <span className="w-20 font-bold self-start text-2xl text-blue-800">
                &#x20B9;{flight2?a*(Number(flight1.price)+Number(flight2?.price))+c*(Number(flight1.price)+Number(flight2?.price)):a*(Number(flight1.price))+c*(Number(flight1.price))}
            </span>
        </div>
         </div>
      </div>
  )
};

export default FarePrev;
