import User from "../models/user.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No User Found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
export const getUser = async (req, res) => {
  try {
    const users = await User.findById({ _id: req.params.id });
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
