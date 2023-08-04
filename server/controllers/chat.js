import Chat from "../models/chat.js";
export const sendMsg = async (req, res) => {
  try {
    const { text, users, sender } = req.body;
    const chat = new Chat({
      text,
      users,
      sender,
    });
    await chat.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getMsg = async (req, res) => {
  try {
    const userId = req.params.id;
    const friendId = req.params.friendId;
    const chat = await Chat.find({
      users: { $all: [userId, friendId] },
    });
    res.status(200).json({ message: "Messages fetched successfully", chat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
