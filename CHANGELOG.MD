# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

* Added RESTful API routes for managing notes.
* Added front-end integration with the backend API to display, create, edit, and delete notes.
* Added clear error responses for invalid requests, missing data, validation failures, and unauthorized actions.
* Added project documentation with local setup instructions.


## [0.6.0] 2026-06-19

## Changed
- Username can now be 4 characters long at minimum instead of 6 characters.

### Added
- Passport.js for user authentication, including local strategy for username and password authentication.
- Session management using `express-session` to maintain user sessions across requests.
- Account deletion confirmation and handling to allow users to delete their accounts securely.
- Account editing validation to ensure username or email does not already exist.

### Fixed
- Local login did not persist over HTTP. `cookie.secure` is set to false during development to allow cookies to be sent over HTTP, enabling session persistence for local testing.
- Replace deprecated `new : true` in `findOneAndUpdate` with `returnDocument: 'after'` to ensure the updated document is returned after an update operation.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.5.0...v0.6.0)


## [0.5.0] 2026-06-19

### Added
- Routers for notes, collections, and users.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.4.3...v0.5.0)


## [0.4.3] 2026-06-19

### Added
- Implement dashboard and authentication routes.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.4.2...v0.4.3)


## [0.4.2] 2026-06-19

### Added
- Dev profile and functions for testing and debugging purposes during development.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.4.1...v0.4.2)


## [0.4.1] 2026-06-19

### Added
- User views and styles for profile and editing user information.

### Fixed
- Exporting models in `models/*.js` files to ensure they can be imported correctly.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.4.0...v0.4.1)


## [0.4.0] 2026-06-19

### Added
- Authentication views and styles for login and registration pages.
- Initial dashboard view for displaying user notes after login.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.3.3...v0.4.0)


## [0.3.3] 2026-06-18

### Fixed
- MongoDB connection issues that caused the application to fail when trying to access the database.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.3.2...v0.3.3)


## [0.3.2] 2026-06-18

### Fixed
- Incorrect `.js` file name imports in the `controllers/*.js` files that caused a runtime error.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.3.1...v0.3.2)


## [0.3.1] 2026-06-17

### Added
- Routers for handling registration, login and logout views.
- Initial API documentation covering endpoints, request formats, and response formats.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.3.0...v0.3.1)


## [0.3.0] 2026-06-17

### Added
- Authorization logic to ensure users can only access and modify their own notes.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.2.0...v0.3.0)


## [0.2.0] 2026-06-17

### Added
- MongoDB integration for storing note data, including connection setup and data models.
- Request handlers for notes, collections, and users in `controllers/` (CRUD operations).

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.1.0...v0.2.0)


## [0.1.0] 2026-06-17

### Added
- Express.js server to handle simple HTTP requests.
- MongoDB database models (e.g. Note, User, Collection) for interacting with notes in the database.

### Fixed
- Compare link in the changelog for version 0.0.1 and 0.0.2.

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.0.2...v0.1.0)


## [0.0.2] 2026-06-17

### Added
- `controllers/` folder for handling business logic related to notes and user authentication.
- `models/` folder for defining data schemas and interacting with the database.
- `routes/` folder for defining API endpoints for notes and user authentication.
- `public/` folder for static assets such as HTML, CSS, and JavaScript files for the front-end interface.
- `tests/` folder for unit and integration tests
- `package.json` with project dependencies and scripts for running the application and tests.
- `app.js` as the main entry point for the Express.js server with boilerplate code

[Full Changelog](https://github.com/knors22/note-taking-app/compare/v0.0.1...v0.0.2)


## [0.0.1] 2026-06-17

### Added
- `CHANGELOG.MD`with sections for different types of changes and versioning.
- `README.MD` with project overview, installation instructions, features, and usage guidelines.