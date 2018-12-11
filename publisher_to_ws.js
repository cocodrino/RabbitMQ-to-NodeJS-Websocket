import amqp_consumer from "./amqp_consumer";
let http = require("http");
let WSServer = require("websocket").server;

let server = http.createServer((req, resp) => {});
let wsServer = new WSServer({
  httpServer: server
});

server.listen(1234, () =>
  console.log(`${new Date()} Server is listening on port 1234`)
);

var count = 0;
var clients = [];

async function WSConnect() {
  try {
    console.log("[*] WS ready");
    let { amqpResponses } = await amqp_consumer();
    console.log("[*] rabbitMQ ready");
    wsServer.on("request", async r => {
      let connection = r.accept(null, r.origin);
      let id = count++;
      clients[id] = connection;
      console.log(`connection accepted, clientId ${id}`);
      amqpResponses(rspAMQP => {
        clients.forEach(client => {
          client.sendUTF(rspAMQP);
        });
      });

      connection.on("message", message => {
        var msgString = message.utf8Data;
        clients.forEach(client => {
          client.sendUTF(msgString);
        });
      });

      connection.on("close", (reason, desc) => {
        delete clients[id];
        console.log(
          `${new Date()} client ${id} : ${
            connection.remoteAddress
          } disconnected ${reason},${desc}`
        );
      });
    });
  } catch (err) {
    console.log("ERR: " + err);
  }
}

(async function() {
  await WSConnect();
})();
