import { generateToken } from "../middleware/authMiddleware.js";
import User from "../model/userModal.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isPass = await user.comparePassword(password);
    if (!isPass) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    generateToken(res, user._id);
    const userRes = user.toObject();
    delete userRes.password;
    
    res.status(200).json(userRes);
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "server error", error });
  }
};
