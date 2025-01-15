import { Schema, Types } from 'mongoose';

export interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const ReactionSchema: Schema<IReaction>  = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt: Date) => createdAt.toLocaleString(),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        toObject: {
            getters: true,
        },
        id: false,
    }
);

export default ReactionSchema;