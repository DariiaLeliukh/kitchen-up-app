import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RecipeLists = () => {
  const [recipeLists, setRecipeLists] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    axios
      .get("/api/recipe-lists", { params: { id: auth.userId } })
      .then((response) => {
        setRecipeLists(response.data.data);
      })
      .catch((error) => console.error("Error fetching recipe lists:", error));
  }, []);

  return (
    <div className="container recipe-lists-page">
      <h1>Recipe Lists</h1>
      {recipeLists.length === 0 ? (
        <p>No recipe lists found.</p>
      ) : (
        <div className="recipe-list-container row">
          {recipeLists.map((list) => (
            <div key={list.id} className="col-6">
              <div className="recipe-item">
                <div className="recipe-title">
                  {list.name}
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={`/recipe-list/${list.id}/grocery-list`} className="button text-center">
                      Grocery List
                    </Link>
                  </div>
                  <div className="col">
                    <Link to={`/recipe-list/${list.id}`} className="button secondary-button text-center">
                      View List
                    </Link>
                  </div>
                </div>



              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeLists;
