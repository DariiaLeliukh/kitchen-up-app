import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/css/grocery-card.css";

const GroceryList = () => {
  const { id } = useParams();  //recipe list id
  const [recipeList, setRecipeList] = useState([]);
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/recipe-lists/${id}`)
      .then((response) => {
        setRecipeList(response.data.data[0]);
      })
      .catch((error) => console.error("Error fetching recipe lists:", error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`/api/grocery-list/${id}`)
      .then((response) => {
        setGroceryList(response.data.fullIngredientList);
      })
      .catch((error) => console.error("Error fetching grocery list:", error));
  }, [id]);

  const updatePurchaseStatus = (e) => {
    const ingredientId = e.target.closest(".grocery-item").id;

    axios
      .post(`/api/grocery-list/${ingredientId}`)
      .then((response) => {
        if (response.status === 200) {
          const newArray = groceryList.map((element) => {
            if (element.id == ingredientId) {
              element.is_purchased = !element.is_purchased;
            }
            return element;
          });
          setGroceryList(newArray);
        }

      })
      .catch((error) => console.error("Error fetching grocery list:", error));

  };


  return (
    <div className="container grocery-list">
      <h2>Grocery List for {recipeList.name}</h2>

      {groceryList.length === 0 ? (
        <p>Loading</p>
      ) : (
        <div className="card-group">
          {groceryList.map((groceryItem) => (
            <div className={(groceryItem.is_purchased ? 'purchased ' : '') + "grocery-item col-12 col-md-6 col-lg-3 col-xl-4 mb-5"} key={groceryItem.id} id={groceryItem.id}>
              <div className="card h-100" onClick={updatePurchaseStatus} id={groceryItem.id}>
                <img className="card-img-top" src={`https://spoonacular.com/cdn/ingredients_250x250/${groceryItem.api_image}`} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">{groceryItem.api_nameclean}</h5>
                  <p className="card-text">{groceryItem.api_amount} {groceryItem.api_unit}</p>
                </div>
                {/* <div className="card-footer">
                  <input type="checkbox" defaultChecked={groceryItem.is_purchased} id={groceryItem.id} onClick={updatePurchaseStatus} />
                </div> */}
              </div>
            </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default GroceryList;
