import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import Image from 'next/image'


export default function UseCasesCard({ content }) {
    console.log('conten image',content);
    return (
        <Card className='w-full aspect-square max-w-[485px]' key={content.id}>
            <CardHeader>
                <CardTitle className='flex gap-3 justify-center '>
                    {content.title}
                </CardTitle>
            </CardHeader>
            <CardContent className='max-h-[485px]'>
                <div className='w-full mt-8 h-full max-h-[400px] flex justify-between '>
                    <Image
                        src={`/${content.image}`}
                        alt="get-paid image"
                        width={2000}
                        height={2000}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
