import React from 'react'
import PropTypes from 'prop-types'

const AuthorTable = props => {
  const authors = props.authors

  const authorRows = authors.map(author => {
    let classes = `small ${!!author.isNew ? 'table-success' : ''}`

    return (
      <tr key={author.id.toString()} className={classes}>
        <td className="align-middle" style={{ width: '80px' }}>
          <div className="d-flex flex-row">
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Editar Autor"
              className="p-2"
              onClick={() => props.onOpenEditAuthorModal(author)}
            >
              <i className="fa fa-pencil fa-lg text-primary" />
            </a>
            <a
              data-toggle="tooltip"
              data-placement="top"
              title="Borrar Autor"
              className="p-2"
              onClick={() => props.onDeleteAuthor(author.id)}
            >
              <i className="fa fa-trash fa-lg text-danger" />
            </a>
          </div>
        </td>
        <td className="align-middle">{author.firstName}</td>
        <td className="align-middle">{author.lastName}</td>
        <td className="align-middle">{author.country}</td>
      </tr>
    )
  })

  return (
    <div>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th />
            <th className="align-middle text-center">Nombre</th>
            <th className="align-middle text-center">Apellido</th>
            <th className="align-middle text-center">Pais</th>
          </tr>
        </thead>
        <tbody>{authorRows}</tbody>
      </table>
    </div>
  )
}

AuthorTable.propTypes = {
  authors: PropTypes.array,
  onDeleteAuthor: PropTypes.func,
  onOpenEditAuthorModal: PropTypes.func
}

export default AuthorTable
