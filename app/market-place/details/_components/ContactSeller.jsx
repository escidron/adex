import SendChatMessage from '@/actions/SendChatMessage'
import { Button } from '@/components/ui/button'
import { ImageIcon, Loader2, Paperclip, SendHorizontal } from 'lucide-react'
import React, { useContext, useState } from 'react'
import AttachmentBox from './AttachmentBox';
import SendFiles from '@/actions/SendFiles';
import toast from 'react-hot-toast';
import { UserContext } from '@/app/layout';

export default function ContactSeller({ listingProperties }) {
    const [user, setUser] = useContext(UserContext)

    const [message, setMessage] = useState('');
    const [uploadFiles, setUploadFiles] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const handleUpload = async (files, format) => {
        const selectedFiles = Array.from(files);

        const newFiles = selectedFiles.map((item) => {
            const newFile = new File([item], item.name, { type: item.type });//item is a inmutable object so need to create a copy

            newFile.format = format;

            return newFile;
        })

        setUploadFiles((prev) => ([...prev, ...newFiles]))

    };

    const handleSendMessage = async () => {
        setIsPending(true)
        try {
            const formData = new FormData();
            const filesNames = []
            uploadFiles.forEach((file, index) => {
                formData.append('files', file);
                filesNames.push(file.name)
            });
            const filesResponse = await SendFiles(formData)
            const messageResponse = await SendChatMessage(user.userId, listingProperties.seller_id, user.userId, listingProperties.id, message, filesNames)
            
            setMessage('')
            setUploadFiles([])
            setIsPending(false)
            toast.success('Message sended')
        } catch (error) {
            toast.error('Something went wrong.')
        }
    };

    const handleRemoveFile = (name, removeAll) => {
        if (removeAll) {
            setUploadFiles([])
            toast.success('Files removed')
        } else {
            const filteredUploadFiles = uploadFiles.filter((item) => (item.name != name))
            setUploadFiles(filteredUploadFiles)
            toast.success('File removed')
        }
    }

    return (
        <div className='w-full max-w-[600px] '>
            <h1 className='text-[20px] font-[500]'>{'Need further clarification?'}</h1>
            <p className='text-[14px] text-gray-700'>{`Feel free to reach out to ${listingProperties.seller_name} via a message.`}</p>
            <textarea
                onChange={(e) => setMessage(e.target.value)}
                type="textarea"
                id="message"
                name="message"
                value={message}
                className={`w-full mt-2 overflow-hidden border shadow-sm p-3 rounded-lg outline-none h-[140px] resize-none  focus:border-black`}
            />
            <div className='flex gap-2 justify-between'>
                <div className='pl-2 flex gap-1'>
                    <input id="file-input" type="file" multiple className='hidden' onChange={(e) => handleUpload(e.target.files, 'file')} />
                    <label htmlFor="file-input" className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                        <Paperclip size={20} />
                    </label>

                    <input id="image-input" type="file" accept="image/*" multiple className='hidden' onChange={(e) => handleUpload(e.target.files, 'image')} />
                    <label htmlFor="image-input" className='hover:bg-slate-200 hover:text-black p-2 rounded-md cursor-pointer'>
                        <ImageIcon size={20} />
                    </label>
                </div>
                <Button onClick={handleSendMessage} disabled={(uploadFiles.length == 0 && !message) || isPending} className='flex gap-2 items-center'>
                    {!isPending && <SendHorizontal size={15} />}
                    {isPending && <Loader2 size={15} className="animate-spin mr-2" />}
                    Send Message
                </Button>
            </div>
            <AttachmentBox files={uploadFiles} handleRemoveFile={(name, removeAll) => handleRemoveFile(name, removeAll)} />
        </div>
    )
}
