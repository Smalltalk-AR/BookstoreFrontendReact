'use strict'

// package references

import * as axios from 'axios'

// db options

const baseApiUrl = 'http://localhost:1710'

// add book

const addBook = (title, editorial, releaseYear, author) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseApiUrl}/books`, {
        title: title,
        editorial: editorial,
        releaseYear: releaseYear,
        author: {
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
          country: author.country
        }
      })
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        console.log(error)
        reject(error.message)
      })
  })
}

// find books

const findBook = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseApiUrl}/books/${id}`)
      .then(response => {
        resolve(response.data)
        return
      })
      .catch(error => {
        reject(error.message)
        return
      })
  })
}

const findBooksByTitle = title => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseApiUrl}/books?title=${title}`)
      .then(response => {
        resolve(response.data)
        return
      })
      .catch(error => {
        reject(error.message)
        return
      })
  })
}

const listBooks = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseApiUrl}/books`)
      .then(response => {
        resolve(response.data)
        return
      })
      .catch(error => {
        reject(error.message)
        return
      })
  })
}

// remove book

const removeBook = id => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseApiUrl}/books/${id}`)
      .then(() => {
        resolve()
        return
      })
      .catch(error => {
        reject(error.message)
        return
      })
  })
}

// update book

const updateBook = book => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${baseApiUrl}/books`, { book })
      .then(() => {
        resolve()
        return
      })
      .catch(error => {
        reject(error.message)
        return
      })
  })
}

// exports

module.exports = {
  addBook: addBook,
  findBook: findBook,
  findBooksByTitle: findBooksByTitle,
  listBooks: listBooks,
  removeBook: removeBook,
  updateBook: updateBook
}
