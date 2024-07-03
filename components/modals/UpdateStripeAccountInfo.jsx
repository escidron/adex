import UpdateStripeAccountInfo from "@/actions/UpdateAccountInfo"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import MaskedInput from "react-maskedinput"

export default function UpdateAccountInfo({ dueInfo }) {
    const [open, setOpen] = useState(false);

    const [isVisible, setIsVisible] = useState(true)
    const [updatedInfo, setUpdatedInfo] = useState({
        idNumber: '',
    })

    const handleUpdateInfo = async () => {
        try{
            const response =   UpdateStripeAccountInfo(updatedInfo)
            console.log('response', response)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button >Edit Information</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Information</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {
                            dueInfo.includes('individual.id_number') && (

                                <div className="w-full md:w-1/2 relative">
                                    <div className="flex">
                                        <label htmlFor="idNumber" className="block text-[14px]  mb-1">
                                            Social Security Number *
                                        </label>
                                    </div>
                                    <MaskedInput
                                        id="idNumber"
                                        name="idNumber"
                                        type={isVisible ? 'text' : 'password'}
                                        maxLength="11"
                                        mask="111-11-1111"
                                        placeholder=''
                                        value={updatedInfo.idNumber}
                                        onChange={e => setUpdatedInfo({ ...updatedInfo, idNumber: e.target.value })}
                                        className={`w-full border focus:border-black p-2 rounded-lg outline-none `}
                                    />
                                    <div className="absolute top-9 right-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}>
                                        {
                                            isVisible ? (

                                                <Eye className="w-5 h-5 opacity-60" />
                                            ) : (
                                                <EyeOff className="w-5 h-5 opacity-60" />
                                            )
                                        }
                                    </div>

                                </div>
                            )
                        }
                    </div>
                    <DialogFooter>
                        <Button onClick={() => {
                            setOpen(false)
                            handleUpdateInfo()
                        }}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
