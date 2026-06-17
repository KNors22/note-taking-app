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
   cd notetaking-app
   ```
3. Install dependencies:
   ```bash
   npm installwhic
   ```
4. Start the application:
   ```bash
   npm start
   ```

## Usage
- Open the app in your browser.
- Create, edit, and delete notes.
- Use the interface to organize and save your notes.

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

  * Uses a database such as MongoDB or SQLite to store note data.
  * Connects the Node.js application to the selected database.
  * Implements data models to interact with stored notes.

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
```notetaking-app/
├── controllers/
├── models/
├── routes/
├── public/
├── tests/
├── app.js
├── package.json
├── README.md
├── CHANGELOG.md
└── LICENSE
```

## Authors and Acknowledgements
- Author: Andrey Gonzalez
- Instructor: Martin Lee (from Circuit Stream)

## License
This project is licensed under the MIT License. See the LICENSE file for details.
