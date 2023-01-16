# Clever to-do tassker

Welcome to our Todo app! This app is designed to help you keep track of tasks and manage your to-do list.

## Usage

Once you open the app, you will see a login form. There is basic validation for an email and password (both must be at least 6 characters long). If you wish to create a new account, follow the link at the bottom of the form to the registration page.

Once logged in, you will be taken to the main screen where you can add, edit, and mark tasks as complete. In the header component, you will see a logo and a logout button.

There is a calendar located under the header. The current date is selected by default and is highlighted with an orange border. You can scroll through all the days of the current month until you reach the next one. Once you reach the next month, you will see its days and be able to add tasks to that month, and so on. The scrolling is infinite.

The days that contain tasks have a dot or two, depending on the tasks' status. If the tasks are completed (marked), the dot is orange, and if the tasks are uncompleted (not marked), the dot is black.

By navigating the calendar, you can select a day and see its tasks listed below. Each task has a checkbox to the left and two buttons (Edit and Delete) to the right. By clicking the Edit button, you will be navigated to another page where you can edit the selected task, change its status, and add a description.

There is a large Add button at the bottom of the page. By clicking the Add button, you will be able to add a task to the selected day in the calendar.

All data is available during the session, even if the user reloads the page.

## Deploy

[https://clever-todo-list-tassker.netlify.app](https://clever-todo-list-tassker.netlify.app)

## Task

## Technologies used in the project

![ReactJS](https://img.shields.io/badge/-ReactJS-0D1117?style=for-the-badge&logo=React)
![Redux](https://img.shields.io/badge/-Redux-0D1117?style=for-the-badge&logo=Redux)
![Webpack](https://img.shields.io/badge/-Webpack-0D1117?style=for-the-badge&logo=Webpack)
![Babel](https://img.shields.io/badge/-Babel-0D1117?style=for-the-badge&logo=Babel)
![Sass](https://img.shields.io/badge/-Sass-0D1117?style=for-the-badge&logo=Sass)
![Eslint](https://img.shields.io/badge/-Eslint-0D1117?style=for-the-badge&logo=Eslint)
![Husky](https://img.shields.io/badge/-Husky-0D1117?style=for-the-badge&logo=Husky)

There were also used ["react-redux-firebase"], ["redux-persist"]

## Getting Started

Clone the repository to your local machine using `git clone https://github.com/kristykov/Innowise-Lab-Internship-Level-1-Clever-to-do-list.git`

Install the necessary dependencies using `npm install`

Run the app using `npm start`

Once the app is runningpen [http://localhost:8080](http://localhost:8080) with your browser to see the result.

After that you can create an account or log in with an existing one.

For testing use the credentials below:

```
Test user: test@mail.com
User password: 111111
```

## Database snapshot

The Todo App uses Firebase as the database to store all tasks. The Firebase Realtime Database is a cloud-hosted NoSQL database that allows data to be stored and retrieved in real-time. This means that any changes made to the database are immediately reflected in the app, providing a seamless user experience.

### Data Structure

The database is structured in a hierarchical format, with the top-level being the `users` node. Under the `users` node, each user is represented by their unique user ID. Under each user ID, there is a `todos` node that contains all the tasks for that user. Each task is represented by a unique task ID and contains the following properties:
`completed`: A boolean indicating whether the task has been completed or not
`date`: The date the task is due
`description`: A brief description of the task
`title`: The title of the task
`todoID`: A unique task ID

### Authentication

Authentication is handled by Firebase Authentication, which allows users to sign in with their email and password. Once a user is logged in, their unique user ID is used to associate their tasks with their account in the database.

### CRUD Operations

The app uses Firebase's JavaScript SDK to perform CRUD (Create, Read, Update, Delete) operations on the database. When a user adds a new task, the app creates a new task object in the database under the `todos` node for the current user. When a user completes a task, the app updates the `completed` property of the corresponding task object in the database. When a user edits a task, the app updates the relevant properties of the task object in the database. And when a user deletes a task, the app removes the corresponding task object from the database.

## Folder Structure

The Todo App's codebase is organized into the following main folders:
`src`: The root folder that contains all the source code for the app
`src/assets`: This folder contains all the static assets such as images, icons, and fonts that are used in the app.
`src/components`: This folder contains all the reusable components that make up the UI of the app.
`src/navigation`: This folder contains all the navigation logic for the app, including routing and navigation between pages.
`src/pages`: This folder contains all the individual pages that make up the app, such as the login page, the main page, and the registration page.
`src/store`: This folder contains all the logic for managing the app's state, including actions and reducers for the tasks and user data.
`src/App.jsx`: The root component for the app that renders the different pages and components based on the current route.
`src/firebase-config.js`: This file contains the configuration settings for connecting to the Firebase database.
`src/index.css`: The main CSS file for the app that sets the default styles for the app.
`src/index.html`: The main HTML file that loads the app.
`src/index.jsx`: The entry point for the app that sets up the React context and renders the root component.
