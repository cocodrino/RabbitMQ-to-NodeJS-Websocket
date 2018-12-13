const amqp_consumer = require("./amqp_consumer").amqp_consumer;
const amqp_publisher = require("./amqp_publisher").amqp_publisher;
let http = require("http");
let WSServer = require("websocket").server;

var count = 0;
var clients = [];

async function WSConnect() {
  try {
    console.log("[*] WS ready");
    let amqpResponses = await amqp_consumer();
    let amqp_publisher = await amqp_publisher();
    console.log("[*] rabbitMQ ready");

    wsServer.on("request", async req => {
      let connection = req.accept(null, req.origin);
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
        amqp_publisher(msgString);
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

let server = http.createServer((req, resp) => {});
let wsServer = new WSServer({
  httpServer: server
});

server.listen(1234, () =>
  console.log(`${new Date()} Server is listening on port 1234`)
);

(async function() {
  await WSConnect();
})();
