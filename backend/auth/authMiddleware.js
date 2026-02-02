import jwt from "jsonwebtoken";

export function verifyClient(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  try {
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}