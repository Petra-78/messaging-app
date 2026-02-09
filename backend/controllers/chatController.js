import { prisma } from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

export const getMessages = async (req, res) => {
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
              in: [userId, Number(receiverId)],
            },
          },
        },
      },
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          chatUser: {
            create: [{ userId }, { userId: Number(receiverId) }],
          },
        },
      });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "chat_images" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          },
        );
        stream.end(req.file.buffer);
      });
    }

    const message = await prisma.message.create({
      data: {
        content: content || "",
        senderId: userId,
        chatId: chat.id,
        imageUrl,
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
