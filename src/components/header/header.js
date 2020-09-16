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

    // --------------------LOGIC-------------------- //

    changeArrowDirection = (block) => {
        return block ? {transform: 'translateY(-50%) rotate(-90deg)'} : {transform: 'translateY(-50%) rotate(90deg)'} ;
    }

    toggleViewArrow = (x, a, b, c, d, e) => {
        this.props.columnSorting(x);
        this.setState({
            [a]: true,
            [b]: false,
            [c]: false,
            [d]: false,
            [e]: false
        });
    }

    // --------------------RENDER-------------------- //

    render() {
        const {viewId, viewFirst, viewLast, viewEmail, viewPhone} = this.state;
        const { id, firstName, lastName, email, phone } = this.state.data;
        const {sortId, sortFirst, sortLast, sortEmail, sortPhone} = this.props.information;
        
        return (
            <div className="table__block">

                <div 
                    className="table__list table__header"
                    onClick={() => this.toggleViewArrow(id, 'viewId', 'viewFirst', 'viewLast', 'viewEmail', 'viewPhone')}
                    >
                    { id }
                    <div className="header__id" style={viewId ? this.changeArrowDirection(sortId) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>

                <div 
                    className="table__list table__header"
                    onClick={() => this.toggleViewArrow(firstName, 'viewFirst', 'viewId', 'viewLast', 'viewEmail', 'viewPhone')}
                    >
                    { firstName }
                    <div className="header__first" style={viewFirst ? this.changeArrowDirection(sortFirst) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>

                <div 
                    className="table__list table__header"
                    onClick={() => this.toggleViewArrow(lastName, 'viewLast', 'viewFirst', 'viewId', 'viewEmail', 'viewPhone')}
                    >
                    { lastName }
                    <div className="header__last" style={viewLast ? this.changeArrowDirection(sortLast) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>

                <div 
                    className="table__list table__header"
                    onClick={() => this.toggleViewArrow(email, 'viewEmail', 'viewLast', 'viewFirst', 'viewId', 'viewPhone')}
                    >
                    { email }
                    <div className="header__email" style={viewEmail ? this.changeArrowDirection(sortEmail) : null}>
                        <img src={svg} alt="arrow"></img>
                    </div>
                </div>

                <div 
                    className="table__list table__header"
                    onClick={() => this.toggleViewArrow(phone, 'viewPhone', 'viewEmail', 'viewLast', 'viewFirst', 'viewId')}
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