'use client'
import { useEffect } from 'react';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import { MapCoordinatesContext } from '@/app/market-place/page';
import { useContext } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";


const PlacesAutocomplete = ({ setSelected, setAddress, currentLocation }) => {

  const [coords, setCoords] = useContext(MapCoordinatesContext)
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setCoords({ lat, lng })
    setAddress(address)
  };

  useEffect(() => {
    if (currentLocation) {
      handleSelect(currentLocation)
    }

  }, []);

  let cont = 0
  return (
    <Combobox onSelect={handleSelect} className='w-full  ' >
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        //   disabled={!ready}
        // className="outline-none w=full"
        placeholder="Search an address"
        className=" rounded-lg outline-none w-full  p-3  bg-white placeholder-gray-400 placeholder- text-black"
      />

        <ComboboxPopover  className='shadow-popup ComboboxPopover_style w-auto '>
          <ComboboxList  className='bg-white mt-4 rounded-md w-[400px] style_combobox '  >
            {
              data.map(({ place_id, description, }) => {
                cont++
                return (
                  <div className={` ${cont != 1 ? 'border-t-[1px]' : ''}  flex items-center border-gray w-auto px-2 py-1 cursor-pointer hover:text-[#FCD33B]`} key={place_id} >
                    <RoomRoundedIcon fontSize='small' sx={{ color: 'gray', marginRight: '4px' }} />
                    <ComboboxOption
                      value={description} />
                  </div>
                )
              })}
          </ComboboxList>
        </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete