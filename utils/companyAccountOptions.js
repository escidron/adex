import { BookmarkCheck, ImageIcon, LineChart, MapPin, FileText } from "lucide-react";

export  const menuOptions = [
    {
        id: 1,
        icon: <MapPin color='#FCD33B' size={30}/>,
        label: 'Payments & Payouts'
    },
    {
        id: 2,
        icon: <ImageIcon color='#FCD33B' size={30}/>,
        label: 'Image gallery'
    },
    // {
    //     id: 3,
    //     icon: <BookmarkCheck color='#FCD33B' size={30}/>,
    //     label: 'Listings & Bookings'
    // },
    {
        id: 3,
        icon: <LineChart color='#FCD33B' size={30}/>,
        label: 'Company Balance'
    },
    {
        id: 4,
        icon: <FileText color='#FCD33B' size={30}/>,
        label: 'My Invoices'
    }
]