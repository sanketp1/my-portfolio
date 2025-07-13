import { Request, Response } from 'express';
import { Message } from '../../models';
import { z } from 'zod';
import { sendMail } from '../../utils/mailer';

const replySchema = z.object({
  reply: z.string().min(1),
});

export const getMessages = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const read = req.query.read;
    const filter: any = {};
    if (read !== undefined) {
      filter.isRead = read === 'true';
    }
    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Message.countDocuments(filter);
    res.json({ messages, total, page, limit });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const replyMessage = async (req: Request, res: Response) => {
  try {
    const data = replySchema.parse(req.body);
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isReplied: true, reply: data.reply, repliedAt: new Date() },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: 'Message not found' });
    // Send email reply
    await sendMail(message.email, `Re: ${message.subject}`, data.reply);
    res.json(message);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 