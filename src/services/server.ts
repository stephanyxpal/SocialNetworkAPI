// Import necessary modules and models
import { ObjectId } from 'mongoose';
import { User, Thought } from '../models/models';

// Function to add a friend to a user's friend list
export const addFriend = async (userId: string, friendId: string) => {
    const user = await User.findById(userId);
    if (user && !user.friends.includes(friendId as unknown as ObjectId)) {
        user.friends.push(friendId as unknown as ObjectId);
        await user.save();
    }
};

// Function to remove a friend from a user's friend list
export const removeFriend = async (userId: string, friendId: string) => {
    const user = await User.findById(userId);
    if (user) {
        user.friends = user.friends.filter((friend: ObjectId) => friend.toString() !== friendId);
        await user.save();
    }
};

// Function to add a reaction to a thought
export const reactToThought = async (thoughtId: string, reactionContent: string, authorId: string) => {
    const thought = await Thought.findById(thoughtId);
    if (thought) {
        const reaction = new (Thought.schema.path('reactions').cast as any)({
            content: reactionContent,
            author: authorId as unknown as ObjectId
        });
        thought.reactions.push(reaction);
        await thought.save();
    }
};