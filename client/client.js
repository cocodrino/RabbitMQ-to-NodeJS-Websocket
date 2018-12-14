var ws = new WebSocket("ws://192.168.1.1:1234", "echo-protocol");

ws.onopen = () => {
  console.log("connected");
  ws.send("hola");
};
ws.onerror = err => console.log(`ERR: ${JSON.stringify(err)}`);

ws.addEventListener("message", function(e) {
  // The data is simply the message that we're sending back
  var msg = e.data;

  // Append the message
  document.writeln(`${msg} <br><br>`);
});
