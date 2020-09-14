import React, { Component } from 'react';
import './header.scss';
import svg from './arrow.svg';

export default class Header extends Component {
    state = {
        data: {
            id: 'id',
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phone: 'phone'
        },
        viewId: false,
        viewFirst: false,
        viewLast: false,
        viewEmail: false,
        viewPhone: false
    }

    changeArrowDirection = (block) => {
        return block ? {transform: 'translateY(-50%) rotate(-90deg)'} : {transform: 'translateY(-50%) rotate(90deg)'} ;
    }

    render() {
        const {viewId, viewFirst, viewLast, viewEmail, viewPhone} = this.state;
        const { id, firstName, lastName, email, phone } = this.state.data;
        const {sortId, sortFirst, sortLast, sortEmail, sortPhone} = this.props.information;
        
        return (
            <div className="table__block">

                <div 
                    className="table__list table__header"
                    onClick={() => {
                        this.props.columnSorting(id);
                        this.setState({
                            viewId: true,
                            viewFirst: false,
                            viewLast: false,
                            viewEmail: false,
                            viewPhone: false
                        });
                    }} 
                    >
                    { id }
                    <div className="header__id" style={viewId ? this.changeArrowDirection(sortId) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>

                <div 
                    className="table__list table__header"
                    onClick={() => {
                        this.props.columnSorting(firstName);
                        this.setState({
                            viewId: false,
                            viewFirst: true,
                            viewLast: false,
                            viewEmail: false,
                            viewPhone: false
                        });
                    }} 
                    >
                    { firstName }
                    <div className="header__first" style={viewFirst ? this.changeArrowDirection(sortFirst) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>

                <div 
                    className="table__list table__header"
                    onClick={() => {
                        this.props.columnSorting(lastName);
                        this.setState({
                            viewId: false,
                            viewFirst: false,
                            viewLast: true,
                            viewEmail: false,
                            viewPhone: false
                        });
                    }} 
                    >
                    { lastName }
                    <div className="header__last" style={viewLast ? this.changeArrowDirection(sortLast) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>

                <div 
                    className="table__list table__header"
                    onClick={() => {
                        this.props.columnSorting(email);
                        this.setState({
                            viewId: false,
                            viewFirst: false,
                            viewLast: false,
                            viewEmail: true,
                            viewPhone: false
                        });
                    }} 
                    >
                    { email }
                    <div className="header__email" style={viewEmail ? this.changeArrowDirection(sortEmail) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>

                <div 
                    className="table__list table__header"
                    onClick={() => {
                        this.props.columnSorting(phone);
                        this.setState({
                            viewId: false,
                            viewFirst: false,
                            viewLast: false,
                            viewEmail: false,
                            viewPhone: true
                        });
                    }} 
                    >
                    { phone }
                    <div className="header__phone" style={viewPhone ? this.changeArrowDirection(sortPhone) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>
            </div>
        );
    }
}