## Example code about bidirectional communication between rabbitMQ Queue and Websockets

main.js file start a websocket, the websocket messages are sending to one rabbit queue (named "task" \*) through the code in the amqp_publisher.js handler, the rabbit messages are sended to the WS in the main file through the code in the amqp_consumer.js

<br>

<br>

<br>

<br>

<br>

## DIAGRAM

![enter image description here](https://github.com/cocodrino/RabbitMQ-to-NodeJS-Websocket/blob/master/images/graph.png?raw=true)

> Written with [StackEdit](https://stackedit.io/).
