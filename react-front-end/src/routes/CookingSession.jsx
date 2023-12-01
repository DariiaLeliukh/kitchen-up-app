import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import io from "socket.io-client";
import RecipeHeader from "../components/RecipeHeader";
import RecipeInstructionList from "../components/RecipeInstructionList";
import "../styles/css/forms.css";

const CookingSession = () => {
  const { auth } = useAuth();
  const [socket, setSocket] = useState();
  //const [messages, setMessages] = useState([]); //TODO: Delete if not using messages or text/voice chat
  const [recipe, setRecipe] = useState(null);
  // An object containing an array of users in each step, such as { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
  const [positions, setPositions] = useState({});
  const { id } = useParams();

  const setRecipeStepStructure = () => {
    if (recipe.analyzedInstructions) {
      const initialPositions = {};

      for (let step of recipe.analyzedInstructions[0].steps) {
        initialPositions[step.number] = [];
      }

      return initialPositions;
    }

    return null;
  };

  // Fetch data for the specific cooking session using the id from the URL params
  useEffect(() => {    
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

  //TODO: Move the logic to RecipeInstructionList component if no other socket event is taking place, such as text/voice messages
  // Create and connect the websockets to the server
  useEffect(() => {
    // Ensure the recipe instructions are received and ready before prepare the positions structure and creating websockets
    if (recipe) {
      const socket = io();
      setSocket(socket);

      socket.on("connect", () => {
        // setMessages((prev) => [...prev, "Connecting to the server"]);

        //Request to joing the cooking session room
        socket.emit("join session", {
          cookingSessionId: id,
          userId: auth.userId,
          profilePictureUrl: auth.profilePictureUrl,
        });
      });

      socket.on("positions", (connectedUsers) => {
        
        const friendsPositions = setRecipeStepStructure();

        if (friendsPositions) {
          console.log(friendsPositions, connectedUsers);
          for (let user of Object.keys(connectedUsers)) {
            console.log(connectedUsers[user]);
            console.log(connectedUsers[user].step);
            console.log(connectedUsers[user].profilePictureUrl);
            friendsPositions[connectedUsers[user].step].push(
              connectedUsers[user].profilePictureUrl
            );
          }

          setPositions(friendsPositions);
        }
      });

      // socket.on("system", (data) => {
      //   setMessages((prev) => [data, ...prev]);
      // });

      return () => socket.disconnect(); // prevents memory leaks
    }
  }, [recipe]);

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
          positions={positions}
        />
      ) : (
        <p>No instructions available.</p>
      )}
      <hr />
      {/*messages.map((item, index) => (
        <p key={index}>{item}</p>
      ))*/}
    </div>
  );
};

export default CookingSession;
