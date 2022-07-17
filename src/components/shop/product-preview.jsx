import "../../css/productpreview.scss";
import ProductCard from "./productcard";
import { Link } from "react-router-dom";


const ProductPreview = ({ title, products }) => {
  return (
    <div className="category-container">
      <h2>
        <Link className="title" to={title}>{title.toUpperCase}</Link>
      </h2>
      <div className="preview">
          {products
          .filter((_, idx) => idx < 4)
          .map((product) => <ProductCard key={product.id} product={product}/>)
          }
      </div>
    </div>
  );
};

export default ProductPreview;
