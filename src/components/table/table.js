import React, { Component } from 'react';

import Servise from '../../service';
import List from '../list';
import Header from '../header';
import Spinner from '../spinner';
import Error from '../error';

import './table.scss';
import svg from './button.svg';

export default class Table extends Component {
    Sevice = new Servise();
    state = {
        data: [],
        page: 0,
        totalPages: 0,
        loading: true,
        error: false,
        stringsTarget: 49,

        sortId: true,
        sortFirst: true,
        sortLast: true,
        sortEmail: true,
        sortPhone: true
    }

    componentDidMount() {
        const {getResource} = this.Sevice;

        getResource(1)
            .then(data => {
                this.setState({data});
                this.setAllPages(data);
            })
            .catch(() => this.setState({error: true}))
            .finally(() => this.setState({loading: false}));
    }

    setAllPages = (data) => {
        const allPages = Math.ceil(data.length / (this.state.stringsTarget + 1));
        this.setState({totalPages: allPages});
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

    splittingDataIntoPages = (arr, page) => {
        const {stringsTarget} = this.state;
        let newArr = [],
            wrapArr = [],
            x = 0;

        arr.forEach((obj, i)=> {
            if (x < stringsTarget) {
                x++;
                newArr = [...newArr, obj];

                if (i >= arr.length - 1) {
                    wrapArr= [...wrapArr, newArr];
                }
            } else if (x >= stringsTarget) {
                x = 0
                wrapArr= [...wrapArr, newArr];
                newArr = [];
            }
        })

        return wrapArr[page];
    }

    changePage = (route) => {
        const {data, page, totalPages} = this.state;

        if (data.length) {
            switch (route) {
                case 'next':
                    const nextPage = page + 1;
                    if (nextPage >= totalPages) {
                        this.setState({page: 0});
                    } else {
                        this.setState({page: nextPage});
                    }
                    break;
    
                case 'prev':
                    const prevPage = page - 1;
                    if (prevPage < 0) {
                        this.setState({page: totalPages - 1});
                    } else {
                        this.setState({page: prevPage});
                    }
                    break;
            
                default:
                    break;
            }
        }
    }

    listRender = (arr) => {
        return arr.map((obj, i) => {
            return <List key={i} data={obj} />;
        });
    }

    render() {
        const {data, loading, error, page, totalPages} = this.state;

        const content = error ? <Error /> : 
                        loading ? <Spinner/> : this.listRender(this.splittingDataIntoPages(data, page)) ;

        const numPage = page < 9 ? `0${page + 1}` : page + 1 ;
        const totalNumPage = !totalPages ? '01' : totalPages < 10 ? `0${totalPages}` : totalPages;

        return (<>
            <div className="container">
                <Header columnSorting={this.columnSorting} />
                {content}
            </div>
            <div onClick={() => this.changePage('prev')} className="fixed__btn-prev"><img src={svg} alt="button"></img></div>
            <div onClick={() => this.changePage('next')} className="fixed__btn-next"><img src={svg} alt="button"></img></div>
            <div className="fixed__counter">{numPage}/{totalNumPage}</div>
        </>);
    }   
}