# VarausApp

## Introduction

VarausApp is a reservation website that allows theFirma students to reserve computers and meeting spaces at theFirma premises. The site gives users a quick visual image of the availability of the computers and meeting spaces.

## Technologies Used

### Frontend

- React
- Create React App
- React Router
- [Chakra UI](https://chakra-ui.com/) component library

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB database

## Getting Started

- Make sure you have Node.js and MongoDB Community Edition (including MongoDB Compass) installed on your local machine
- Clone the repository
- Open Git Bash on the root
- Run <code>git config blame.ignoreRevsFile .git-blame-ignore-revs</code> command to always ignore a formatting commit when using the <code>git blame</code> command

## Running with Docker

1. Make sure you have Docker and Docker Compose installed.
2. From the project root, run: docker-compose up --build

This will build the frontend, backend, and MongoDB containers, seed the database, and start the app.

3. Access the app at:

Frontend: http://localhost:3000
Backend API: http://localhost:3001/api

4. To stop the containers, run: docker-compose down

### Backend

1. Open Command Prompt (keep Git Bash open)
2. Tell MongoDB where to store the local data by running the following commands:

- <code>cd C:\\</code>
- <code>md "\data\db"</code>
- <code>"C:\Program Files\MongoDB\Server\\{version number}\bin\mongod.exe" --dbpath="c:\data\db"</code> (replace {version number} with the MongoDB version number})

3. Close Command Prompt
4. Back on Git Bash, run <code>cd backend</code>
5. Run <code>npm install</code>
6. Run <code>npm run seed</code> to populate the database with initial data (only if starting the application for the first time with your local computer)
7. Run <code>npm start</code>

You know it works if the terminal shows "Server running on port {port number}" and "Connected to mongodb". The server refreshes automatically when you save a file on the backend.

### Frontend

1. Continuing from the backend part, run <code>cd ../frontend</code>
2. Run <code>npm install</code>
3. Run <code>npm start</code>

The website refreshes automatically when you save a file on the frontend.

---

Install [Prettier](https://prettier.io/) extension to your editor and set it to format on save. Automatically formatting code helps keep the code consistent and clean. Install also [ESLint](https://eslint.org/) extension to make spotting mistakes easier.

## Architecture

### Backend

The backend is built using Express and Mongoose. It consists of three main layers: **routes, controllers and services**. A route file defines the routes of a specific feature. It imports controllers from a related controller file. The controller functions handle the incoming HTTP requests and outgoing responses. Importantly, they don't handle the business logic, e.g. making database calls. That's left for services. A service function receives some parameters, does something, and returns the result or throws an error. It doesn't receive the request object. That way a service doesn't need to know anything about the request, keeping it separated. This is useful because then the services are not coupled to Express and can be used, for example, in a cron job.

The backend is organized into different modules, each containing a feature and its possible sub-modules. Example:

api/modules/computers/

- reservations/
- computer.js (Mongoose schema)
- computers.controller.js
- computers.routes.js
- computers.service.js

##### Request flow

###### Example 1 - successful request:

1. A client sends a request
2. An authentication [middleware](https://expressjs.com/en/guide/using-middleware.html) checks that the user is authenticated (if necessary) and has the required privileges for the route
3. A controller handles the incoming request
4. It delegates the work to a service
5. The service succesfully does it's job
6. It returns the result
7. The controller sends a response with the appropriate success status code to the client

###### Example 2 - unsuccessful request:

1. A client sends a request
2. Authentication check...
3. A controller handles the incoming request
4. It delegates the work to a service
5. The service cannot do its job, for example, because a resource doesn't exist
6. It throws an error\*
7. The controller catches the error and forwards it to an error handler middleware
8. The error handler middleware sends a response with the appropriate error status code\*\* to the client

\*api/utils/errors.js contains custom errors. More can be added as needed.
\*\*The custom errors include a status code.

### Frontend

The frontend is built using React. It uses React Router for routing and Chakra UI for building components. Chakra UI includes various accessible components that can be used as building blocks. They are themeable and allow writing styles as props, so CSS classes shouldn't be needed.

The most important folders, located in the src folder, are

- **components**
  - contains React components that don't belong to any one specific page
- **contexts**
  - contains global React contexts
- **pages**
  - Contains a folder per each page which in turn contain the components used in that page. The page component is on the main level, the sub-components are in a components subfolder.
- **services**
  - Contains all API calls. They should all be kept here so they are not tied to any component. The calls are made using Axios.
- **theme**
  - contains Chakra UI theming.
