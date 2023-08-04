import express from "express";
import login from "./routes/login.js";
import register from "./routes/register.js";
import chat from "./routes/chat.js";
import user from "./routes/users.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*ROUTES*/
app.use("/login", login);
app.use("/register", register);
app.use("/users", user);
app.use("/chat", chat);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running on port " + process.env.PORT);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive-message", message);
  });
  socket.on("created", (room) => {
    socket.broadcast.emit("created", room);
  });
});
