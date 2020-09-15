import React, { Component } from 'react';

import './slider.scss';
import svg from './button.svg';

export default class Slider extends Component {
    render() {
        const {changePage, numPage, totalNumPage} = this.props;

        return (<>
            <div onClick={() => changePage('prev')} className="fixed__btn-prev">
                <img src={svg} alt="button"></img>
            </div>
            <div onClick={() => changePage('next')} className="fixed__btn-next">
                <img src={svg} alt="button"></img>
            </div>

            <div className="fixed__counter">{numPage}/{totalNumPage}</div>
        </>);
    }
}