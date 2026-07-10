import jwt from "jsonwebtoken";
import User from "../model/userModal.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ msg: "Authentication Invalid" });

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ msg: "Authentication Invalid" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Authentication Invalid" });
    }
  } else {
    res.status(401).json({ msg: "Authentication INvalid" });
  }
};

export const generateToken = async (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "token generation error", error });
  }
};

export const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!req.user.role || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ msg: "Yout dont have permission, please contact admin" });
    }
    next();
  };
};
