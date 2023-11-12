"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DateFieldComponent({ date, setDate ,disabledDate}) {
    //const [date, setDate] = useState()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal gap-2",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon size={16} />
                    {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={disabledDate ? (date) => date < new Date(disabledDate) : false } 
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}