import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';


class AddAuthorForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            country: [],
            validationErrors: []
        };

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    
    onFirstNameChange(event) {
        const firstName = event.target.value.trim();

        this.validateFirstName(firstName);

        this.setState({ firstName: firstName });
    }


    onLastNameChange(event) {
        const lastName = event.target.value.trim();

        this.validateLastName(lastName);
        
        this.setState({ lastName: lastName });
    }


    onCountryChange(event) {
        const country = event.target.value.trim();

        if (this.validateCountry(country)) {            
            this.setState({ country: country});
        }        
    }

    
    onSave(event) {
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { firstName, lastName, country } = this.state;
            
            if (this.validateFirstName(firstName) && this.validateLastName(lastName) && this.validateCountry(country) ) {
                this.props.onSaveAuthor(this.state);
            }
        }
    }
    

    validateFirstName(firstName) {
        const message = 'Nombre es requerido';

        if (firstName === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateLastName(lastName) {
        const message = 'Apellido es requerido';

        if (lastName === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateCountry(country) {
        const message = 'Pais es requerido';
        
        if (country === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }

    
    addValidationError(message) {        
        this.setState((previousState) => {
            const validationErrors = [...previousState.validationErrors];
            validationErrors.push({message});
            return {
                validationErrors: validationErrors
            };
        });      
    }

    
    removeValidationError(message) {
        this.setState((previousState) => {
            const validationErrors = previousState
                .validationErrors
                .filter(error => error.message !== message);
            
            return {
                validationErrors: validationErrors
            };
        });      
    }

    
    render() {

        const validationErrorSummary = this.state.validationErrors.map(error => 
            <div key={uuidv1()} className="alert alert-danger alert-dismissible fade show">
                {error.message}
                <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        );

        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> Nuevo Autor</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove fa-2x mr-2 text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="firstName">Nombre</label>
                        <input type="text" className="form-control" name="firstName" autoFocus onChange={this.onFirstNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Apellido</label>
                        <input type="text" className="form-control" name="lastName" autoFocus onChange={this.onLastNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Pais</label>
                        <input type="text" className="form-control" name="country" onChange={this.onCountryChange} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-lg btn-block">
                                <i className="fa fa-save mr-2"></i>Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-lg btn-block mt-2 mt-sm-0"
                                onClick={this.props.onCloseModal}
                                type="button">
                                <i className="fa fa-remove mr-2"></i>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddAuthorForm.propTypes = {
    onCloseModal: PropTypes.func,
    onSaveAuthor: PropTypes.func
};

export default AddAuthorForm;