
export const findKeyWords =  (listing, keywords, categories) => {

  if (keywords) {
    const listingTypeName =  getCategoryNameById(listing.category_id, categories);
    
    const lowerCaseKeywords = keywords.toLowerCase().replace(/\s+/g, "");
    const processedTitle = listing.title.toLowerCase().replace(/\s+/g, "");
    const processedDescription = listing.description.toLowerCase().replace(/\s+/g, "");
    const processedListingTypeName = listingTypeName.toLowerCase().replace(/\s+/g, "");

    const keywordArray = keywords.split(" ");
    
    const allKeywordsTitle = keywordArray.some((keyword) => {
      const singular = keyword.endsWith("s") ? keyword.slice(0, -1) : keyword;
      const plural = keyword + "s";
      return (
        processedTitle.includes(singular) || processedTitle.includes(plural)
      );
    });

    const allKeywordsDescription = keywordArray.some((keyword) => {
      const singular = keyword.endsWith("s") ? keyword.slice(0, -1) : keyword;
      const plural = keyword + "s";
      return (
        processedDescription.includes(singular) ||
        processedDescription.includes(plural)
      );
    });

    const allKeywordsCategoryName = keywordArray.some((keyword) => {
      const singular = keyword.endsWith("s") ? keyword.slice(0, -1) : keyword;
      const plural = keyword + "s";
      return (
        processedListingTypeName.includes(singular) ||
        processedListingTypeName.includes(plural)
      );
    });

    return (
      processedTitle.includes(lowerCaseKeywords) ||
      processedDescription.includes(lowerCaseKeywords) ||
      allKeywordsTitle ||
      allKeywordsDescription ||
      allKeywordsCategoryName

    );
  }
  return true;
};


const getCategoryNameById =  (categoryId, categories) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : '';
};