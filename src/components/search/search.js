import React, { Component } from 'react';
import './search.scss';

export default class Search extends Component {
    render() {
        const {changeTerm, searchTerm} = this.props;

        return (
            <div className="search">
                <input 
                    type="text"
                    placeholder="Enter your search term" 
                    className="search__input"
                    onChange={changeTerm}
                />
                <button onClick={searchTerm} className="search__btn">search</button>
            </div>
        );
    }
}