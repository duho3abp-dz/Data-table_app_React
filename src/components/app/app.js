import React, { Component } from 'react';

import Table from '../table';
import './app.scss'

export default class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Table />
            </div>
        );
    }   
}