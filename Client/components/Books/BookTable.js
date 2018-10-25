import React from 'react';
import PropTypes from 'prop-types';

const BookTable = (props) => {
    const books = props.books;

    const bookRows = books.map(book => {

        let classes = `small ${!!book.isNew ? 'table-success' : ''}`;
        
        return (
            <tr key={book.id.toString()} className={classes}>
                <td className="align-middle" style={{width: '80px'}}>
                    <div className="d-flex flex-row">
                        <a data-toggle="tooltip" data-placement="top" title="Editar Libro" className="p-2" onClick={() => props.onOpenEditBookModal(book.id)}>
                            <i className="fa fa-pencil fa-lg text-primary"></i>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Borrar Libro" className="p-2" onClick={() => props.onDeleteBook(book.id)}>
                            <i className="fa fa-trash fa-lg text-danger"></i>
                        </a>
                    </div>                
                </td>
                <td className="align-middle">{book.title}</td>
                <td className="align-middle"> {book.editorial}</td>
                <td className="align-middle">{book.releaseYear}</td>
                <td className="align-middle">{book.author}</td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th className="align-middle text-center">Título</th>
                        <th className="align-middle text-center">Editorial</th>
                        <th className="align-middle text-center">Año lanzamiento</th>
                        <th className="align-middle text-center">Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {bookRows}
                </tbody>
            </table>
        </div>
    );
};

BookTable.propTypes = {
    books: PropTypes.array,
    onDeleteBook: PropTypes.func,
    onOpenEditBookModal: PropTypes.func
};

export default BookTable;