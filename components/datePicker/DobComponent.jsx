import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MaskedInput from 'react-maskedinput';

export default function DobComponent({ value,onChange }) {
    return (
        <DatePicker
            id="bod"
            selected={value}
            onChange={date => onChange(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
            yearDropdownItemNumber={100}
            showYearDropdown
            maxDate={new Date()}
            // onKeyDown={(e) => {
            //     e.preventDefault();
            // }}
            customInput={
                <MaskedInput mask="11/11/1111" placeholder="mm/dd/yyyy" />
              }
            className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
        />
    )
}


