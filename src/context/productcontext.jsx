import { createContext, useState, useEffect } from "react";
import SHOP_DATA from '../shopdata.js';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../firebase/firebase.js";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState([]);




  useEffect (() => {
      const getCategoriesMap =  async () => {
        //   const categoryMap = await getCategoriesAndDocuments();
let categoryMap = await SHOP_DATA
          // console.log(categoryMap) contains object of firestore data
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