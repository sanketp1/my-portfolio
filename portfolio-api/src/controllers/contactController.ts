import { Request, Response } from 'express';
import { Message } from '../models';
import { z } from 'zod';

const messageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const data = messageSchema.parse(req.body);
    const msg = await Message.create({ ...data, isRead: false, isReplied: false });
    res.status(201).json({ message: 'Message sent', data: msg });
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
}; 