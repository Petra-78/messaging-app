import { prisma } from "../lib/prisma.js";

export const getMessages = async (req, res) => {
  debugger;
  const { userId } = req.user;
  const otherUserId = Number(req.params.otherUserId);

  try {
    const chat = await prisma.chat.findFirst({
      where: {
        chatUser: {
          every: {
            userId: {
              in: [userId, otherUserId],
            },
          },
        },
      },
    });

    if (!chat) {
      return res.json([]);
    }

    const messages = await prisma.message.findMany({
      where: {
        chatId: chat.id,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export async function postMessage(req, res) {
  const { userId } = req.user;
  const { receiverId, content } = req.body;
  debugger;
  try {
    let chat = await prisma.chat.findFirst({
      where: {
        chatUser: {
          every: {
            userId: {
              in: [userId, receiverId],
            },
          },
        },
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          chatUser: {
            create: [{ userId: userId }, { userId: receiverId }],
          },
        },
      });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: userId,
        chatId: chat.id,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
}
