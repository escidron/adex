export const findKeyWords = (listing, keywords) => {
  if (keywords) {
    const lowerCaseKeywords = keywords.toLowerCase().replace(/\s+/g, "");
    const processedTitle = listing.title.toLowerCase().replace(/\s+/g, "");
    const processedDescription = listing.description
      .toLowerCase()
      .replace(/\s+/g, "");

    // const allKeywordsTitle = keywords.split(' ').some(keyword => processedTitle.includes(keyword));
    // const allKeywordsDescription = keywords.split(' ').some(keyword => processedDescription.includes(keyword));

    const keywordArray = keywords.split(" ");

    // Check if any form (singular or plural) of the keyword is present
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

    return (
      processedTitle.includes(lowerCaseKeywords) ||
      processedDescription.includes(lowerCaseKeywords) ||
      allKeywordsTitle ||
      allKeywordsDescription

      // || processedInstructions?.includes(lowerCaseKeywords)
    );
  }
  return true;
};
