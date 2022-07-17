import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../context/productcontext";
import ProductCard from "./productcard";
import '../../css/section.styles.scss'

const Section = () => {
const { category } = useParams();
const { products } = useContext(ProductsContext);

const [product, setProduct] =  useState(products[category])

useEffect(() => {
    setProduct(products[category])

},[category, products])

return (
  <>
    <h2 className="title">{category.toUpperCase()}</h2>
    <div className="category-container">
      {product &&
        product.map((item) => <ProductCard key={item.id} product={item} />)}
    </div>
  </>
);
}

export default Section;