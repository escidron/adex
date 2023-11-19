export const findKeyWords = (listing, keywords) => {
    
    if (keywords) {
      const lowerCaseKeywords = keywords.toLowerCase().replace(/\s+/g, '');
      const processedTitle = listing.title.toLowerCase().replace(/\s+/g, '');
      const processedDescription = listing.description.toLowerCase().replace(/\s+/g, '');
      //const processedInstructions = listing.instructions?.toLowerCase().replace(/\s+/g, '');
      const allKeywordsTitle = keywords.split(' ').some(keyword => processedTitle.includes(keyword));
      const allKeywordsDescription = keywords.split(' ').some(keyword => processedDescription.includes(keyword));

    return (
        processedTitle.includes(lowerCaseKeywords) ||
        processedDescription.includes(lowerCaseKeywords)  ||
        allKeywordsTitle ||
        allKeywordsDescription

        // || processedInstructions?.includes(lowerCaseKeywords)
    );
  }
  return true;
};
