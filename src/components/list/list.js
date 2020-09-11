import React, { Component } from 'react';
import './list.scss';

export default class List extends Component {
    render() {
        const { id, firstName, lastName, email, phone } = this.props.data;
        
        return (
            <div className="table__block">
                <div className="table__list table__id">{ id }</div>
                <div className="table__list table__first">{ firstName }</div>
                <div className="table__list table__last">{ lastName }</div>
                <div className="table__list table__email">{ email }</div>
                <div className="table__list table__phone">{ phone }</div>
            </div>
        );
    }
}