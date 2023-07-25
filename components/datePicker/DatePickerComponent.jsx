import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


export default function DatePickerComponent({ setDate,maxHeight,disabled,currentValue }) {
  const date = new Date();

  let day = date.getDate()+ 1;
  let month = date.getMonth() ;
  let year = date.getFullYear()

  const [value, setValue] = useState(dayjs(`${year}-${month}-${day}`));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <DatePicker
        disabled={disabled?disabled:false} 
        value={currentValue?currentValue:value}
        onChange={(newValue) => {
          setValue(newValue)
          setDate(newValue)

        }}
        sx={{
          width: '100%',
          '.MuiInputBase-root': { maxHeight:maxHeight? maxHeight: '50px', width: '100%' },
        }}
      />

    </LocalizationProvider>
  );
}