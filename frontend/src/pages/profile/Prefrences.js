import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Prefrences = () => {

      const [seat, setSeat] = React.useState('Economy');
        const handleChange = (event) => {
        setSeat(event.target.value);
        };
  return (
    <div className="flex w-3/4 flex-wrap mt-8 rounded-lg shadow-md h-96 shadow-slate-400 items-center justify-evenly p-4">
      <div className="text-2xl w-full text-center font-bold">Flight Preferences</div>
      <div className="w-full justify-evenly flex flex-wrap mt-4">
        <FormControl className='w-60'>
        <InputLabel id="demo-simple-select-label">Seating Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={seat}
          label="Seating Class"
          onChange={handleChange}
        >
          <MenuItem value={"Economy"} >Economy</MenuItem>
          <MenuItem value={"Business"}>Business</MenuItem>
          <MenuItem value={"Premium Economy"}>Premium Economy</MenuItem>
          <MenuItem value={"First Class"}>First Class</MenuItem>
        </Select>
      </FormControl>
        <div>

        </div>
      </div>
    </div>
  )
};

export default Prefrences;
