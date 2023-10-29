
const listingMachine = {
    currentState:'category',
    totalSteps:10,
    currentStep:1,
    states:{
        select_business:{
            NEXT:'category',
            PREVIOUS:'select_business',
            ISVALID:    false //use for render conditional field (false => conditional field, true => always render)
        },
        category:{
            NEXT:'sub_category',
            PREVIOUS:'select_business',
            ISVALID:    true 
        },
        sub_category:{
            NEXT:'building_assets',
            PREVIOUS:'category',
            ISVALID:    true

        },
        building_assets:{
            NEXT:'title',
            PREVIOUS:'sub_category',
            ISVALID:    false

        },
        title:{
            NEXT:'location',
            PREVIOUS:'building_assets',
            ISVALID:    true
        },
        location:{
            NEXT:'description',
            PREVIOUS:'title',
            ISVALID:    true
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
            ISVALID:    false
        },
        images:{
            NEXT:'preview',
            PREVIOUS:'date',
            ISVALID:    true
        },
        preview:{
            NEXT:'preview',
            PREVIOUS:'images',
            ISVALID:    true
        }
    }
}

export { listingMachine };
