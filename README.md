# Todo App with Task Management

A simple todo application that helps you manage tasks and shows relevant ads based on your tasks.

## Features

- Add, edit, and delete tasks
- Set task priorities and due dates
- View task history
- Relevant ads based on task content
- Responsive design

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

## Deployment

This app is configured for easy deployment on Render.com:

1. Create a free account on [Render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the deployment:
   - Name: todoapp (or your preferred name)
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Click "Create Web Service"

Your app will be automatically deployed and you'll get a URL like `https://todoapp.onrender.com`

## Environment Variables

No environment variables are required for basic functionality.

## Technologies Used

- Node.js
- Express.js
- HTML/CSS
- JavaScript
- Local Storage for data persistence 