# TaskDuty — Task Management App

TaskDuty is a full-stack task management application built to help users create, organize, update, and manage their daily tasks in one place.

The project was built as part of my IT internship journey, with a focus on building a complete application from frontend UI to backend API and database integration.

## Features

* Create new tasks
* View all tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed or pending
* Add task descriptions
* Set due dates
* Organize tasks by category
* Responsive user interface
* REST API for task management
* MongoDB database integration

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* React Router
* Lucide React
* Vite

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* REST API

### Development Tools

* Git
* GitHub
* VS Code
* Postman

## Project Structure

```text
Task-manager/
│
├── api/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── models/
│   │   │   └── tasks.ts
│   │   ├── validation/
│   │   │   └── taskValidation.ts
│   │   └── server.ts
│   │
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── TaskCard.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Cover.tsx
│   │   │   ├── EditTask.tsx
│   │   │   ├── MyTasks.tsx
│   │   │   └── NewTask.tsx
│   │   │
│   │   ├── App.tsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

To run this project locally, clone the repository:

```bash
git clone https://github.com/delight202271/Task-manager.git
```

Move into the project directory:

```bash
cd Task-manager
```

## Frontend Setup

Move into the frontend folder:

```bash
cd web
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Backend Setup

Open another terminal and move into the API folder:

```bash
cd api
```

Install the backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `api` folder:

```env
MONGO_URL=your_mongodb_connection_string
PORT=5000
```

Then start the backend server:

```bash
npm run dev
```

## Database

TaskDuty uses MongoDB to store task information.

Each task can contain information such as:

```text
Title
Description
Due Date
Category
Completed Status
```

The backend uses Mongoose to communicate with MongoDB.

## API

The backend provides REST API endpoints for managing tasks.

Typical operations include:

| Method    | Purpose        |
| --------- | -------------- |
| GET       | Retrieve tasks |
| POST      | Create a task  |
| PUT/PATCH | Update a task  |
| DELETE    | Delete a task  |

The frontend communicates with these API endpoints to create and manage tasks.

## Task Status

Tasks can have two main states:

* **Pending** — The task has not been completed.
* **Completed** — The task has been completed.

Users can change the status of a task directly from the task interface.

## Development

This project follows a separated frontend and backend structure:

```text
React Frontend
      ↓
REST API
      ↓
Express Backend
      ↓
MongoDB
```

This structure makes it easier to develop, test, and maintain each part of the application.

## Future Improvements

Some features that can be added in future versions include:

* User authentication
* User-specific task lists
* Search and filtering
* Task priority levels
* Notifications and reminders
* Dashboard statistics
* Pagination
* Dark mode
* Deployment

## Author

**Ivy**

Full-Stack Developer in training

This project represents part of my journey building real-world applications with React, TypeScript, Node.js, Express, and MongoDB.

## License

This project is created for educational and development purposes.
