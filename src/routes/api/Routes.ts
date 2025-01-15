import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { Thought } from '../models/Thought';

const router = Router();

/** USER ROUTES **/

// GET all users
router.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

// GET single user by _id with populated thoughts and friends
router.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
});

// POST a new user
router.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});

// PUT to update a user by _id
router.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
});

// DELETE user by _id and remove their thoughts
router.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.status(200).json({ message: 'User and associated thoughts deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

// POST to add a friend
router.post('/api/users/:userId/friends/:friendId', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error adding friend', error: err });
  }
});

// DELETE to remove a friend
router.delete('/api/users/:userId/friends/:friendId', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err });
  }
});

/** THOUGHT ROUTES **/

// GET all thoughts
router.get('/api/thoughts', async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching thoughts', error: err });
  }
});

// GET single thought by _id
router.get('/api/thoughts/:id', async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching thought', error: err });
  }
});

// POST new thought and add to user's thoughts
router.post('/api/thoughts', async (req: Request, res: Response) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const newThought = await Thought.create({ thoughtText, username });
    await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json({ message: 'Error creating thought', error: err });
  }
});

// DELETE a thought by _id
router.delete('/api/thoughts/:id', async (req: Request, res: Response) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) return res.status(404).json({ message: 'Thought not found' });
    res.status(200).json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting thought', error: err });
  }
});

export default router;
