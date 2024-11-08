// import category from "../categories";
import { Link } from "react-router-dom";
import "../css/directoryitem.scss";

function CategoryCard(props) {
  return (
    <div className="directory-item-container">
     
        <div
          className="background-image"
          style={{ backgroundImage: `url(${props.imageUrl})` }}
        />

        <div className="body">
         <Link className="directorytitles" to={`shop/${props.title.toLowerCase()}`}>
          <h2>{props.title}</h2>

          <p>Shop now</p>
          </Link>
        </div>
      
    </div>
  );
}

export default CategoryCard;
