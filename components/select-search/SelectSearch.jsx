'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function SelectIndustryComponent({ options, selectedMerchant, setSelectedMerchant }) {

  // return (

  //     <Select
  //         className='w-full h-full border rounded-lg px-3 cursor-pointer'
  //         placeholder='Select Industry...'
  //         defaultValue={selectedMerchant}
  //         onChange={setSelectedMerchant}
  //         options={options}
  //         unstyled
  //         classNames={{
  //             menu: ({ isDisabled, isFocused }) =>
  //               classNames(
  //                 ' bg-white border mt-1 ml-[-10px]  '

  //               ),
  //             option: ({ isDisabled, isFocused, isSelected }) =>
  //               classNames(
  //                 'p-2 w-full cursor-pointer',
  //                 isSelected && 'bg-black text-white',
  //                 !isSelected && isFocused && 'bg-slate-200 text-black'
  //               ),
  //           }}



  //     />
  // )
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Select Industry..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0">
        <Command>
          <CommandInput placeholder="Search industry..." />
          <CommandEmpty>No industry found.</CommandEmpty>
          <CommandGroup>
            {options.map((industry) => (
              <CommandItem
                key={industry.value}
                value={industry.label}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  const merchantId = options.find((option) => option.label.toLowerCase() == currentValue)?.value
                  setSelectedMerchant(() => merchantId)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === industry.label ? "opacity-100" : "opacity-0"
                  )}
                />
                {industry.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
