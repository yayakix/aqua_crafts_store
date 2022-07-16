// import category from "../categories";
// import "./categories.styles.scss";

function CategoryCard(props) {
  return (
      <div className="singlecategorybox">
        <div
          className="backgroundimg"
          style={{ backgroundImage: `url(${props.imageUrl})` }}
        />
        <div className="categorybody">
          <h2>{props.title}</h2>
          <p>Shop now</p>
        </div>
      </div>
  );
}

export default CategoryCard;
