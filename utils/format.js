export const formatPrice = (price) => {
    
  console.log('price0',price)
  return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,  
      maximumFractionDigits: 2
    }).format(price)
  }