export default function getFilesLink(files){
    const  filesArray = files  ? files.split(`;`) : []
    // const serverUrl = process.env.NEXT_PUBLIC_SERVER_IP; 
    // const httpImageUrl = serverUrl.replace("https://", "http://");
    
    // const filesLink = FilesArray.map(file=>{

    //     return `${httpImageUrl}/images/files/${file}`
    // })

    return filesArray
}
