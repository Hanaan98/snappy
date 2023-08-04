import express from "express";
import { getMsg, sendMsg } from "../controllers/chat.js";
const router = express.Router();
router.post("/send", sendMsg);
router.get("/get/:id/:friendId", getMsg);
export default router;
