export const checkCategoryType = (id) => {
    const OneTimeCategories = [4,8,12,18]
    const unitCategories = [7,17,19,20,21,22]
    if(OneTimeCategories.includes(id)){
        return 1 // one time 
    }else if (unitCategories.includes(id)){
        return 2 // unit based
    }
    return 0 //recurrent
  }