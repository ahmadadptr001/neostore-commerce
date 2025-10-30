export const bestSelling = (allProducts) => {
  return allProducts.products.sort((a, b) => b.rating - a.rating).slice(0, 6);
};

export const getAllCategoryName = (allProducts) => {
  const allCategory = [];
  allProducts.map(item => {
    allCategory.push(item.category)
  })

  return [...new Set(allCategory)];
}

export const getPriceDiscount = (discount, price) => {
  const priceNow = price * ((100 - discount) / 100)
  const priceFixed = priceNow.toFixed(2);
  return priceFixed;
}