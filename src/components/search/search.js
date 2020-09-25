import React, { Component } from 'react';
import './search.scss';

export default class Search extends Component {
    render() {
        const {changeTerm, searchTerm, nonResult, term} = this.props;

        const inputClass = !nonResult ? "search__input" : "search__input search__input--non";
        const inputPlaseHolder = !nonResult ? "Enter your search term" : "This term is not in this list..."

        return (
            <form onSubmit={ searchTerm } className="search">
                <input 
                    value={term}
                    type="text"
                    placeholder={ inputPlaseHolder }
                    className={ inputClass }
                    onChange={ changeTerm }
                />
                <button className="search__btn">search</button>
            </form>
        );
    }
}