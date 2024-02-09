import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import Image from 'next/image'


export default function UseCasesCard({ content }) {
    return (
        <Card className='w-full h-[510px]' key={content.id}>
            <CardHeader>
                <CardTitle className='flex gap-3 justify-center '>
                    {content.title}
                </CardTitle>
            </CardHeader>
            <CardContent >
                <div className='w-full aspect-square pb-2 mt-6 h-[200px] lg:h-[250px] xl:h-[300px]  flex justify-between '>
                    <Image
                        src={`/${content.image}`}
                        alt="use case image"
                        width={2000}
                        height={2000}
                    />
                </div>
                <p className="mt-4">{content.description}</p>
            </CardContent>
        </Card>
    )
}
