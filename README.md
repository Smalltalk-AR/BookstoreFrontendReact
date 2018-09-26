# Bookstore Frontend README

A basic CRUD application for books and authors that uses  [ReactJS] .

## Features

* Add an author
* Edit an author
* Remove an author
* List all author
* Find author by name
* Add a book
* Edit a book
* Remove a book
* List all book
* Find book by title


## Developed With

* [ReactJS] - Javascript library for building user interfaces
* [Bootstrap v4.0.0-beta.2] - Build responsive, mobile-first projects
* [Webpack] - Javascript module bundler

---


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The following software is required to be installed on your system:

* NodeJS

  The following version of Node and Npm are required:

  * Npm 3.x

  Type the following commands in the terminal to verify your node and npm versions

  ```bash
  npm -v
  ```



### Install

Follow the following steps to get development environment running.

1. Clone 'BookstoreFrontendReact' repository from GitHub

   ```bash
   git clone https://github.com/Smalltalk-AR/BookstoreFrontendReact.git
   ```

   _or using ssh_

   ```bash
   git clone git@github.com:Smalltalk-AR/BookstoreFrontendReact.git
   ```

1. Install node modules

   ```bash
   cd BookstoreFrontendReact
   npm install
   ```

### Build

There are 2 build options:

* Build

  ```javascript
  npm run build
  ```

* Build with watch enabled

  ```javascript
  npm run build:watch
  ```

### Run ESlint

* Lint project using ESLint

  ```bash
  npm run lint
  ```

* Lint project using ESLint, and autofix

  ```bash
  npm run lint:fix
  ```


### Run React App

* Run Dev Server

  Start React usinf React dev server

  ```javascript
  npm run serve:dev
  ```


[NodeJS]: https://nodejs.org
[ReactJS]: http://reactjs.org
[Bootstrap v4.0.0-beta.2]: https://getbootstrap.com
[Webpack]: https://webpack.js.org
