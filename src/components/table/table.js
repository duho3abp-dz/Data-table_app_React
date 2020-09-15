import React, { Component } from 'react';

import Servise from '../../service';
import List from '../list';
import Header from '../header';
import Spinner from '../spinner';
import Error from '../error';
import Search from '../search';
import Slider from '../slider';

import './table.scss';

export default class Table extends Component {
    Sevice = new Servise();
    state = {
        data: [],
        filter: [],
        page: 0,
        totalPages: 0,
        loading: true,
        error: false,
        stringsTarget: 49,
        term: '',

        sortId: true,
        sortFirst: true,
        sortLast: true,
        sortEmail: true,
        sortPhone: true
    }

    // --------------------LOGIC-------------------- //

    componentDidMount() {
        const {getResource} = this.Sevice;

        getResource(1)
            .then(data => {
                this.setData(data);
                this.setAllPages(data);
            })
            .catch(() => this.setState({error: true}))
            .finally(() => this.setState({loading: false}));
    }

    setData = (data) => {
        const newData = data.map(obj => {
            obj.id = obj.id + '';
            return obj;
        })
        this.setState({data: newData});
    };

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
        const {
            sortId, 
            sortFirst,
            sortLast,
            sortEmail,
            sortPhone
        } = this.state;

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
    changeSearchTermState = (e) => this.setState({term: e.target.value});

    searchTerm = () => {
        const {data, term} = this.state;
        if (term.length !== 0) {
            const filterArr = data.filter(obj => {
                let ok = false;
                for (let key in obj) {
                    if (key !== 'address' && key !== 'description') {
                        if (obj[key].indexOf(term) > -1) {
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
            this.setState({filter: filterArr});
            this.setAllPages(filterArr);
        } else {
            this.setState({filter: ''});
            this.setAllPages(data);
        }
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
        return arr.map((obj, i) => {
            return <List key={i} data={obj} />;
        });
    };

    render() {
        const {data, filter, loading, error, page, totalPages, term} = this.state;

        const content = error ? <Error /> : loading ? <Spinner/> : this.listRender(this.splittingDataIntoPages(data, page, filter));
        const numPage = page < 9 ? `0${page + 1}` : page + 1 ;
        const totalNumPage = !totalPages ? '01' : totalPages < 10 ? `0${totalPages}` : totalPages;

        return (<>
            <Search 
                changeTerm={this.changeSearchTermState} 
                searchTerm={this.searchTerm}
                term={term}
            />
            <div className="container">
                <Header information={this.state} columnSorting={this.columnSorting} />
                {content}
            </div>
            <Slider 
                changePage={this.changePage}
                numPage={numPage}
                totalNumPage={totalNumPage}
            />
        </>);
    }   
}