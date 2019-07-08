import React, { Component } from 'react'
import Header from './Header'
import AuthorManager from './Authors/AuthorManager'
import BookManager from './Books/BookManager'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      title: 'Bookstore App',
      description: 'A basic example of CRUD app for books and authors'
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container mt-5">
          <AuthorManager />
        </div>
        <div className="container mt-5">
          <BookManager />
        </div>
      </div>
    )
  }
}
