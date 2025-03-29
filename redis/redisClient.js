const Redis = require("ioredis");

const pub = new Redis();
const sub = new Redis();

pub.on("error", (err) => console.error("Redis Publisher Error:", err));
sub.on("error", (err) => console.error("Redis Subscriber Error:", err));

module.exports = { pub, sub };
