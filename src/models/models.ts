import mongoose, { Schema, Document } from 'mongoose';

// Interface representing a User document in MongoDB
export interface IUser extends Document {
    username: string;
    email: string;
    friends: mongoose.Schema.Types.ObjectId[];
}

// Schema definition for User collection
const UserSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

// Creating a Mongoose model for User
export const User = mongoose.model<IUser>('User', UserSchema);

// Interface representing a Reaction subdocument in MongoDB
export interface IReaction extends Document {
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}

// Schema definition for Reaction subdocument
const ReactionSchema: Schema<IReaction> = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Interface representing a Thought document in MongoDB
export interface IThought extends Document {
    content: string;
    author: mongoose.Schema.Types.ObjectId;
    reactions: IReaction[];
}

// Schema definition for Thought collection
const ThoughtSchema: Schema<IThought> = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reactions: [ReactionSchema],
});

// Creating a Mongoose model for Thought
export const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);
export const Reaction = mongoose.model<IReaction>('Reaction', ReactionSchema);