import { prisma } from "../lib/prisma.js";

export async function getUsers(req, res) {
  const { userId } = req.user;

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.log(err);
  }
}

export async function getUser(req, res) {
  const { userId } = req.user;

  try {
    const user = await prisma.user.findMany({
      where: {
        id: userId,
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}

export async function updateUser(req, res) {
  const { username, email } = req.body;
  const { userId } = req.user;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ message: "Username or email already taken" });
    }
    console.log(err);
  }
}
