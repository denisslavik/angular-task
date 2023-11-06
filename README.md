# Project Overview
This project was created using Angular CLI version 16.2.3, a robust framework for building scalable and maintainable applications.

## Getting Started
To get started with the development server, run ng serve and navigate to http://localhost:4200/. The application will automatically refresh as you modify any source files.

- To start the server, use `ng serve` and open your browser at http://localhost:4200/. The application will hot-reload upon any source file changes.
- To run the JSON server, use `json-server --watch server.json` and navigate to http://localhost:3000/users. This server is used for user login and profile updates.
- To login, use the credentials provided in the server.json file.
## Project Structure
- components: This directory contains reusable components that are commonly used throughout the application such as custom-snackbar, header, and sidenav.

- guards: This directory contains authentication guards that work with JSON data.

- pages: This directory contains all the user-facing pages of the application. It includes six pages: login, billing, home, inventory, profile, and reports. All pages, except the login page, are accessible through the sidenav. The profile page contains several form elements including Email, First Name, Last Name, Phone Number, and Website. Only authenticated users can update their profiles on this page.

- server.json: This file serves as a mock data server for authentication and profile updates.