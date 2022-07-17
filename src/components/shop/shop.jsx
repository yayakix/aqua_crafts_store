import "../../css/shop.styles.scss";
import { Routes, Route } from "react-router-dom";
import PreviewSections from "./previewsections";
import Section from "./section";

const Shop = () => {

  return (
    <Routes>
      <Route index element={<PreviewSections />} />
      <Route path=":category" element={<Section />} />
    </Routes>
  );
};
export default Shop;
