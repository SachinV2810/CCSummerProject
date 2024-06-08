import LuggageIcon from '@mui/icons-material/Luggage';
import BackpackIcon from '@mui/icons-material/Backpack';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
const FlightPrev = ({flight}) => {

function extractDateTimeParts(dateTimeStr) {
  const dateTimeUTC = new Date(dateTimeStr);
  const dateTimeLocal = new Date(dateTimeUTC.toLocaleString());
  const date = dateTimeLocal.toLocaleDateString();
  const time = dateTimeLocal.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return { date, time };
}


function formatISODate(isoDate) {
            const date = new Date(isoDate);
                const options = {  hour: 'numeric', minute: 'numeric', timeZoneName: 'short',hour12:false };
            return date.toLocaleString('en-IN', options);
    }
     function getTimeDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffMs = Math.abs(d2 - d1);

        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${diffHours}h${diffMinutes}m`;
}

function getDateTimeParts(flight, type) {
  if (!flight || !flight[type]) {
    return { date: '', time: '' }; 
  }
  return extractDateTimeParts(flight[type]);
}

const departedPart = getDateTimeParts(flight, 'departureDateTime');
const arrivalPart = getDateTimeParts(flight, 'arrivalDateTime');
  return (
    <div className="bg-white shadow-lg shadow-blue-200 basis-1/2 h-max pb-4 w-full pl-4 pr-4 ml-10">
      <div className="font-semibold w-full text-xl"> <FmdGoodIcon color='primary'/> {flight.departureAirport} - {flight.arrivalAirport}</div>
      <div className="border-2 pl-2 pr-2 h-36 rounded flex flex-wrap items-center justify-center">
      <div className="flex justify-between w-full">
        <span><AirplanemodeActiveIcon color='secondary'/> {flight.airline} {flight.flightNumber}</span>
        <span>{flight.seatClass}</span>
    </div>
    <div className="flex justify-between items-center w-full">
        <span className="bg-blue-200 pr-2 pl-2 rounded">Starts on- <span className="font-medium">{departedPart.date}</span></span>
        
        <span className="bg-blue-200 pr-2 pl-2 rounded">Arrive on- <span className="font-medium">{arrivalPart.date}</span></span>
    </div>
    <div className="flex justify-between w-full items-center">
        <span className="flex flex-col">
            <span className="font-bold text-lg">{formatISODate(flight.departureDateTime).split("GMT")[0]}</span>
            <span>{flight.departureAirport}</span>
        </span>
        <span className="w-1/3 bg-slate-500 self-center" style={{height:"0.2px"}}></span>
        <span>{getTimeDifference(flight.departureDateTime,flight.arrivalDateTime)}</span>

        <span className="w-1/3 bg-slate-500 self-center" style={{height:"0.2px"}}></span>
        <span className="flex flex-col">
            <span className="font-bold text-lg">{formatISODate(flight.arrivalDateTime).split("GMT")[0]}</span>
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
<div className="flex items-center pl-2 border-2 border-t-0 pt-4 justify-between pr-2 pb-1">
    <span><span className='font-semibold'>Cancellation Charges</span> (before 2hr of flight Departure)</span>
    <span className='font-medium text-xl'> &#x20B9;{flight.cancel}</span>
    
</div>
      </div>
  )
};

export default FlightPrev;
