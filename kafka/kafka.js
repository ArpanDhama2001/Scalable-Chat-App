const { Kafka, Partitioners, logLevel } = require("kafkajs");
const ip = require("ip");
const Chat = require("../models/chat");

const kafka = new Kafka({
    clientId: "scalable-chat-app",
    brokers: [`${ip.address()}:9092`],
    logLevel: logLevel.WARN, // Set log level to WARN or higher
});

// cashing the producer
let producer = null;
const topic = "Chats";

async function createProducer() {
    if (producer) return producer;
    const _producer = kafka.producer({
        createPartitioner: Partitioners.LegacyPartitioner, // Use the legacy partitioner
    });
    await _producer.connect();
    producer = _producer;
    return producer;
}

async function produceMessage(message) {
    const producer = await createProducer();
    await producer.send({
        topic,
        messages: [
            {
                key: `message-${Date.now()}`,
                value: JSON.stringify(message),
            },
        ],
    });
    return true;
}

async function consumeMessage() {
    const consumer = kafka.consumer({ groupId: "default" });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message, pause }) => {
            const { value } = message;
            const { roomid, sender, message: msg } = JSON.parse(value);
            try {
                const chat = await Chat.create({
                    roomid: roomid,
                    sender: sender,
                    content: msg,
                });
            } catch (error) {
                console.log("Something is wrong in consumer!");
                pause();
                setTimeout(() => consumer.resume([{ topic }]), 60 * 1000);
            }
        },
    });
}

module.exports = { kafka, produceMessage, consumeMessage };
