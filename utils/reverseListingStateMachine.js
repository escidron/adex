
const reverseListingMachine = {
    currentState:'category',
    totalSteps:7,
    currentStep:1,
    states:{
        category:{
            NEXT:'sub_category',
            PREVIOUS:'category',
            ISVALID:    true 
        },
        sub_category:{
            NEXT:'building_assets',
            PREVIOUS:'category',
            ISVALID:    true

        },
        building_assets:{
            NEXT:'media_types',
            PREVIOUS:'sub_category',
            ISVALID:    false

        },
        media_types:{
            NEXT:'location',
            PREVIOUS:'building_assets',
            ISVALID:    false

        },
        location:{
            NEXT:'description',
            PREVIOUS:'media_types',
            ISVALID:    false
        },
        description:{
            NEXT:'preview',
            PREVIOUS:'location',
            ISVALID:    true
        },
        preview:{
            NEXT:'preview',
            PREVIOUS:'description',
            ISVALID:    true
        }
    }
}

export { reverseListingMachine };
