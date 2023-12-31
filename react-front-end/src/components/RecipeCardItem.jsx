import { Link } from 'react-router-dom';
import "../styles/css/recipe-card.css";

const RecipeCardItem = (props) => {
  const { id, imageUrl, title } = props;

  return (
    <Link
      to={`/recipes/${id}`}
      className='recipe-card col-12 col-md-6 col-lg-4 col-xl-3 mb-4'
    >
      <div className="card h-100">
        {imageUrl && (
          <img src={imageUrl} className="card-img-top" alt="..." />
        )}
        {!imageUrl && (
          <img src="/src/assets/recipe-demo-card.jpg" className="card-img-top" alt="..." />
        )}

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCardItem;