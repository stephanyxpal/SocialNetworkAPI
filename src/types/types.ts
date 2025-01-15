// Interface representing a User entity
export interface User {
    id: string;
    username: string;
    email: string;
    friends: string[];
}

// Interface representing a Thought entity
export interface Thought {
    id: string;
    content: string;
    author: string;
    reactions: Reaction[];
}

// Interface representing a Reaction entity
export interface Reaction {
    id: string;
    content: string;
    author: string;
}

// Interface representing the structure of a Reaction input
export interface IReaction {
    content: string;
    author: string;
}