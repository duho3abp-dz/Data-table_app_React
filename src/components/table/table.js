import React, { Component } from 'react';

import Servise from '../../service';
import List from '../list';
import Header from '../header';
import Spinner from '../spinner';
import Error from '../error';

import './table.scss'

export default class Table extends Component {
    Sevice = new Servise();
    state = {
        data: [],
        loading: true,
        error: false,

        sortId: true,
        sortFirst: true,
        sortLast: true,
        sortEmail: true,
        sortPhone: true
    }

    componentDidMount() {
        const {getResource} = this.Sevice;

        getResource()
            .then(data => this.setState({data}))
            .catch(() => this.setState({error: true}))
            .finally(() => this.setState({loading: false}));
    }

    sortingObjects = (data, column, sort) => {
        const arr = data.sort((a, b) => {
            if (a[column] > b[column]) {
                return sort ? 1 : -1 ;
                
            }
            if (a[column] < b[column]) {
                return sort ? -1 : 1 ;
            }
            return 0;
        });
        this.setState({ data: [...arr] });
    }

    columnSorting = (column) => {
        const {
            data, 
            sortId, 
            sortFirst,
            sortLast,
            sortEmail,
            sortPhone
        } = this.state;

        switch (column) {
            case 'id':
                this.sortingObjects(data, column, sortId)
                this.setState({ sortId: !sortId });    
                break;
            case 'firstName':
                this.sortingObjects(data, column, sortFirst)
                this.setState({ sortFirst: !sortFirst });    
                break;
            case 'lastName':
                this.sortingObjects(data, column, sortLast)
                this.setState({ sortLast: !sortLast });    
                break;
            case 'email':
                this.sortingObjects(data, column, sortEmail)
                this.setState({ sortEmail: !sortEmail });    
                break;
            case 'phone':
                this.sortingObjects(data, column, sortPhone)
                this.setState({ sortPhone: !sortPhone });    
                break;

            default:
                break;
        }
                
    }

    listRender = (arr) => {
        return arr.map((obj, i) => {
            return <List key={i} data={obj} />;
        });
    }

    render() {
        const {data, loading, error} = this.state;

        const content = error ? <Error /> : loading ? <Spinner/> : this.listRender(data);

        return ( 
            <div className="container">
                <Header columnSorting={this.columnSorting} />
                {content}
            </div>
        );
    }   
}