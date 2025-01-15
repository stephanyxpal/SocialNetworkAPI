import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
    friendCount: number;
}

const userSchema = new Schema<IUser> (
    {
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
            match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought', 
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref:'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

userSchema.virtual('friendcount').length(function(this:IUser){
    return this.friends.length;
});

const User = model<IUser>('User', userSchema);

export default User;