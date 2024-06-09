import { value } from "@radix-ui/react-select";

export const faqArray = [
  {
    id: 1,
    question: "What is required to create a listing?",
    answer: "You must create a profile and complete all the required fields. Additionally, at least one Payout method is required before your listing(s) can be viewed and booked from the Marketplace.",
  },
  {
    id: 2,
    question: "Is there a fee to create a listing?",
    answer: "No",
  },
  {
    id: 3,
    question: "How do I create a listing?",
    answer:
      "Register, create a profile, then select 'Create Listing' and follow the process flow.",
  },
  {
    id: 4,
    question: "How do I book a listing?",
    answer:
      "Register, create a profile, browse Marke Place for listings. Select desired listing then hit 'Request'",
  },
  {
    id: 5,
    question: "How do I make my listing stand out?",
    answer:
      "Give your listing a creative title, provide a clear & concise ad description, use bullet format for readability.",
  },
  {
    id: 6,
    question: "Can I create a listing for someone else?",
    answer:
      "It’s best that the owner of the asset or, in the case of a business, a staff member of the asset owner create the listing.",
  },
  {
    id: 7,
    bulletPoint: true,
    question: "What can I use as an ad asset?",
    answer: [
      {
        key:'Have a house:',
        value:'offer up your lawn and fence.'
      },
      {
        key:'Have a vehicle:',
        value:'offer up your windows, doors, or back panel.'
      },
      {
        key:'Have a business with a physical location:',
        value:'offer up your windows, doors, table tops, bathroom stalls, interior / exterior walls, parking spaces, napkins, coasters, pizza boxes, carry out boxes, empty floor space, etc.'
      },
      {
        key:'Are you a performance artist:',
        value:'allow buyers to place an ad on stage and / or offer to give several verbal “shout outs” during the concert.'
      },
      {
        key:'Do you command a lot of attention where ever you go:',
        value:'offer to wear ad apparel (hat, shirt, workout pants, hoodies, etc.).'
      },
      {
        key:'Have a website or social media page with a decent following:',
        value:'offer to post ads.'
      },
      {
        key:'Do you throw lots of parties or organize lots of events:',
        value:'allow buyers to place an ad at the event and / or offer to give several verbal “shout outs” during the event.'
      },
      {
        key:'Other ad assets we’ve seen:',
        value:'gym equipment, bus stops, top of a scoreboard, shopping carts, golf carts, you can place an ad sign just about anywhere people can see them.'
      },
      {
        key:'With ADEX, your creativity is your only limitation. Any person, place, or thing - options are endless!',
        value:''
      }
    ]  
  },
  {
    id: 8,
    question:
      "What if I have an unconventional asset but it’s not a subcategory on the site?",
    answer:
      "Use 'other' found under all the main categories and simply describe your advertising opportunity to would-be buyers.",
  },
  {
    id: 9,
    question: "How many listings can I create?",
    answer:
      "As many as you would like as long as you have an asset to list. The rule of thumb is, one listing per asset.",
  },
  {
    id: 10,
    question: "Can I cancel a booking?",
    answer:
      "Yes, Buyers have five (5) calendar days to vet and / or cancel the booking. There are two cancellation scenarios:\n\nScenario 1 – Buyer cancels before booking starts:\nBuyers have a 5-day vetting/cancellation period, if the buyer doesn’t cancel within this period, the money is released to the seller.\nScenario 2 – Buyer cancels booking longer than one month after the booking has already started:\nIf the booking is longer than one month, the buyer must cancel before the start of the next month. Refunds will only be given for unused months.",
  },
  {
    id: 11,
    question: "Can I contact the seller directly outside of ADEX?",
    answer:
      "ADEX provides users with tools to connect and inquire about listings. ADEX brings value to the marketplace by connecting buyers and sellers. We ask that all bookings are executed through our service (website or App). We understand that in-person contact may be required to fully vet the booking location or event. However, if it’s discovered that users connected through our service (website or App) then decide to take their negotiations off-service, these users will be banned from further use of ADEX.",
  },
  {
    id: 12,
    question: "How do I contact the seller?",
    answer:
      "As with other popular marketplaces, utilize our platform messenger to connect with sellers regarding logistics, ad material hand-off or placement, on-site verification visits, etc.",
  },
  {
    id: 13,
    question: "What is the booking fee?",
    answer:
      "ADEX charges a sales/booking fee of 10% to be paid by the seller. This fee is ONLY applied when a listing is booked and payment is received from the buyer. The 10% is automatically deducted from the seller’s total sales/booking price. For example, if the sales/booking amount is $100, 10%, (in this case $10) is deducted and paid to ADEX. The seller would receive $90 for the sale.",
  },
];
