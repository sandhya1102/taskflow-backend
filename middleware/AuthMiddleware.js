import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = { id: decode.userId };
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};

export default AuthMiddleware;
