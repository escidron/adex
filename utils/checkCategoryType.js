export const checkCategoryType = (id) => {
    
    const OneTimeCategories = [4,8,12,18]
    const unitCategories = 17
    if(OneTimeCategories.includes(id)){
        return 1 // one time 
    }else if (unitCategories == id){
        return 2 // unit based
    }
    return 0 //recurrent
  }