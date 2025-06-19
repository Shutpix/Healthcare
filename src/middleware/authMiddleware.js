const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // 1. Get token from cookie or Authorization header
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Access denied. Token missing." });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "Shutpix@123");

    // 3. Find user from decoded token
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token. User not found." });
    }

    // 4. Attach user to request and continue
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: " + err.message });
  }
};

module.exports = userAuth;
