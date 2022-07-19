import category from "../../categories";
import CategoryCard from "../categoryitem";

function Directory() {
  return (
    <div>
    <h1 className="websitetitle">
      Amazon Queens Unlimited Art
    </h1>
      <div className="directory-container">
        {category.map((x) => (
          <CategoryCard key={x.id} imageUrl={x.imageUrl} title={x.title} />
        ))}
      </div>
    </div>
  );
}

export default Directory;


