import GetUserProfile from "@/actions/GetUserProfile"
import GetToken from "@/actions/GetToken";
import GetMyAdvertisement from "@/actions/GetMyAdvertisement";
import EditListing from "./_components/EditListing";
import GetCategories from "@/actions/GetCategories";
import GetDiscounts from "@/actions/GetDiscounts";


export default async function page({ params }) {
    const token =  GetToken()
    const id = params.id
    
    const userData = await GetUserProfile(token)
    const myListing = await GetMyAdvertisement(token,id)
    const categories = await GetCategories()
    const discounts = await GetDiscounts(token,id)
    return (
        <div>
            <EditListing 
                userData={userData}
                myListing={myListing}
                categories ={categories}
                discounts ={discounts}
            />
        </div>
    )
}
