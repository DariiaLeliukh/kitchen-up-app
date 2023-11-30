const { Server } = require("socket.io");

//socketConfig.configureSocketConnections(app, httpServer);
// require('dotenv').config();

const configureSocketConnections = (app, httpServer) => {
  console.log(`Configuring the sockets`);
  // // Enable Cookie Sessions
  // const cookieSession = require("cookie-session"); // for Client Cookie Sessions
  // const session = cookieSession({
  //   name: "cookingSession",
  //   keys: [process.env.ACCESS_TOKEN_SECRET],
  //   sameSite: true,
  // });
  // app.use(session);

  // Start WS Server
  const io = new Server(httpServer, {
    connectionStateRecovery: {}
  });

  // // Allow socket.io to access session
  // const wrap = (middleware) => (socket, next) =>
  //   middleware(socket.request, {}, next);
  // io.use(wrap(session));

  //data structure to hold the different cooking sessions' information
  const cookingSessions = {};

  io.on("connection", (client) => {
    // const session = client.request.session;
    // const name = session?.user?.name;

    console.log("Client Connected! : ", client.id);
    io.emit("system", `A new user has just joined. Welcome! ${client.id}`);
  });
};

module.exports = {configureSocketConnections};