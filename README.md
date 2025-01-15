# Social Network API

## Introduction
This API serves as a social networking platform developed with TypeScript, Express.js, and MongoDB. It enables users to post updates, engage with others' posts through reactions, and maintain a list of friends. The system is optimized for managing extensive volumes of unstructured data effectively.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)


## Technologies Used

- TypeScript
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd social-network-api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the application:
   ```sh
   npm start
   ```
2. Use a tool like Insomnia or Postman to interact with the API. The following routes are available:

   - **Users**
   
     - `GET /api/users` - Get all users
     - `POST /api/users` - Create a new user
     - `GET /api/users/:id` - Get a user by ID
     - `PUT /api/users/:id` - Update a user by ID
     - `DELETE /api/users/:id` - Delete a user by ID

   - **Thoughts**
     - `POST /api/thoughts` - Create a new thought
     - `GET /api/thoughts/:id` - Get a thought by ID
     - `PUT /api/thoughts/:id` - Update a thought by ID
     - `DELETE /api/thoughts/:id` - Delete a thought by ID

   - **Reactions**
     - `PUT /api/thoughts/:thoughtId/reactions` - Update a reaction by thought ID


   - **Friends**
      - `POST /api/users/:userId/friends/:friendId` - Add a friend
      - `DELETE /api/users/:userId/friends/:friendId` - Delete a friend


## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## Questions

For any questions, please contact me with the information below:

GitHub: https://github.com/stephanyxpal