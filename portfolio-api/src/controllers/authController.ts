import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = '7d';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token, user: { email: user.email, role: user.role, profile: user.profile } });
  } catch (err: any) {
    return res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const logout = async (_req: Request, res: Response) => {
  // For JWT, logout is handled client-side (token removal)
  return res.json({ message: 'Logged out' });
};

export const refresh = async (req: Request, res: Response) => {
  // Implement refresh token logic if needed
  return res.status(501).json({ message: 'Not implemented' });
};

export const getProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProfileSchema = z.object({
  name: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});

export const updateProfile = async (req: any, res: Response) => {
  try {
    const data = updateProfileSchema.parse(req.body);
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.profile = { ...user.profile, ...data };
    await user.save();
    return res.json({ user: { email: user.email, role: user.role, profile: user.profile } });
  } catch (err: any) {
    return res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
}; 