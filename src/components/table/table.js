import React, { Component } from 'react';

import Servise from '../../service';
import List from '../list';
import './table.scss'

export default class Table extends Component {
    Sevice = new Servise();
    state = {
        data: [{
            id: 'id',
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phone: 'phone'
        }]
    }

    componentDidMount() {
        const {getResource} = this.Sevice

        getResource()
            .then(this.changeStateData);
    }

    changeStateData = (res) => {
        const {data} = this.state;

        const newArr = [...data, ...res];
        this.setState(data => ({
            data: newArr
        }));
    }

    listRender = (arr) => {
        return arr.map((obj, i) => {
            return <List key={i} data={obj} />;
        });
    }

    render() {
        const {data} = this.state;

        const content = this.listRender(data);

        return ( 
            <div className="container">
                {content}
            </div>
        );
    }   
}