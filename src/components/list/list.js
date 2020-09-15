import React, { Component } from 'react';
import './list.scss';

export default class List extends Component {
    state = {
        addressHeight: 0
    }

    openClosePop = () => {
        const {addressHeight} = this.state;
        if (!addressHeight) {
            this.setState({addressHeight: 150});
        } else {
            this.setState({addressHeight: 0});
        }
    };

    render() {
        const { id, firstName, lastName, email, phone } = this.props.data;
        const {city, state, streetAddress, zip} = this.props.data.address;
        const {addressHeight} = this.state;
        
        return (<>
            <div onClick={this.openClosePop} className="table__block table__block-hover">
                <div className="table__list table__id">{ id }</div>
                <div className="table__list table__first">{ firstName }</div>
                <div className="table__list table__last">{ lastName }</div>
                <div className="table__list table__email">{ email }</div>
                <div className="table__list table__phone">{ phone }</div>
            </div>
            <div style={{height: `${addressHeight}px`}} className="adress">
                <div className="adress__block">
                    <div className="adress__list"><span>City:</span> { city }</div>
                    <div className="adress__list"><span>State:</span> { state }</div>
                    <div className="adress__list"><span>StreetAddress:</span> { streetAddress }</div>
                    <div className="adress__list"><span>Zip:</span> { zip }</div>
                </div>
            </div>
        </>);
    }
}