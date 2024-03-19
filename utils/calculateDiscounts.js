export const calculateDiscounts = (discounts, duration) => {
  let hasDiscount = false;
  console.log('duration',duration)
  console.log('discounts',discounts)
  if (discounts.length == 1 && duration > discounts[0].duration  ) {
    return discounts[0].discount;
  }

  const appliedDiscount = discounts.reduce(
    (prev, current) => {

      if (duration >= current.duration && current.duration > prev.duration) {
        return current;
      } else {
        return prev;
      }
    },
    { duration: 0, discount: 0 }
  );

  if (appliedDiscount.duration > 0) {
    hasDiscount = true;
    return appliedDiscount.discount;
  }
  if (!hasDiscount) {
    return 0;
  }
};
