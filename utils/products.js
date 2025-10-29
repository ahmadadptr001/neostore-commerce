export const bestSelling = (allProducts) => {
  return allProducts.products.sort((a, b) => b.rating - a.rating).slice(0, 6);
};
