# theHub

## Overview
theHub is an online platform where hobbyists and collectors come together to share projects, learn new skills, and connect with like-minded people. This community-driven space enables enthusiasts to showcase their work, exchange ideas, and grow their skills through meaningful interactions.

## Features
- User authentication with email/password and Google OAuth
- Profile management with customizable skills and interests
- Project sharing and showcasing
- Community forums organized by hobby/interest
- Skill development tracking and progression system
- Reputation points (RP) and community currency ($HUBS)
- Multi-process clustering for improved performance
- Comprehensive error handling middleware
- RESTful API design with clear documentation

## Tech Stack
- **Frontend**: React, styled-components
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Google OAuth 2.0
- **API Documentation**: JSDoc
- **Testing**: Jest, Supertest
- **Deployment**: Docker, AWS

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (v4.4+)
- npm or yarn

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/xisvar/theHub.git
   cd theHub
   ```

2. Install dependencies
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables
   - Copy the example environment file
   ```bash
   cd ../server
   cp config/.env.example.local config/.env.development.locals
   ```
   - Edit the file with your own settings including MongoDB URI and Google OAuth credentials

4. Start the development servers
   ```bash
   # Start backend (from server directory)
   npm run dev
   
   # Start frontend in a new terminal (from client directory)
   cd ../client
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure
```
theHub/
├── client/               # Frontend React application
├── server/               # Backend Express API
│   ├── config/           # Configuration files and environment variables
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── cluster.js        # Application clustering for performance
│   └── server.js         # Express application setup
└── README.md             # Project documentation
```

## API Documentation
API documentation is automatically generated using JSDoc. To generate documentation:

```bash
cd server
npm run docs
```

This will create documentation in HTML format in the out directory and a PDF version at `server/utils/documentation.pdf`.

## Testing
```bash
cd server
npm test
```

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Thanks to all contributors who have helped shape theHub
- Special thanks to the open source community for the amazing tools that make this project possible

