import React, { Component } from 'react';

import Servise from '../../service';
import List from '../list';
import Header from '../header';
import Spinner from '../spinner';
import Error from '../error';
import Search from '../search';
import Slider from '../slider';
import Form from '../form';

import svg from './menu.svg'
import './table.scss';

export default class Table extends Component {
    Sevice = new Servise();
    state = {
        data: [],
        error: false,
        filter: [],
        formOpen: false,
        loading: true,
        nonResult: false,
        page: 0,
        term: '',
        totalPages: 0,
        stringsTarget: 49,
        sortId: true,
        sortFirst: true,
        sortLast: true,
        sortEmail: true,
        sortPhone: true
    }

    // --------------------LOGIC-------------------- //

    componentDidMount() {
        const {amountData} = this.props;
        const {getResource} = this.Sevice;

        getResource(amountData)
            .then(data => {
                this.setState({data,
                    formOpen: true
                });
                this.setAllPages(data);
            })
            .catch(() => this.setState({error: true}))
            .finally(() => this.setState({loading: false}));
    }

    // *** Form *** //
    addNewContact = (contact) => {
        this.setState({data: [
            contact,
            ...this.state.data
        ]});
    }

    // *** Sorting *** //
    sortingObjects = (column, sort) => {
        const {data, filter} = this.state;
        const filterArr = filter.length !== 0 ? filter : data ;

        const arr = filterArr.sort((a, b) => {
            if (a[column] > b[column]) {
                return sort ? 1 : -1 ;
                
            }
            if (a[column] < b[column]) {
                return sort ? -1 : 1 ;
            }
            return 0;
        });

        if (filter.length !== 0) {
            this.setState({ filter: [...arr] });    
        } else {
            this.setState({ data: [...arr] });
        }
    };

    columnSorting = (column) => {
        const {sortId, sortFirst, sortLast, sortEmail, sortPhone} = this.state;

        switch (column) {
            case 'id':
                this.sortingObjects(column, sortId)
                this.setState({ sortId: !sortId });    
                break;
            case 'firstName':
                this.sortingObjects(column, sortFirst)
                this.setState({ sortFirst: !sortFirst });    
                break;
            case 'lastName':
                this.sortingObjects(column, sortLast)
                this.setState({ sortLast: !sortLast });    
                break;
            case 'email':
                this.sortingObjects(column, sortEmail)
                this.setState({ sortEmail: !sortEmail });    
                break;
            case 'phone':
                this.sortingObjects(column, sortPhone)
                this.setState({ sortPhone: !sortPhone });    
                break;

            default:
                break;
        }          
    };

    // *** Search *** //
    filterData = (data, term) => data.filter(obj => {
        let ok = false;
        
        for (let key in obj) {
            const corrKey = (obj[key] + '').toUpperCase();
            if (key !== 'address' && key !== 'description') {
                if (corrKey.indexOf(term.toUpperCase()) > -1) {
                    ok = true;
                }
            }
        }
        
        if (ok) {
            return obj;
        } else {
            return null;
        }
    });

    resetFilterAndPages = () => {
        this.setState({filter: ''});
        this.setAllPages(this.state.data);    
    };

    testAndSearch = () => {
        const {data, term} = this.state;

        if (term.length !== 0) {
            const newArr = this.filterData(data, term);

            if (newArr.length !== 0) {
                this.setState({filter: this.filterData(data, term)});
                this.setAllPages(this.filterData(data, term));
                this.setState({nonResult: false});
            } else { 
                this.setState({
                    nonResult: true,
                    term: ''
                });
                this.resetFilterAndPages();
                setTimeout(() => this.setState({nonResult: false}), 2000);
            }
        } else { 
            this.setState({nonResult: false});
            this.resetFilterAndPages(); 
        }
    };

    changeSearchTermState = async (e) => {
        await this.setState({
            page: 0,
            term: e.target.value
        });
        this.testAndSearch();
    };

    searchTerm = (e) => {
        e.preventDefault();
        this.testAndSearch();
    };

    // *** Slider *** //
    setAllPages = (data) => {
        const allPages = Math.ceil(data.length / (this.state.stringsTarget + 1));
        this.setState({totalPages: allPages});
    };

    splittingDataIntoPages = (arr, page, filter) => {
        const {stringsTarget} = this.state;
        const filterArr = filter.length !== 0 ? filter : arr ;
        let newArr = [],
            wrapArr = [],
            x = 0;

        filterArr.forEach((obj, i)=> {
            if (x < stringsTarget) {
                x++;
                newArr = [...newArr, obj];

                if (i >= filterArr.length - 1) {
                    wrapArr= [...wrapArr, newArr];
                }
            } else if (x >= stringsTarget) {
                x = 0
                wrapArr= [...wrapArr, newArr];
                newArr = [];
            }
        })

        return wrapArr[page];
    };

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
    };

    // --------------------RENDER-------------------- //

    listRender = (arr) => {
        if (arr) {
            return arr.map((obj, i) => {
                return <List key={i} data={obj} />;
            });
        }
    };

    renderApp = () => {
        const {data, filter, loading, error, page, totalPages, term, formOpen, nonResult} = this.state;

        const content = error ? <Error /> : loading ? <Spinner/> : this.listRender(this.splittingDataIntoPages(data, page, filter));
        const numPage = page < 9 ? `0${page + 1}` : page + 1 ;
        const totalNumPage = !totalPages ? '01' : totalPages < 10 ? `0${totalPages}` : totalPages;
        const slider = totalPages > 1 ? <Slider changePage={this.changePage} numPage={numPage} totalNumPage={totalNumPage} /> : null ;
        
        return (<>
            <div className="container">
                <Form addNewContact={ this.addNewContact } formOpen={ formOpen } />
                <Header information={ this.state } columnSorting={ this.columnSorting } />
                { content }
            </div>
            <div onClick={this.props.openMenu} className="fixed__menu">
                <img src={svg} alt="menu"></img>
            </div>
            <Search 
                nonResult={ nonResult }
                changeTerm={ this.changeSearchTermState } 
                searchTerm={ this.searchTerm }
                term={ term }
            />
            { slider }
        </>);
    }

    render() {
        return this.renderApp();
    }   
}