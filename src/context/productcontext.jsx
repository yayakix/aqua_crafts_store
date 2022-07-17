import { createContext, useState, useEffect } from "react";
import {  getCategoriesAndDocuments } from "../firebase/firebase.js";


export const ProductsContext = createContext({
    products: {},
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState({});




  useEffect (() => {
      const getCategoriesMap =  async () => {
          const categoryMap = await getCategoriesAndDocuments();
          setProducts(categoryMap)
      }
      getCategoriesMap();
  }, [])

  // useEffect(() => {
  //     addCollectionAndDocuments('categories', SHOP_DATA)
  //     // create categories colleciton in firestore
  // }, [])
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}