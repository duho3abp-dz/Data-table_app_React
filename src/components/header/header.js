import React, { Component } from 'react';
import './header.scss';

export default class Header extends Component {
    state = {
        data: {
            id: 'id',
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phone: 'phone'
        }
    }

    render() {
        const { id, firstName, lastName, email, phone } = this.state.data;
        
        return (
            <div className="table__block">
                <div onClick={() => this.props.columnSorting(id)} className="table__list table__header">{ id }</div>
                <div onClick={() => this.props.columnSorting(firstName)} className="table__list table__header">{ firstName }</div>
                <div onClick={() => this.props.columnSorting(lastName)} className="table__list table__header">{ lastName }</div>
                <div onClick={() => this.props.columnSorting(email)} className="table__list table__header">{ email }</div>
                <div onClick={() => this.props.columnSorting(phone)} className="table__list table__header">{ phone }</div>
            </div>
        );
    }
}