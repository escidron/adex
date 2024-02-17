import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card"
import { Trash } from "lucide-react"
export default function PlataformCards({ plataforms,handleDeletePlataform }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {
                plataforms.map(plataform => (
                    <Card className="w-full sm:min-w-[250px] mt-4" key={plataform.name}>
                        <div className="w-full flex justify-end p-2">
                            <Trash size={16} className='cursor-pointer' onClick={()=>handleDeletePlataform(plataform.name)}/>
                        </div>
                        <CardHeader>
                            <CardTitle className='text-[22px] font-[400] text-center'>{plataform.name.toUpperCase()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[26px] font-[600] text-center">{plataform.amount.toUpperCase()}</p>
                            <p className="w-full text-center text-gray-600">followers</p>
                        </CardContent>

                    </Card>
                ))
            }
        </div>
    )
}
