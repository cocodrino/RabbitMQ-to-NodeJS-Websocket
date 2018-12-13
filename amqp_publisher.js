const QUEUE = process.env.WSTOAMQQUEUE || "tasks";
async function amqp_publisher() {
  try {
    console.log("[*] Connecting");
    let con = await require("amqplib").connect(
      "amqp://tvobttnq:Ri6S8XroB9gRiIvSesqQMa2KcWI_IOkB@otter.rmq.cloudamqp.com/tvobttnq"
    );

    let ch = await con.createChannel();
    let _ok = await ch.assertQueue(QUEUE, { durable: false });

    let sendToAMQP = messgString => {
      console.log(`[*] sending Hello message`);
      ch.sendToQueue(QUEUE, Buffer.from(messgString));
    };

    return sendToAMQP;
    //con.close();
  } catch (error) {
    console.log("ERR:" + error);
  }
}

module.exports = {
  amqp_publisher
};
