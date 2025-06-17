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
- Docker

### Install Dependencies

```bash
npm install
````

### Create .env file

```bash
cp .env.example .env
```
- then edit the variables as required

### Run Docker containers
```bash
docker compose up -d
```
### Run the app
```bash
npm run dev
```

### Access the App

Open your browser and visit: [http://localhost:3001/groups](http://localhost:3001/groups)


## Design Highlights

* **Scalability**: Redis Pub/Sub enables multi-instance communication
* **Reliability**: Kafka decouples real-time logic from persistence
* **Resilience**: Built-in fallback when database is down

