const ResultCard2 = ({value,flightdata}) => {
    return (
    <div className={value?"bg-white absolute flex justify-center pb-2 shadow-lg border-2 mt-64 md:mt-40  md:w-2/3 w-80 h-60 md:h-fit pl-4 pr-4":"absolute invisible w-2/3 h-1 -mt-96  pl-4 pr-4 "}>
        <table className="border-b-2  mt-4  ">
            <tr className="border-2 border-black/50">
                <th className="border-2 border-black/50 w-96">Flight Number </th>
                <td className="w-40 md:w-96 text-center" colSpan="2">{flightdata.flightNumber}</td>
            </tr>
             <tr className="border-2 border-black/50">
                <th className="border-2 border-black/50">Available seats</th>
                <td colSpan="2" className="text-center w-80">{flightdata.availableSeats}</td>
            </tr>
            <tr className="border-2 border-black/50 text-center">
                <th className="border-2 border-black/50">Baggage details</th>
                <td className="border-r-2 border-black/50">Cabin={flightdata.baggage[1]}kg</td>
                <td className="w-40">Check in={flightdata.baggage[0]}kg</td>
            </tr>
            <tr className="border-2 border-black/50 text-center">
                <th className="border-2 border-black/50">Fare details</th>
                <td className="border-r-2 border-black/50">Total fares={flightdata.price}</td>
                <td>Cancellation={flightdata.cancel}</td>
            </tr>
        </table>
    </div>
  )
  
};

export default ResultCard2;
