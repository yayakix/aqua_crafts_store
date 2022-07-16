import category from "../../categories";
import CategoryCard from "../categoryitem";

function Directory() {
  return (
    <div className="category-container">
      {category.map((x) => (
        <CategoryCard key={x.id} imageUrl={x.imageUrl} title={x.title} />
      ))}
    </div>
  );
}

export default Directory;


