import LuggageIcon from '@mui/icons-material/Luggage';
import BackpackIcon from '@mui/icons-material/Backpack';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
const BookingSuccFlightPrev = ({flight}) => {

 function getTimeDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffMs = Math.abs(d2 - d1);
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${diffHours}h${diffMinutes}m`;
}
function formatISODate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0'); 
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); 
    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}`;

    return formattedDate;
}
function getdate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();
    const formattedDate = `${day} ${month} ${year} `;
    return formattedDate;
}



  return (
    <div className="h-max pb-4 w-full shadow-md pl-2 pr-2">
        <div className='text-center text-xl font-semibold text-blue-400 mt-6'>Flight Details</div>
      <div className="font-semibold w-full text-xl"> {flight.departureAirport} - {flight.arrivalAirport}</div>
      <div className="border-2 pl-2 pr-2 h-36 rounded flex flex-wrap items-center justify-center">
      <div className="flex justify-between w-full">
        <span><AirplanemodeActiveIcon color='secondary'/> {flight.airline} {flight.flightNumber}</span>
        <span>{flight.seatClass}</span>
    </div>
    <div className="flex justify-between items-center w-full">
        <span className="bg-blue-200 pr-2 pl-2 rounded">Starts on- <span className="font-medium">{getdate(flight.departureDateTime)}</span></span>
        
        <span className="bg-blue-200 pr-2 pl-2 rounded">Arrive on- <span className="font-medium">{getdate(flight.arrivalDateTime)}</span></span>
    </div>
    <div className="flex justify-between w-full items-center">
        <span className="flex flex-col">
            <span className="font-bold text-lg">{formatISODate(flight.departureDateTime)}</span>
            <span>{flight.departureAirport}</span>
        </span>
        <span className="w-1/3 bg-slate-500 self-center" style={{height:"0.2px"}}></span>
        <span>{getTimeDifference(flight.departureDateTime,flight.arrivalDateTime)}</span>
        <span className="w-1/3 bg-slate-500 self-center" style={{height:"0.2px"}}></span>
        <span className="flex flex-col">
            <span className="font-bold text-lg">{formatISODate(flight.arrivalDateTime)}</span>
            <span className="font-medium">{flight.arrivalAirport}</span>
        </span>
    </div>
    </div>
   <div className="flex items-center pl-2 border-2 border-t-0 pt-4 pb-4">
    <span>
        Baggage-
        <LuggageIcon/> 
        {flight.baggage && flight.baggage[0] !== undefined ? flight.baggage[0] : ""}kg Check-In(1 piece only)
    </span>
    <span className="ml-4">
        <BackpackIcon/>
        {flight.baggage && flight.baggage[1] !== undefined ? flight.baggage[1] : ""}kg Cabin(1 piece only)
    </span> 
</div>

      </div>
  )
};

export default BookingSuccFlightPrev;
