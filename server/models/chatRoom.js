import mongoose from "mongoose";
const chatRoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
});
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default ChatRoom;
