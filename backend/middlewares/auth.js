import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  const user = jwt.verify(token, process.env.JWT_SECRET_CODE);
  req.user = user;
  next();
};

export default authMiddleware;
