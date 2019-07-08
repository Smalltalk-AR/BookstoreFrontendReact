'use strict'

// package references

import * as axios from 'axios'

// db options

const baseApiUrl = 'http://localhost:1710'

// add author

const addAuthor = (firstName, lastName, country) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseApiUrl}/persons`, {
        firstName: firstName,
        lastName: lastName,
        country: country
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

// find authors

const findAuthor = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseApiUrl}/persons/${id}`)
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

const findAuthorsByFirstName = firstName => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseApiUrl}/persons?firstName=${firstName}`)
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

const listAuthors = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseApiUrl}/persons`)
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

// remove author

const removeAuthor = id => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseApiUrl}/persons/${id}`)
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

// update author

const updateAuthor = author => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${baseApiUrl}/persons/${author.id}`, author)
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
  addAuthor: addAuthor,
  findAuthor: findAuthor,
  findAuthorsByFirstName: findAuthorsByFirstName,
  listAuthors: listAuthors,
  removeAuthor: removeAuthor,
  updateAuthor: updateAuthor
}
