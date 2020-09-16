import React, { Component } from 'react';

import Start from '../start';
import Table from '../table';
import './app.scss'

export default class App extends Component {
    state = {
        amountData: 0,
        openApp: false
    }

    // --------------------LOGIC-------------------- //

    openMenu = () => {
        this.setState({openApp: false});
    }

    setAmountData = (select) => {
        this.setState({
            amountData: select,
            openApp: true
        });
    }

    // --------------------RENDER-------------------- //

    render() {
        const {amountData, openApp} = this.state;

        const content = openApp ? 
        <Table openMenu={this.openMenu} amountData={amountData} /> : 
        <Start setAmountData={this.setAmountData} /> ;

        return (
            <div className="wrapper">
                {content}
            </div>
        );
    }   
}