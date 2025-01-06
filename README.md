# Todos - A Next.js Todo App

This is a Todo app built with Next.js, where users can create, read, update, and delete todos. The app supports authentication via Google or email/password. It uses MongoDB for storing user and todo data, and NextAuth.js for handling authentication.

## Features

- User Authentication: Users can log in via Google or register/sign in with email and password.
- CRUD Operations: Users can create, update, read, and delete their todos.
- MongoDB Backend: MongoDB is used for storing user and todo data.
- JWT Authentication: Secure JWT authentication for session management.

## Getting Started

### Prerequisites

Before you start, ensure you have the following:

- Node.js installed (version 16.x or higher).
- A MongoDB Atlas account or a local MongoDB setup.
- A Google OAuth client setup (for Google login) or an email/password authentication provider.

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/todos.git
cd todos

npm install
# or
yarn install
# or
pnpm install
# or
bun install

```
Create a .env file in the root directory and add the following environment variables:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todos?retryWrites=true&w=majority
GOOGLE_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_AUTH_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-key
SALT_ROUNDS=10

```
Running the Development Server
Once you've configured the .env file, you can run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

```
#Open http://localhost:3000 in your browser to view the app.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

## Deployment

To deploy your Todo app, you can use [Vercel](https://vercel.com) (by the creators of Next.js). It's the easiest way to deploy a Next.js app.

1. Push your repository to GitHub (or any Git platform).
2. Connect your GitHub repository to Vercel.
3. Vercel will automatically build and deploy the app.

For more details, check out the [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
