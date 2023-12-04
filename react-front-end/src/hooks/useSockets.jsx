import { useEffect, useState } from "react";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

const useSockets = (cookingSessionId) => {
  const { auth } = useAuth();
  const [socket, setSocket] = useState();
  const [recipeStepStructure, setRecipeStepStructure] = useState(null);

  const [positions, setPositions] = useState({});
  //const [messages, setMessages] = useState([]); //TODO: Delete if not using messages or text/voice chat

  const setCookingInstructions = (cookingInstructions) => {
    if (cookingInstructions) {
      const initialPositions = {};

      for (let step of cookingInstructions) {
        initialPositions[step.number] = [];
      }

      // An object containing an empty array of users for each step, such as { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] }
      setRecipeStepStructure(initialPositions);
    }
  };

  // Create and connect the websockets to the server
  useEffect(() => {
    // Ensure the recipe instructions structure is ready before creating the websockets
    if (recipeStepStructure) {
      const socket = io();
      setSocket(socket);

      socket.on("connect", () => {
        // setMessages((prev) => [...prev, "Connecting to the server"]);
        
        //Request to joing the cooking session room
        socket.emit("join session", {
          cookingSessionId: cookingSessionId,
          userId: auth.userId,
          profilePictureUrl: auth.profilePictureUrl,
        });
      });

      socket.on("positions", (connectedUsers) => {
        //Deep copy of the structure. Using the spread operator (...) won't work as it is a shallow copy
        const friendsPositions = JSON.parse(JSON.stringify(recipeStepStructure));
        
        //Put the each users' profile picture in the corresponding step's array
        for (let user of Object.keys(connectedUsers)) {
          friendsPositions[connectedUsers[user].step].push(
            connectedUsers[user].profilePictureUrl
          );
        }

        setPositions(friendsPositions);
      });

      // socket.on("system", (data) => {
      //   setMessages((prev) => [data, ...prev]);
      // });

      return () => socket.disconnect(); // prevents memory leaks
    }
  }, [recipeStepStructure]);

  // send the new current step of the user
  const setCurrentStep = function (currentStep) {
    socket.emit("cooking progress", currentStep);
  };

  // Return an object with values and functions to be used outside the custom hook
  return {
    setCookingInstructions,
    setCurrentStep,
    positions
  };
};

export default useSockets;