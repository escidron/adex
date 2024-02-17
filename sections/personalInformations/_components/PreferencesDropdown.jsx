import { Button } from "@/components/ui/button"
import {Command,CommandGroup,CommandItem,} from "@/components/ui/command"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { useState } from "react"

import { audiencePreferences } from "@/utils/plataforms"
import AddAudiencePreference from "@/actions/AddAudiencePreference"

export default function PreferencesDropdown({ setPreferences, preferences }) {
    const [openPreferences, setOpenPreferences] = useState(false)
    const [valuePreferences, setValuePreferences] = useState("")

    const [otherPreferences, setOtherPreferences] = useState(false)
    const [valueOtherPreferences, setValueOtherPreferences] = useState("")

    const [isLoading, setIsLoading] = useState(false);
    const handlePreference = async () => {
        setIsLoading(true)
        const isAlreadyIncluded = preferences.find(preference => preference === valuePreferences);

        if (!isAlreadyIncluded) {
            const response = await AddAudiencePreference(valuePreferences)
            if (response) {

                setPreferences(prev => ([...prev, valuePreferences]))
                setValuePreferences("")
                setValueOtherPreferences("")
                setOtherPreferences(false)
                
            }
        }
        setIsLoading(false)

    }
    const handleotherPreferencesValue = (value) => {
        setValueOtherPreferences(value)
        setValuePreferences(value)
    }



    return (
        <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
            <div className="w-full md:w-1/2">
                <Popover open={openPreferences} onOpenChange={setOpenPreferences}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openPreferences}
                            className="w-full justify-between"
                        >
                            {valuePreferences ? valuePreferences.charAt(0).toUpperCase() + valuePreferences.slice(1) : "Choose Audience preference"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        {
                            !otherPreferences && (

                                <Command>
                                    <CommandGroup>
                                        {audiencePreferences.map((category) => (
                                            <CommandItem
                                                key={category.value}
                                                value={category.label}
                                                onSelect={(currentValue) => {
                                                    setValuePreferences(currentValue === valuePreferences ? "" : currentValue)
                                                    if (currentValue == 'other') {
                                                        setOtherPreferences(true)
                                                    } else {
                                                        setOpenPreferences(false)
                                                    }
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        valuePreferences === category.label ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {category.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            )
                        }
                        {
                            otherPreferences && (
                                <input
                                    type="text"
                                    id="preferences"
                                    name="preferences"
                                    maxLength={20}
                                    value={valueOtherPreferences}
                                    onChange={(e) => handleotherPreferencesValue(e.target.value)}
                                    placeholder='preferences'
                                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                                />
                            )
                        }
                    </PopoverContent>
                </Popover>
            </div>


            <Button onClick={handlePreference} disabled={!valuePreferences || isLoading} className='flex md:ml-auto'><Plus size={18} className="mr-1" /> Add</Button>
        </div>

    )
}
