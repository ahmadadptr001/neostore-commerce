export const bestSelling = (allProducts) => {
  return allProducts.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 6);
};
