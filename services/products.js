import axios from 'axios';

export const getAllProducts = async () => {
  const url = 'https://dummyjson.com/products';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getProductByTitle = async (title) => {
  const url = 'https://dummyjson.com/products?title=' + title;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getSingleProducts = async (id) => {
  const url = 'https://dummyjson.com/products/' + id;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getAllCategories = async () => {
  const url = 'https://dummyjson.com/products/category-list';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const getProductByCategory = async (categoryName) => {
  const url = 'https://dummyjson.com/products/category/' + categoryName;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
