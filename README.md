## Example code about bidirectional communication between rabbitMQ Queue and Websockets

main.js file start a websocket, the websocket messages are sending to one rabbit queue (named "task" \*) through the code in the amqp_publisher.js handler, the rabbit messages are sended to the WS in the main file through the code in the amqp_consumer.js

WS message --> WS server inside main.js --> amqp_publisher.js --> rabbit MQ
WS <--WS server under main.js file<-- amqp_consumer.js <-- rabbit MQ

you can rename the default queue using an env variable WSTOAMQQUEUE
