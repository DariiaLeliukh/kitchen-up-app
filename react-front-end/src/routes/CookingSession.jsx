import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import io from "socket.io-client";
import RecipeHeader from "../components/RecipeHeader";
import RecipeInstructionList from "../components/RecipeInstructionList";
import "../styles/css/forms.css";

const CookingSession = () => {
  const { auth } = useAuth();
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data for the specific cooking session using the id from the URL params
    axios
      .get(`/api/recipes/${id}/cooking-session`)
      .then((response) => setRecipe(response.data))
      .catch((error) =>
        console.error(
          "Error fetching the cooking session's recipe details:",
          error
        )
      );
  }, []);

  useEffect(() => {
    const socket = io();
    setSocket(socket);

    socket.on("connect", () => {
      setMessages((prev) => [...prev, "Connecting to the server"]);

      //Request to joing the cooking session room
      socket.emit('join session', { cookingSessionId: id, userId: auth.userId });
    });

    socket.on("system", (data) => {
      setMessages(prev => [data, ...prev]);
    });

    return () => socket.disconnect(); // prevents memory leaks
  }, []);

  // Conditionally render based on whether cookingSession is available
  if (recipe === null) {
    // If cookingSession is still null, you can render a loading state or return null
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <RecipeHeader
        title={recipe.title}
        imageUrl={recipe.image}
        ingredients={recipe.extendedIngredients}
      />
      <hr />
      {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
        <RecipeInstructionList
          instructions={recipe.analyzedInstructions[0].steps}
        />
      ) : (
        <p>No instructions available.</p>
      )}
      <hr />
      {messages.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default CookingSession;
