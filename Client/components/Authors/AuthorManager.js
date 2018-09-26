import React, { Component } from 'react';
import Modal from 'react-modal';
import AddAuthorForm from './AddAuthorForm';
import EditAuthorForm from './EditAuthorForm';
import AuthorTable from './AuthorTable';
import AuthorControlPanel from './AuthorControlPanel';
const AuthorService = require('../../services/author-service');


class AuthorManager extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            authors: [],
            selectedAuthor: null,
            isAddAuthorModalOpen: false,
            isEditAuthorModalOpen: false
        };

        this.handleOnAddAuthor = this.handleOnAddAuthor.bind(this);
        this.handleOnEditAuthor = this.handleOnEditAuthor.bind(this);
        this.handleOnDeleteAuthor = this.handleOnDeleteAuthor.bind(this);
        this.handleOnFindAuthors = this.handleOnFindAuthors.bind(this);
        
        this.handleOpenAddAuthorModal = this.handleOpenAddAuthorModal.bind(this);
        this.handleOnCloseAddAuthorModal = this.handleOnCloseAddAuthorModal.bind(this);

        this.handleOpenEditAuthorModal = this.handleOpenEditAuthorModal.bind(this);
        this.handleOnCloseEditAuthorModal = this.handleOnCloseEditAuthorModal.bind(this);
    }

    componentDidMount() {
        this.listAuthors();
    }


    listAuthors() {
        AuthorService
            .listAuthors()
            .then(authors => {
                this.setState({authors});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }

    handleOnDeleteAuthor(authorId) {

        if (authorId < 1) {
            throw Error('Cannot remove author. Invalid author id specified');
        }
        
        const confirmation = confirm('Are you sure you wish to remove author?');

        if (confirmation) {
            AuthorService
                .removeAuthor(authorId)
                .then(() => {
                    AuthorService
                        .listAuthors()
                        .then(authors => {
                            this.setState({authors});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            return;
                        });
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
        }
    }


    handleOnFindAuthors(firstName) {
        
        if (!firstName || firstName === '') {
            this.listAuthors();
            return;
        }
        
        AuthorService
            .findAuthorsByFirstName(firstName)
            .then(authors => {
                if (!authors) {
                    authors = [];
                }
                this.setState({authors});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnAddAuthor(author) {

        this.setState({ isAddAuthorModalOpen: false });

        const { firstName, lastName, country } = author;

        if (!firstName || firstName.length === 0) {
            throw Error('Nombre es requerido');
        }

        if (!lastName || lastName.length === 0) {
            throw Error('Apellido es requerido');
        }

        if (!country || country.length === 0) {
            throw Error('Pais es requerido');
        }

        AuthorService
            .addAuthor(firstName, lastName, country)
            .then(newAuthor => {             
                AuthorService
                    .listAuthors()
                    .then(authors => {
                        authors.forEach(n => n.id === newAuthor.id ? n.isNew = 'true' : n.isNew = undefined);                
                        this.setState({authors});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleOnCloseAddAuthorModal() {
        this.setState({isAddAuthorModalOpen: false});
    }


    handleOpenAddAuthorModal() {
        this.setState({isAddAuthorModalOpen: true});
    }


    handleOnCloseEditAuthorModal() {
        this.setState({isEditAuthorModalOpen: false});
    }


    handleOpenEditAuthorModal(authorId) {

        if (!authorId || authorId < 1) {
            throw Error('Cannot edit author. Invalid author id specified.');
        }

        AuthorService
            .findAuthor(authorId)
            .then(author => {
                this.setState({selectedAuthor: author});
                this.setState({isEditAuthorModalOpen: true});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnEditAuthor(author) {
        this.setState({ isEditAuthorModalOpen: false });
        
        const { firstName, lastName, country } = author;
        
        if (!firstName || firstName.length === 0) {
            throw Error('Nombre es requerido');
        }
        
        if (!lastName || lastName.length === 0) {
            throw Error('Apellido es requerido');
        }
        
        if (!country || country.length === 0) {
            throw Error('Pais es requerido');
        }

        AuthorService
            .updateAuthor(author)
            .then(() => {                
                AuthorService
                    .listAuthors()
                    .then(authors => {
                        authors.forEach(n => n.id === author.id ? n.isNew = 'true' : n.isNew = undefined);                
                        this.setState({authors});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>                                
                <Modal isOpen={this.state.isAddAuthorModalOpen} onRequestClose={this.handleOnCloseAddAuthorModal}>
                    <AddAuthorForm onSaveAuthor={this.handleOnAddAuthor} onCloseModal={this.handleOnCloseAddAuthorModal} />
                </Modal>
                <Modal isOpen={this.state.isEditAuthorModalOpen} onRequestClose={this.handleOnCloseEditAuthorModal}>
                    <EditAuthorForm onSaveAuthor={this.handleOnEditAuthor} onCloseModal={this.handleOnCloseEditAuthorModal} author={this.state.selectedAuthor} />
                </Modal>
                <div className="mb-3">
                    <AuthorControlPanel openAddAuthorModal={this.handleOpenAddAuthorModal} onFindAuthors={this.handleOnFindAuthors} />
                </div>
                <AuthorTable authors={this.state.authors} onDeleteAuthor={this.handleOnDeleteAuthor} onOpenEditAuthorModal={this.handleOpenEditAuthorModal} />
            </div>
        );
    }
}

export default AuthorManager;