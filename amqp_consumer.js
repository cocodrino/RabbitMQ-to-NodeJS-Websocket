export default async function amqp_consumer() {
  const q = "tasks";
  try {
    console.log("[*] Connecting");
    let con = await require("amqplib").connect(
      "amqp://tvobttnq:Ri6S8XroB9gRiIvSesqQMa2KcWI_IOkB@otter.rmq.cloudamqp.com/tvobttnq"
    );

    let ch = await con.createChannel();
    let _ok = await ch.assertQueue(q, { durable: false });
    console.log("[*] connected to amqp");
    console.log("------------------------");

    let amqpResponses = function(cllb) {
      console.log("[*] wating for messages");
      ch.consume(
        q,
        msg => {
          console.log(`[*] Msg received: ${msg.content.toString()} \n\n`);
          cllb(msg.content.toString());
        },
        { noAck: true }
      );
    };

    return { amqpResponses };
  } catch (error) {
    console.log("ERR:" + error);
  }
}
