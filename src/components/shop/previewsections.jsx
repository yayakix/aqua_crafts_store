import { useContext, Fragment } from "react";
import { ProductsContext } from "../../context/productcontext";
import ProductCard from "./productcard";
import ProductPreview from "./product-preview";

const PreviewSections = () => {
  const { products } = useContext(ProductsContext);
//   console.log(products);
  return (
    <Fragment>
      {/* wait 24 hr for firebase */}
      {Object.keys(products).map((title) => {
        const productGroups = products[title];
        return (
          <ProductPreview key={title} title={title} products={productGroups} />
        );
      })}
    </Fragment>
  );
};
export default PreviewSections;
