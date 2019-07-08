import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

class EditBookForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.book.id,
      title: props.book.title,
      editorial: props.book.editorial,
      releaseYear: props.book.releaseYear,
      author: props.book.author,
      validationErrors: []
    }

    this.onTitleChange = this.onTitleChange.bind(this)
    this.onEditorialChange = this.onEditorialChange.bind(this)
    this.onReleaseYearChange = this.onReleaseYearChange.bind(this)
    this.onAuthorChange = this.onAuthorChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onTitleChange(event) {
    const title = event.target.value.trim()

    this.validateTitle(title)

    this.setState({ title: title })
  }

  onEditorialChange(event) {
    const editorial = event.target.value.trim()

    this.validateEditorial(editorial)

    this.setState({ editorial: editorial })
  }

  onReleaseYearChange(event) {
    const releaseYear = event.target.value.trim()

    if (this.validateReleaseYear(releaseYear)) {
      this.setState({ releaseYear: releaseYear })
    }
  }

  onAuthorChange(event) {
    const author = event.target.value.trim()

    this.validateAuthor(author)

    this.setState({ author: author })
  }

  onSave(event) {
    event.preventDefault()

    if (
      this.state.validationErrors &&
      this.state.validationErrors.length === 0
    ) {
      const { title, editorial, releaseYear, author } = this.state

      if (
        this.validateTitle(title) &&
        this.validateEditorial(editorial) &&
        this.validateReleaseYear(releaseYear) &&
        this.validateAuthor(author)
      ) {
        this.props.onSaveBook({
          id: this.state.id,
          title: this.state.title,
          editorial: this.state.editorial,
          releaseYear: this.state.releaseYear,
          author: this.state.author
        })
      }
    }
  }

  validateTitle(title) {
    const message = 'Title is required'

    if (title === '') {
      this.addValidationError(message)
      return false
    } else {
      this.removeValidationError(message)
      return true
    }
  }

  validateEditorial(editorial) {
    const message = 'Editorial is required'

    if (editorial === '') {
      this.addValidationError(message)
      return false
    } else {
      this.removeValidationError(message)
      return true
    }
  }

  validateReleaseYear(releaseYear) {
    const message = 'Release year is required'

    if (releaseYear === '') {
      this.addValidationError(message)
      return false
    } else {
      this.removeValidationError(message)
      return true
    }
  }

  validateAuthor(author) {
    const message = 'Author is required'

    if (author === undefined) {
      this.addValidationError(message)
      return false
    } else {
      this.removeValidationError(message)
      return true
    }
  }

  addValidationError(message) {
    this.setState(previousState => {
      const validationErrors = [...previousState.validationErrors]
      validationErrors.push({ message })
      return {
        validationErrors: validationErrors
      }
    })
  }

  removeValidationError(message) {
    this.setState(previousState => {
      const validationErrors = previousState.validationErrors.filter(
        error => error.message !== message
      )

      return {
        validationErrors: validationErrors
      }
    })
  }

  render() {
    const validationErrorSummary = this.state.validationErrors.map(error => (
      <div
        key={uuidv1()}
        className="alert alert-danger alert-dismissible fade show"
      >
        {error.message}
        <button type="button" className="close" data-dismiss="alert">
          <span>&times;</span>
        </button>
      </div>
    ))

    return (
      <div className="card card-body">
        <div className="mb-2">
          <span className="h4 my-auto">
            <i className="fa fa-file-text-o fa-lg" /> Editar Libro
          </span>
          <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
            <i className="fa fa-remove mr-2 fa-2x text-danger" />
          </a>
        </div>
        {validationErrorSummary}
        <form onSubmit={this.onSave} className="mt-2">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              className="form-control"
              name="title"
              autoFocus
              onChange={this.onTitleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editorial">Editorial</label>
            <input
              type="text"
              className="form-control"
              name="editorial"
              autoFocus
              onChange={this.onEditorialChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="releaseYear">Año de lanzamiento</label>
            <input
              type="text"
              className="form-control"
              name="releaseYear"
              onChange={this.onReleaseYearChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Autor</label>
            <select
              className="form-control"
              name="author"
              onChange={this.onAuthorChange}
            >
              {this.createSelectAuthors()}
            </select>
          </div>
          <div className="form-group row">
            <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
              <button type="submit" className="btn btn-success btn-block">
                <i className="fa fa-save mr-2" />Save
              </button>
            </div>
            <div className="col-sm-4 col-md-3 col-xl-2">
              <button
                className="btn btn-danger btn-block mt-2 mt-sm-0"
                onClick={this.props.onCloseModal}
                type="button"
              >
                <i className="fa fa-remove mr-2" />Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

EditBookForm.propTypes = {
  book: PropTypes.object,
  onCloseModal: PropTypes.func,
  onSaveBook: PropTypes.func,
  authors: PropTypes.array
}

export default EditBookForm
