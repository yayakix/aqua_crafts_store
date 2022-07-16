import { useContext } from "react";
import { ProductsContext } from "../../context/productcontext";
import ProductCard from "./productcard";
import '../../css/shop.styles.scss'

const Shop = () =>{
    const {products} = useContext(ProductsContext)

    return (
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );

}
export default Shop;