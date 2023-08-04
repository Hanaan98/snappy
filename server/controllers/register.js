import User from "../models/user.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
export default register;
