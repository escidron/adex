"use client"

import { useEffect, useContext, useState } from "react"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MapCoordinatesContext } from "@/app/market-place/page"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
const frameworks = [

]

export function NewSearchAddress({ setSelected }) {
  const [open, setOpen] = useState(false)
  //   const [value, setValue] = React.useState("")
  const [placeName, setPlaceName] = useState('');

  const [coords, setCoords] = useContext(MapCoordinatesContext)
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setValue(address, false);
    setSelected({ lat, lng });
    setCoords({ lat, lng })
    setOpen(false)
    setPlaceName(address)
  };

  return (

        <Command className='border-none'>
          <CommandInput
          placeholder='Search address'
            value={value}
            onValueChange={(value) => {
              setValue(value);
              setOpen(true)
            }}
            disabled={!ready}
            className=" relative border-b-0"
          />
          <CommandList className={`${(value && open) ? 'absolute top-[190px] bg-white border w-[400px] md:w-[450px] rounded-lg shadow-md'  : 'hidden'}`}>
            <CommandGroup>
              {
                data.map(({ place_id, description }) => (
                    <CommandItem
                      key={place_id}
                      value={description}
                      onSelect={handleSelect}
                      className='flex gap-1 items-start cursor-pointer'
                    >
                      <MapPin size={15} className="text-gray-600 min-w-[15px] mt-[2px]"/>
                      {description}
                    </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
  )
}
