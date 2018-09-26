import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthorControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: ''
        };

        this.onSearchFirstNameChanged = this.onSearchFirstNameChanged.bind(this);
    }

    onSearchFirstNameChanged(event) {
        const firstName = event.target.value;
        this.setState({firstName});
    }

    render () {
        return (
            <div>
                <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.props.openAddAuthorModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" placeholder="Buscar autor por título ..." value={this.state.firstName} onChange={this.onSearchFirstNameChanged} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={() => this.props.onFindAuthors(this.state.firstName)} >
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>        
            </div>
        );
    }
}

AuthorControlPanel.propTypes = {
    openAddAuthorModal: PropTypes.func,
    onFindAuthors: PropTypes.func
};

export default AuthorControlPanel;