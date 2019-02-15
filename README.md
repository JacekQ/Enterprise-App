# Enterprise App Skeleton

This is Angular 7 project using advanced folder structure for Enterprise Applications with many modules, authorization and authentication. 

Project uses Angular Material, SCSS, ngx-translate, ngx store, HTTP interceptors, routing, auth guards, user roles and `json-server` as backend.

Application runs in 2 languages: Polish and English and can be easily extended to other languages.

## Installation pre-requisites

This project has minimal dependencies, you only need node and npm installed on your machine. These are some tutorials to install node in different operating systems.

Make sure to install Node version of 9.11.2 at least.

## Installation Instructions

First clone or download as a Zip file using the green "Clone Or Download" button on the top right of the document. 

Then change directory to the folder where you will find a node project with a package.json (Project root directory).

On the command line run the following:

<code>npm install</code>

Change directory from Project root directory to `node` subdirectory and run again the following (backend part of the Project):

<code>npm install</code>


## Development server

1.  To start `Backend` application open new terminal window, go to Project root directory and change directory to: `node` subdirectory.

- run `npm run generate` everytime you want to generate new `database.json` data file. Script uses `fakeData.js` to make that file. It creates 2 users with the following credentials:
  - ROLE_ADMIN
    - email: 'admin@test.com',
    - password: '123456',

  - ROLE_USER
    - email: 'user@test.com',
    - password: '123456',

- run `npm start` to start backend [JSON-SERVER](https://github.com/typicode/json-server). It starts at `http://localhost:3000`

2. To start `Frontend` application go to Project root directory and: 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
