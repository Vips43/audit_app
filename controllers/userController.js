import User from "../model/userModal";

export const loginUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ msg: "User not found" });

    
  } catch (error) {}
};
