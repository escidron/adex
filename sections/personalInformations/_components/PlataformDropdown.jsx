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
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { useState } from "react"

import { socialMedias, followers } from "@/utils/plataforms"
import AddSocialMediaInfo from "@/actions/AddSocialMediaInfo"

export default function PlataformDropdown({ setPlataforms, plataforms }) {
    const [openPlataforms, setOpenPlataforms] = useState(false)
    const [openFollowers, setOpenFollowers] = useState(false)
    const [valuePlataform, setValuePlataform] = useState("")
    const [valueFollowers, setValueFollowers] = useState("")
    const [otherPlataform, setOtherPlataform] = useState(false)
    const [valueOtherPlataform, setValueOtherPlataform] = useState("")
    const [otherFollowers, setOtherFollowers] = useState(false)
    const [valueOtherFollowers, setValueOtherFollowers] = useState("")

    const handlePlataform = async () => {
        const isAlreadyIncluded = plataforms.find(plataform => plataform.name === valuePlataform);

        if (!isAlreadyIncluded) {
            const response = await AddSocialMediaInfo(valuePlataform, valueFollowers)
            if (response) {

                setPlataforms(prev => ([...prev, { name: valuePlataform, amount: valueFollowers }]))
                setValuePlataform("")
                setValueFollowers("")
                setValueOtherFollowers("")
                setValueOtherPlataform("")
                setOtherPlataform(false)
                setOtherFollowers(false)
            }
        }

    }
    const handleOtherPlataformValue = (value) => {
        setValueOtherPlataform(value)
        setValuePlataform(value)
    }
    const handleOtherFollowersValue = (value) => {
        setValueOtherFollowers(value)
        setValueFollowers(value)
    }
    return (
        <div className="w-full flex flex-col md:flex-row gap-2 mt-4">
            <div className="w-full md:w-1/2">
                <Popover open={openPlataforms} onOpenChange={setOpenPlataforms}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openPlataforms}
                            className="w-full justify-between"
                        >
                            {valuePlataform ? valuePlataform.charAt(0).toUpperCase() + valuePlataform.slice(1) : "Choose Plataform"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        {
                            !otherPlataform && (

                                <Command>
                                    <CommandGroup>
                                        {socialMedias.map((plataform) => (
                                            <CommandItem
                                                key={plataform.value}
                                                value={plataform.label}
                                                onSelect={(currentValue) => {
                                                    setValuePlataform(currentValue === valuePlataform ? "" : currentValue)
                                                    if (currentValue == 'other') {
                                                        setOtherPlataform(true)
                                                    } else {
                                                        setOpenPlataforms(false)
                                                    }
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        valuePlataform === plataform.label ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {plataform.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            )
                        }
                        {
                            otherPlataform && (
                                <input
                                    type="text"
                                    id="plataform"
                                    name="plataform"
                                    maxLength={20}
                                    value={valueOtherPlataform}
                                    onChange={(e) => handleOtherPlataformValue(e.target.value)}
                                    placeholder='Plataform'
                                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                                />
                            )
                        }
                    </PopoverContent>
                </Popover>
            </div>

            <div className="w-full md:w-[30%]">
                <Popover open={openFollowers} onOpenChange={setOpenFollowers}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openFollowers}
                            className="w-full justify-between"
                        >
                            {valueFollowers ? valueFollowers.substring(0, 15) : "Followers"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 max-w-[200px]">
                        {
                            !otherFollowers && (
                                <Command>
                                    <CommandGroup>
                                        {followers.map((followers) => (
                                            <CommandItem
                                                key={followers.value}
                                                value={followers.label}
                                                onSelect={(currentValue) => {
                                                    setValueFollowers(currentValue === valueFollowers ? "" : currentValue)
                                                    if (currentValue == 'other') {
                                                        setOtherFollowers(true)
                                                    } else {
                                                        setOpenFollowers(false)
                                                    }
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        valueFollowers === followers.label ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {followers.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            )
                        }
                        {
                            otherFollowers && (
                                <input
                                    type="text"
                                    id="followers"
                                    name="followers"
                                    maxLength={12}
                                    value={valueOtherFollowers}
                                    onChange={(e) => handleOtherFollowersValue(e.target.value)}
                                    placeholder='Followers'
                                    className="w-full border text-black p-3 max-h-[42px] rounded-lg outline-none focus:border-black"
                                />
                            )
                        }

                    </PopoverContent>
                </Popover>
            </div>

            <Button onClick={handlePlataform} disabled={!valuePlataform || !valueFollowers} className='flex md:ml-auto'><Plus size={18} className="mr-1" /> Add</Button>
        </div>

    )
}
