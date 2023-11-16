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
    console.log('handle address')
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

  console.log('value', value)
  let cont = 0
  return (
    <Combobox onSelect={handleSelect} style={{ zIndex: 99 }} className='w-full z-[99] ' onClick={() => alert('combo')}>
      <ComboboxInput
        style={{ zIndex: 99 }}
        value={value}
        onClick={() => alert('ComboboxInput')}
        onChange={(e) => setValue(e.target.value)}
        //   disabled={!ready}
        // className="outline-none w=full"
        placeholder="Search an address"
        className="z-[99] text-sm rounded-lg outline-none w-full  p-3  bg-white placeholder-gray-400 placeholder- text-black"
      />

        <ComboboxPopover style={{ zIndex: 99 }} className='shadow-popup ComboboxPopover_style w-auto z-[99]' onClick={() => alert('ComboboxPopover')}>
          <ComboboxList style={{ zIndex: 99 }} className='bg-white mt-4 rounded-md w-[400px] style_combobox z-[99]' sx={{ zIndex: '99' }} onClick={() => alert('ComboboxList')}>
            {
              data.map(({ place_id, description, }) => {
                cont++
                return (
                  <div onClick={() => alert('sssss')} className={` ${cont != 1 ? 'border-t-[1px]' : ''} z-[99] flex items-center border-gray w-auto px-2 py-1 cursor-pointer hover:text-[#FCD33B]`} key={place_id} >
                    <RoomRoundedIcon fontSize='small' sx={{ color: 'gray', marginRight: '4px' }} />
                    <ComboboxOption
                      style={{ zIndex: 99 }}
                      value={description} onClick={() => alert('ComboboxOption')} />
                  </div>
                )
              })}
          </ComboboxList>
        </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete