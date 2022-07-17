// import category from "../categories";

import "../css/directoryitem.scss";

function CategoryCard(props) {
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${props.imageUrl})` }}
      />
      <div className="body">
        <h2>{props.title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
}

export default CategoryCard;
