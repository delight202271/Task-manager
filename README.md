# TaskDuty — Task Management App

TaskDuty is a full-stack task management application built to help users create, organize, update, and manage their daily tasks in one place.

The project was built as part of my IT internship journey, with a focus on building a complete application from frontend UI to backend API, database integration, authentication, authorization, and user-specific data management.

## Features

* User registration and login
* User authentication with JWT
* Protected API routes
* Authorization for authenticated users
* User-scoped task data
* Create new tasks
* View personal tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed or pending
* Add task descriptions
* Set due dates
* Organize tasks by category
* Responsive user interface
* REST API for task management
* MongoDB database integration
* Input validation using Zod

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
* JSON Web Token (JWT)
* Zod
* bcrypt

### Development Tools

* Git
* GitHub
* VS Code
* Postman

## Authentication & Authorization

TaskDuty includes user authentication and authorization to protect user data and API resources.

Users can create an account and log in using their email and password. Passwords are securely hashed before being stored in the database.

After successful authentication, the server issues a JWT that is used to authenticate protected requests.

The backend uses authentication middleware to:

* Verify the user's JWT
* Identify the authenticated user
* Protect private API routes
* Prevent unauthenticated access to user resources

Authorization is used to ensure that authenticated users can only access and manage resources that belong to them.

## User-Scoped Data

TaskDuty uses user-scoped data to keep each user's tasks separate.

When a user creates a task, the task is associated with that user's account. When tasks are retrieved, updated, or deleted, the backend checks the authenticated user's identity before performing the operation.

This means:

```text
User A → Can access User A's tasks

User B → Can access User B's tasks

User A ✕ Cannot access User B's tasks
```

This provides an additional layer of security and prevents users from accessing or modifying another user's tasks.

## Project Structure

```text
Task-manager/

│
├── api/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   │
│   │   ├── models/
│   │   │   ├── tasks.ts
│   │   │   └── user.ts
│   │   │
│   │   ├── middleware/
│   │   │   └── authmiddleware.ts
│   │   │
│   │   ├── validation/
│   │   │   ├── taskValidation.ts
│   │   │   └── authvalidation.ts
│   │   │
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
JWT_SECRET=your_jwt_secret
PORT=5000
```

Then start the backend server:

```bash
npm run dev
```

## Database

TaskDuty uses MongoDB to store user and task information.

### User Data

Users can have information such as:

```text
Name
Email
Password
```

Passwords are hashed before being stored in the database.

### Task Data

Each task can contain information such as:

```text
Title
Description
Due Date
Category
Completed Status
User ID
```

The `User ID` associates each task with its owner and allows the backend to implement user-scoped data.

The backend uses Mongoose to communicate with MongoDB.

## API

The backend provides REST API endpoints for authentication and task management.

### Authentication

| Method | Purpose             |
| ------ | ------------------- |
| POST   | Register a new user |
| POST   | Login a user        |

### Task Operations

| Method    | Purpose                                 |
| --------- | --------------------------------------- |
| GET       | Retrieve the authenticated user's tasks |
| POST      | Create a task                           |
| PUT/PATCH | Update a task                           |
| DELETE    | Delete a task                           |

Protected task routes require a valid JWT authentication token.

## Task Status

Tasks can have two main states:

* **Pending** — The task has not been completed.
* **Completed** — The task has been completed.

Users can change the status of a task directly from the task interface.

## Data Validation

TaskDuty uses Zod to validate incoming data before it is processed by the backend.

Validation is applied to areas such as:

* User registration
* User login
* Task creation
* Task updates

This helps prevent invalid data from being stored in the database and provides clearer error responses when user input does not meet the required format.

## Security

The backend includes several security measures to protect user accounts and data:

* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* Authorization checks
* User-scoped database queries
* Input validation with Zod
* Environment variables for sensitive configuration

## Development

This project follows a separated frontend and backend structure:

```text
React Frontend
      ↓
REST API
      ↓
Authentication & Authorization
      ↓
Express Backend
      ↓
MongoDB
```

The frontend communicates with the backend through REST API endpoints.

Authentication protects private resources, while authorization and user-scoped queries ensure that users can only manage their own tasks.

This structure makes the application easier to develop, test, maintain, and extend.

## Future Improvements

Some features that can be added in future versions include:

* Search and filtering
* Task priority levels
* Notifications and reminders
* Dashboard statistics
* Pagination
* Dark mode
* Deployment
* Email verification
* Password reset
* Refresh token implementation

## Author

**Ivy**

Full-Stack Developer in training

This project represents part of my journey building real-world applications with React, TypeScript, Node.js, Express, and MongoDB.

## License

This project is created for educational and development purposes.
