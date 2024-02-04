export default function getFilesLink(files){
    let FilesArray = files  ? files.split(`;`) : []

    const filesLink = FilesArray.map(file=>{

        return `${process.env.NEXT_PUBLIC_SERVER_IP}/images/files/${file}`
    })

    return filesLink
}
