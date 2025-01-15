import mongoose from 'mongoose';
import { User, Thought, IReaction } from '../models/models';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Create sample users
        const users = await User.insertMany([
            { username: 'john_doe', email: 'john@example.com', friends: [] },
            { username: 'jane_doe', email: 'jane@example.com', friends: [] },
            { username: 'stacy', email: 'stacy@example.com', friends: [] },
            { username: 'joe', email: 'joe@example.com', friends: [] },
        ]);

        // Create sample thoughts
        const thoughts = await Thought.insertMany([
            { content: 'This is a thought by John', author: users[0]._id, reactions: [] },
            { content: 'This is a thought by Jane', author: users[1]._id, reactions: [] },
            { content: 'This is a thought by Stacy', author: users[2]._id, reactions: [] },
            { content: 'This is a thought by Joe', author: users[3]._id, reactions: [] },
        ]);

        // Add friends
        users[0].friends.push(users[1]._id, users[2]._id);
        users[1].friends.push(users[0]._id, users[3]._id);
        users[2].friends.push(users[0]._id, users[3]._id);
        users[3].friends.push(users[1]._id, users[2]._id);
        await Promise.all(users.map(user => user.save()));

        // Add reactions to thoughts
        thoughts[0].reactions.push({
            content: 'Great thought!', author: users[1]._id
        } as IReaction);
        thoughts[1].reactions.push({
            content: 'Interesting idea!', author: users[0]._id
        } as IReaction);
        thoughts[2].reactions.push({
            content: 'Nice thought!', author: users[3]._id
        } as IReaction);
        thoughts[3].reactions.push({
            content: 'Well said!', author: users[2]._id
        } as IReaction);
        await Promise.all(thoughts.map(thought => thought.save()));

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase().catch((error) => {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
});