
const listingMachine = {
    currentState:'select_business',
    totalSteps:12,
    currentStep:1,
    states:{
        select_business:{
            NEXT:'category',
            PREVIOUS:'select_business',
            ISVALID:    true //use for render conditional field (false => conditional field, true => always render)
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

// Campaign-specific state machine
const campaignMachine = {
    currentState: 'select_business',
    totalSteps: 6,
    currentStep: 1,
    states: {
        select_business: {
            NEXT: 'category',
            PREVIOUS: 'select_business',
            ISVALID: true
        },
        category: {
            NEXT: 'campaign_participants_rewards',
            PREVIOUS: 'select_business',
            ISVALID: true
        },
        campaign_participants_rewards: {
            NEXT: 'campaign_period',
            PREVIOUS: 'category',
            ISVALID: true
        },
        campaign_period: {
            NEXT: 'title',
            PREVIOUS: 'campaign_participants_rewards',
            ISVALID: true
        },
        title: {
            NEXT: 'description',
            PREVIOUS: 'campaign_period',
            ISVALID: true
        },
        description: {
            NEXT: 'images',
            PREVIOUS: 'title',
            ISVALID: true
        },
        images: {
            NEXT: 'images', // Final step for campaign creation
            PREVIOUS: 'description',
            ISVALID: true
        }
    }
}

export { listingMachine, campaignMachine };
