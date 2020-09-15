import React, { Component } from 'react';
import './list.scss';

export default class List extends Component {
    state = {
        addressHeight: 0,
        active: false
    }

    openClosePop = () => {
        const {addressHeight} = this.state;
        if (!addressHeight) {
            this.setState({
                addressHeight: 250,
                active: true
            });
        } else {
            this.setState({
                addressHeight: 0,
                active: false
            });
        }
    };

    render() {
        const { id, firstName, lastName, email, phone , description} = this.props.data;
        const {city, state, streetAddress, zip} = this.props.data.address;
        const {addressHeight, active} = this.state;

        const classListActive = active ? 'table__block table__block-hover table__active' : 'table__block table__block-hover'
        
        return (<>
            <div onClick={this.openClosePop} className={classListActive}>
                <div className="table__list">{ id }</div>
                <div className="table__list">{ firstName }</div>
                <div className="table__list">{ lastName }</div>
                <div className="table__list">{ email }</div>
                <div className="table__list">{ phone }</div>
            </div>
            <div style={{height: `${addressHeight}px`}} className="address">
                <div className="address__block">
                    <div className="address__list"><span>City:</span> { city }</div>
                    <div className="address__list"><span>State:</span> { state }</div>
                    <div className="address__list"><span>StreetAddress:</span> { streetAddress }</div>
                    <div className="address__list"><span>Zip:</span> { zip }</div>
                    <div className="address__list address__description"><span>Description:</span> { description }</div>
                </div>
            </div>
        </>);
    }
}