export const bestSelling = (allProducts) => {
  return allProducts.products.sort((a, b) => b.rating - a.rating).slice(0, 6);
};

const getAllCategoryName = (allProducts) => {
  const allCategory = [];
  allProducts.map(item => {
    allCategory.push(item.category)
  })

  return [...new Set(allCategory)];
}