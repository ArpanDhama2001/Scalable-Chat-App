# 🎥 Adaptive Video Streaming App

A backend-driven adaptive bitrate streaming platform built using Node.js, Express, FFmpeg, and HLS. This project enables smooth video playback across varying network conditions using HTTP Live Streaming (HLS).

---

## 📖 Overview

This project simulates a production-grade adaptive video streaming platform. Users can upload `.mp4` videos, which are then transcoded to multiple resolutions using **FFmpeg**, segmented into `.ts` chunks, and delivered to the client using **HLS** (`.m3u8` playlists). The video automatically adapts to network speed, providing the best viewing experience.

This project demonstrates backend skills including file handling, media processing, asynchronous operations, streaming architecture, and integration with MongoDB.

---

## 🚀 Key Features

- 🎬 Upload `.mp4` videos via frontend interface
- ⚙️ Backend triggers FFmpeg to transcode to 1080p, 720p, and 480p
- 📡 Segment videos into `.ts` files with `.m3u8` playlists (HLS)
- 📦 Serve videos for adaptive playback via HTML5 `<video>` player
- 🧱 MongoDB for metadata storage and request handling
- 🧰 Clean and modular code using Express.js

---

## 🛠️ Tech Stack

| Layer       | Tech                                             |
|-------------|--------------------------------------------------|
| Backend     | Node.js, Express.js                              |
| Media Tools | FFmpeg                                           |
| Streaming   | HLS (HTTP Live Streaming)                        |
| File Upload | Multer                                           |
| Database    | MongoDB (via Mongoose)                           |
| Frontend    | Next.js, HTML5 Video Player, JavaScript          |
| Dev Tools   | Nodemon, Postman                                 |

---

## ⚙️ Setup Instructions

### 🔹 Prerequisites
- [Node.js](https://nodejs.org/)
- [FFmpeg](https://ffmpeg.org/)
- [MongoDB](https://www.mongodb.com/)

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/ArpanDhama2001/Scalable-Chat-App.git
cd Scalable-Chat-App
```

### 🔹 Install Dependencies

```bash
npm install
```

### 🔹 3. Configure Environment Variables

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 🔹 4. Start the Server

```bash
npm run dev
```
