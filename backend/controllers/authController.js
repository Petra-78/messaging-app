import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function postLogin(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user.id, },
    process.env.JWT_SECRET,
    {
      expiresIn: "7days",
    }
  );

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
}


async function postSignup(req, res) {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const username = req.body.username;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const name = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (name) {
    return res.status(400).json({ message: "username is taken" });
  }

  if (user) {
    return res.status(400).json({ message: "email already in use" });
  }

  await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });

  return res.json({ message: "User created successfully" });
}

export { postLogin, postSignup };
