# Simple Slack-like Chat Application

This is a simple chat application inspired by Slack, built using Node.js and React.js. It provides features such as direct messages, channel creation, channel messaging, channel editing, and user status updates. The application utilizes Socket.IO for real-time communication.

## Features

- **Direct Messages**: Users can send direct messages to each other privately.
- **Create Channels**: Users can create channels for group discussions.
- **Channel Messaging**: Users can send messages within channels for collaborative discussions.
- **Edit Channels**: Users with appropriate permissions can edit the details of created channels.
- **User Status**: Users can set their status to indicate their availability or current activity.

## Technologies Used

The application is built using the following technologies:

- **Node.js**: A JavaScript runtime that allows the execution of server-side code.
- **React.js**: A JavaScript library for building user interfaces.
- **Socket.IO**: A real-time communication library for enabling bidirectional communication between the client and server.
- **Express.js**: A minimal and flexible Node.js web application framework used for handling server-side logic and routing.
- **MongoDB**: A NoSQL database used to store and retrieve user and channel data.
- **Redis**: An in-memory data structure store used for caching and managing real-time data.

## Installation

Please make sure to have Redis installed and configured properly before running the application.
To run the application locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/chamara-senarath/private-chat-app.git
```

2. Install the dependencies for the server:

```
cd server
npm install
```

3. Rename the `.env.example` file to `.env` and provide the necessary configuration, such as MongoDB connection details.

4. Start the server:

```
npm start
```

5. Install the dependencies for the client:

```
cd ../client
npm install
```

6. Start the client:

```
npm start
```

7. Open a web browser and navigate to `http://localhost:3000` to access the application.


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request to the [GitHub repository](https://github.com/chamara-senarath/private-chat-app). Be sure to follow the existing code style and guidelines.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify the code as per the license terms.
