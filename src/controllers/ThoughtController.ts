import { Schema, model, Document, Types } from 'mongoose';

interface IReaction extends Document {
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
    {
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
            getters: true,
        },
    
        toObject: {
        getters: true,
        },
  }
);

interface IThought extends Document {
    thoughtText: string;
    username: string;
    createdAt: Date;
    reactions: Types.DocumentArray<IReaction>;
    reactionCount: number;
}

const thoughtSchema : Schema<IThought> = new Schema (
    {
        thoughtText: {
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
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, 
        },
        toObject: {
            virtuals: true,
            getters: true, 
        },
    }
);

thoughtSchema.virtual('reactioCount').get(function(this: IThought){
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;