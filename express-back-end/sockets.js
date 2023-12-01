const { Server } = require("socket.io");
// require('dotenv').config();

const configureSocketConnections = (httpServer) => {
  console.log(`Configuring the sockets`);

  /*
  Data structure to hold the different cooking sessions' information

  const cookingSessions = {
    cookingSessionId = {
      userId: step
    },
  };
  */
  const cookingSessions = {};

  // Start WS Server
  const io = new Server(httpServer, {
    connectionStateRecovery: {}
  });

  io.on("connection", (client) => {
    let userId, cookingSessionId;

    console.log(`Client Connected: ${client.id}`);
    
    client.on("join session", (data) => {
      // retrieve the user and the cooking session's id
      ({ userId, cookingSessionId } = data);

      if (!cookingSessions[cookingSessionId]) {
        // initiate the cooking session with an empty room if it was not open
        cookingSessions[cookingSessionId] = {};
      }

      // register the user in the room if they were not there before (just reconnecting)
      if (!cookingSessions[cookingSessionId][userId]) {
        // register the user in the cooking session data structure setting them at the first step
        cookingSessions[cookingSessionId][userId] = 1;//start at Step: 1
  
        // joing the cooking session room
        client.join(cookingSessionId);
        // message everyone's positions to everyone in the room
        io.to(cookingSessionId).emit("positions", cookingSessions[cookingSessionId]);

        console.log(`User #${userId} joined the cooking session #${cookingSessionId}`);
      }
    });

    client.on("disconnect", () => {
      console.log(`Client Disconnected: ${client.id}`);
      
      delete cookingSessions[cookingSessionId][userId];
    });
  });
};

module.exports = {configureSocketConnections};