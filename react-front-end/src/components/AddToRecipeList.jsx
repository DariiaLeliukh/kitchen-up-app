import { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const AddToRecipeList = (props) => {

  const [recipeLists, setRecipeLists] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const addToRecipeList = async (e) => {
    e.preventDefault();
    const recipeListId = e.target.value;
    const recipeId = props.recipeId;

    try {
      await axios.post("/api/recipe-list-items", { recipeListId, recipeId })
        .then(() => {
          navigate(`/recipe-list/${recipeListId}`);
        });
    } catch (error) {
      console.error("Error adding recipe to the list:", error);
    }

  };

  useEffect(() => {
    axios
      .get("/api/recipe-lists", { params: { id: auth.userId } })
      .then((response) => {
        setRecipeLists(response.data.data);
      })
      .catch((error) => console.error("Error fetching recipe lists:", error));
  }, [auth.userId]);

  return (
    <>
      {
        auth.userId && <div>
          <label htmlFor="recipe-lists">Add to recipe list:</label>

          <select name="recipe-lists" id="recipe-lists" onChange={addToRecipeList}>
            <option value={"placeholder"}>Select list</option>
            {recipeLists.map((list) => (
              <option key={list.id} value={list.id}>{list.name}</option>
            ))}
          </select>
        </div>
      }
      {
        !auth.userId && <>
          <button onClick={props.notAuthorized}>Add to recipe list</button>
        </>
      }
    </>
  );
};

export default AddToRecipeList;