# Note-taking App

## Description
A simple note taking application built as a midterm project. This repository contains the source, installation instructions, usage examples, and project details.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/knors22/note-taking-app.git
   ```
2. Change to the project directory:
   ```bash
   cd note-taking-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a local environment file:
   ```bash
   cp .env.example .env
   ```
5. Update the values in `.env`, then start the application:
   ```bash
   npm start
   ```

## Environment Configuration
The app uses Mongoose to connect to MongoDB. In development it reads `MONGO_URI_LOCAL`; in production it reads `MONGO_URI`.

Required variables:
```env
NODE_ENV=development
PORT=3000
MONGO_URI_LOCAL=mongodb://127.0.0.1:27017/note-taking-app
MONGO_URI=mongodb+srv://APP_USER:APP_PASSWORD@cluster0.example.mongodb.net/note-taking-app?retryWrites=true&w=majority
SESSION_SECRET=replace-with-a-long-random-secret
```

For local development, keep `NODE_ENV=development` and set `MONGO_URI_LOCAL` to a local MongoDB database.

For a remote MongoDB database, set `NODE_ENV=production` in your hosting provider and set `MONGO_URI` to the connection string from MongoDB Atlas or your MongoDB host. Do not commit your real `.env` file or database password.

## Remote MongoDB Setup
1. Create or open a MongoDB Atlas project.
2. Create a database user with a strong password.
3. Add your deployment server IP address to Atlas Network Access. For local testing, add your current IP address.
4. Copy the Atlas Node.js connection string.
5. Replace the username, password, cluster hostname, and database name in `MONGO_URI`.
6. Deploy with `NODE_ENV=production` so the app uses `MONGO_URI` instead of `MONGO_URI_LOCAL`.

Example production value:
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://notes_app_user:strong-password@cluster0.abcde.mongodb.net/note-taking-app?retryWrites=true&w=majority
SESSION_SECRET=another-long-random-production-secret
```

The app connects to a MongoDB database, and Mongoose creates or uses collections based on the model names. The current models write to the default `users`, `notes`, and `collections` collections.

If you need to use an existing collection with a custom name, pass the collection name as the third argument to `mongoose.model`:
```js
const Note = mongoose.model('Note', noteSchema, 'my_existing_notes_collection');
```

## Usage
- Open the app in your browser.
- Register or log in.
- Create, edit, and delete notes.
- Use collections to organize and save your notes.

## Features

* **Node.js Project Setup**

  * Initializes a new Node.js project.
  * Organizes the project using a clear folder structure, including routes, controllers, models, and other supporting files.

* **Express.js Server**

  * Implements an Express.js server to handle HTTP requests.
  * Provides a structured backend for managing note-related operations.

* **RESTful Notes API**

  * Supports full CRUD functionality for notes.
  * Includes endpoints to create, read, update, and delete notes.
  * Uses standard HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`.

* **Database Integration**

  * Uses MongoDB to store user, note, and collection data.
  * Connects the Node.js application to local or remote MongoDB databases using environment variables.
  * Implements Mongoose data models to interact with stored notes.

* **Note Management**

  * Allows users to view existing notes.
  * Allows users to create new notes.
  * Allows users to edit existing notes.
  * Allows users to delete notes.

* **Front-End Interface**

  * Includes a simple and user-friendly interface built with HTML and CSS.
  * Displays notes from the backend.
  * Allows users to add, edit, and delete notes through the interface.

* **Backend and Frontend Integration**

  * Connects the frontend with the Express.js API.
  * Uses API requests to fetch, create, update, and delete notes dynamically.

* **User Authentication**

  * Allows multiple users to register and log in.
  * Provides personalized note collections for each user.
  * Ensures that users can only access and modify their own notes.

* **Server-Side Validation**

  * Validates incoming data before saving or updating notes.
  * Prevents invalid or incomplete requests from being processed.
  * Returns clear error messages when validation fails.

* **Error Handling**

  * Handles invalid requests, missing data, unauthorized access, and server errors.
  * Provides meaningful error responses to help users and developers understand issues.

* **Developer Documentation**

  * Includes setup instructions for running the project locally.
  * Documents available API endpoints.
  * Provides expected request and response formats.
  * Includes important details for future development and contributions.

## File structure
```
note-taking-app/
|
|-- controllers/
|   |-- authController.js
|   |-- collectionController.js
|   |-- noteController.js
|   `-- userController.js
|-- middleware/
|   |-- authMiddleware.js
|   `-- passport.js
|-- models/
|   |-- collectionModel.js
|   |-- noteModel.js
|   `-- userModel.js
|-- public/
|   |-- css/
|   `-- js/
|-- routes/
|   |-- authRoutes.js
|   |-- collectionRoutes.js
|   |-- dashboardRoutes.js
|   |-- noteRoutes.js
|   `-- userRoutes.js
|-- seeders/
|   `-- demo.js
|-- tests/
|-- views/
|   |-- auth/
|   |-- collections/
|   |-- notes/
|   |-- partials/
|   |-- user/
|   |-- dashboard.ejs
|   `-- home.ejs
|-- .env.example
|-- app.js
|-- CHANGELOG.md
|-- LICENSE
|-- package.json
`-- README.md
```

## RESTful API Endpoints
```
# PUBLIC PAGES
GET     /                 Home
GET     /register         Register form
POST    /register         Create user
GET     /login            Login form
POST    /login            Log in user

# PROTECTED PAGES
GET     /dashboard        User dashboard
GET     /notes            All notes
GET     /notes/new        Create note form
POST    /notes            Create note
GET     /notes/:id        View single note
GET     /notes/:id/edit   Edit note form
PUT     /notes/:id        Update note
DELETE  /notes/:id        Delete note

GET     /collections      All collections
POST    /collections      Create collection
GET     /collections/:id  View collection notes
GET     /collections/:id/edit Edit collection form
PUT     /collections/:id  Update collection
DELETE  /collections/:id  Delete collection

GET     /profile          User profile
PUT     /profile          Update profile
POST    /logout           Log out
```

## Authors and Acknowledgements
- Author: Andrey Gonzalez
- Instructor: Martin Lee (from Circuit Stream)

## License
This project is licensed under the MIT License. See the LICENSE file for details.
