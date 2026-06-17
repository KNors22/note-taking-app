# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

* Added an Express.js server to handle HTTP requests.
* Added RESTful API routes for managing notes.
* Added CRUD functionality for notes, including creating, reading, updating, and deleting notes.
* Added database integration to store note data.
* Added data models for interacting with notes in the database.
* Added a simple front-end interface using HTML and CSS.
* Added front-end integration with the backend API to display, create, edit, and delete notes.
* Added user authentication to support personalized note collections.
* Added authorization logic to ensure users can only access and modify their own notes.
* Added server-side validation for incoming note and user data.
* Added clear error responses for invalid requests, missing data, validation failures, and unauthorized actions.
* Added project documentation with local setup instructions.
* Added API documentation covering endpoints, request formats, response formats, and developer notes.

[Full Changelog](https://github.com/knors22/note-app/compare/v0.0.2...HEAD)

## [0.0.2] 2026-06-17

### Added
- `controllers/` folder for handling business logic related to notes and user authentication.
- `models/` folder for defining data schemas and interacting with the database.
- `routes/` folder for defining API endpoints for notes and user authentication.
- `public/` folder for static assets such as HTML, CSS, and JavaScript files for the front-end interface.
- `tests/` folder for unit and integration tests
- `package.json` with project dependencies and scripts for running the application and tests.
- `app.js` as the main entry point for the Express.js server with boilerplate code

[Full Changelog](https://github.com/knors22/note-app/compare/v0.0.1...v0.0.2)

## [0.0.1] 2026-06-17

### Added
- `CHANGELOG.MD`with sections for different types of changes and versioning.
- `README.MD` with project overview, installation instructions, features, and usage guidelines.