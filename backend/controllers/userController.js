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
      //   select: {
      //     id: true,
      //     username: true,
      //     email: true,
      //   },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}
