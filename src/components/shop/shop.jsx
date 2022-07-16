import { useContext,Fragment } from "react";
import { ProductsContext } from "../../context/productcontext";
import ProductCard from "./productcard";
import "../../css/shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
console.log(products)
  return (
    <Fragment>
    {/* wait 24 hr for firebase */}
      {Object.keys(products).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className="products-container">
            {products[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))}


      {/* {Object.keys(products).map((title) => (
        <Fragment key={title}>
          <h2>{title}</h2>
          <div className="products-container">
            {products[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))} */}
    </Fragment>
  );
};
export default Shop;
