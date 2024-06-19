# JobStack

JobStack is a web application built to help users track their job applications easily. It provides a user-friendly interface for managing applications, integrating authentication and authorization for secure access.

<img width="1470" alt="Screenshot 2024-06-17 at 1 59 10 AM" src="https://github.com/rishabhsingh2903/JobStack_backend/assets/47890782/75c06b04-2fc9-4808-9462-46fe12c51911">
<img width="1470" alt="Screenshot 2024-06-17 at 1 58 28 AM" src="https://github.com/rishabhsingh2903/JobStack_backend/assets/47890782/b1c47a2f-eb88-4c82-87c3-c7932cfac31a">
<img width="1470" alt="Screenshot 2024-06-17 at 1 57 21 AM" src="https://github.com/rishabhsingh2903/JobStack_backend/assets/47890782/329db08c-7d28-4c60-b31e-8e10f8bb8008">

## Features

- Track job applications with detailed information such as job title, company, application status, and more.
- Secure user authentication and authorization using JSON Web Tokens (JWT).
- RESTful API endpoints for efficient data communication between the client-side and server-side.
- Responsive UI design with Tailwind CSS for enhanced user experience across devices.
- Docker integration for simplified deployment and environment consistency.

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- JSON Web Tokens (JWT)
- Docker
- Tailwind CSS

## Installation

To run the JobStack application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your_username/JobStack.git`
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Start the server: `npm start`

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```plaintext
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

