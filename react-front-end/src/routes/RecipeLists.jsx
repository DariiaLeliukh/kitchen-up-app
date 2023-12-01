import React, { useEffect, useState } from "react";
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
    <div className="container">
      <h1>Recipe Lists</h1>
      {recipeLists.length === 0 ? (
        <p>No recipe lists found.</p>
      ) : (
        <ul>
          {recipeLists.map((list) => (
            <li key={list.id}>
              <strong>{list.name}</strong> - Created on{" "}
              {new Date(list.created_at).toLocaleDateString()}
              <Link to={`/recipe-list/${list.id}/grocery-list`}>
                <button>Grocery List</button>
              </Link>
              <Link to={`/recipe-list/${list.id}`}>
                <button>View List</button>{" "}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeLists;
