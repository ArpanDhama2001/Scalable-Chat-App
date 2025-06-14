# 💬 Scalable Chat App

A real-time, horizontally scalable chat application built using **Node.js**, **Socket.IO**, **Redis Pub/Sub**, and **Kafka** to ensure high throughput, fault-tolerance, and inter-server messaging support.

## Features

- 🔗 Real-time messaging via WebSockets (Socket.IO)
- 🌐 Horizontally scalable using Redis Pub/Sub for inter-server communication
- ⚡ High-throughput message ingestion using Kafka
- 💾 Asynchronous and durable message persistence to the database
- 👥 Group-based chat rooms with dynamic user join/leave tracking
- 🖥️ EJS-based minimal UI for testing and demonstration
- 📉 Database protection via pause/resume mechanism on Kafka consumer during DB failure

## Architecture Overview


- Users connect to **any WebSocket server instance**.
- Messages are broadcast across servers using **Redis Pub/Sub**.
- Each message is **published to Kafka**, not written directly to the DB.
- Kafka consumer **persists messages to the database** asynchronously.
- If DB goes down, consumer **pauses** and resumes once DB recovers.

## Technologies Used

| Layer            | Tech Stack                      |
|------------------|----------------------------------|
| Server           | Node.js, Express.js              |
| Real-time Comm   | Socket.IO                        |
| Inter-server Bus | Redis (Pub/Sub)                  |
| Async Messaging  | Kafka (kafkajs)                  |
| DB Layer         | MongoDB (via Mongoose) |
| Frontend View    | EJS, HTML/CSS                    |

## Project Structure

```

.
├── config/           # DB and server config
├── kafka/            # Kafka producer & consumer logic
├── redis/            # Redis client setup
├── sockets/          # Socket event handlers
├── models/           # DB schemas/models
├── routes/           # Express routes
├── views/            # EJS templates
├── public/           # Static assets (CSS)
├── index.js          # Main entry point

````

## Setup Instructions

### Prerequisites

- Node.js & npm
- Redis server running
- Kafka broker running on port `9092`
- MongoDB running locally or via cloud (e.g., Atlas)

### Install Dependencies

```bash
npm install
````

### Run the App

```bash
node index.js
```

### Access the App

Open your browser and visit: [http://localhost:3001](http://localhost:3001)


## Design Highlights

* **Scalability**: Redis Pub/Sub enables multi-instance communication
* **Reliability**: Kafka decouples real-time logic from persistence
* **Resilience**: Built-in fallback when database is down

