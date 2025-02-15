
const listingMachine = {
    currentState:'category',
    totalSteps:11,
    currentStep:1,
    states:{
        select_business:{
            NEXT:'category',
            PREVIOUS:'select_business',
            ISVALID:    false //use for render conditional field (false => conditional field, true => always render)
        },
        category:{
            NEXT:'campaign_details',
            PREVIOUS:'select_business',
            ISVALID:    true 
        },
        campaign_details:{
            NEXT:'sub_category',
            PREVIOUS:'category',
            ISVALID:    false 
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
            NEXT:'title',
            PREVIOUS:'building_assets',
            ISVALID:    false

        },
        title:{
            NEXT:'location',
            PREVIOUS:'media_types',
            ISVALID:    true
        },
        location:{
            NEXT:'description',
            PREVIOUS:'title',
            ISVALID:    false
        },
        description:{
            NEXT:'price',
            PREVIOUS:'location',
            ISVALID:    true
        },
        price:{
            NEXT:'discounts',
            PREVIOUS:'description',
            ISVALID:    true
        },
        discounts:{
            NEXT:'date',
            PREVIOUS:'price',
            ISVALID:    false
        },
        date:{
            NEXT:'images',
            PREVIOUS:'discounts',
            ISVALID:    true
        },
        images:{
            NEXT:'instructions',
            PREVIOUS:'date',
            ISVALID:    true
        },
        instructions:{
            NEXT:'preview',
            PREVIOUS:'images',
            ISVALID:    true
        },
        preview:{
            NEXT:'preview',
            PREVIOUS:'instructions',
            ISVALID:    true
        }
    }
}

export { listingMachine };
