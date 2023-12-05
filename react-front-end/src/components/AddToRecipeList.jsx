import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const AddToRecipeList = (props) => {

  const [recipeLists, setRecipeLists] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const addToRecipeList = async (e) => {
    if (e) {
      const recipeId = props.recipeId;

      if (e.__isNew__) {       // New List is created
        const newListName = e.value.replace(/[\W_]+/g, " ");

        try {
          await axios.post(`/api/recipe-lists/?newListName=${newListName}&recipeId=${recipeId}&userId=${auth.userId}`)
            .then((response) => {
              const newRecipeId = response.data.newRecipeId;
              navigate(`/recipe-list/${newRecipeId}`);
            });
        } catch (error) {
          console.error("Error adding recipe to the list:", error);
        }
      }
      else {
        const recipeListId = e.value;
        try {
          await axios.post(`/api/recipe-lists/${recipeListId}/item/${recipeId}`)
            .then(() => {
              navigate(`/recipe-list/${recipeListId}`);
            });
        } catch (error) {
          console.error("Error adding recipe to the list:", error);
        }
      }
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

  const options = recipeLists.map((list) => (
    { value: list.id, label: list.name }
  ));

  return (
    <>
      {
        auth.userId &&
        <CreatableSelect
          isClearable
          options={options}
          onChange={addToRecipeList}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: '54px',
              minHeight: '54px'
            }),
          }}
        />
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