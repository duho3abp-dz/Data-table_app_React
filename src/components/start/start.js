import React, { Component } from 'react';

import './start.scss';

export default class Start extends Component {
    state = {
        largeData: 1000,
        smallData: 32
    }

    selectDataset = ({target}) => {
        const {largeData, smallData} = this.state;
        const {setAmountData} = this.props;
        
        switch (target.innerText) {
            case 'large':
                setAmountData(largeData);
                break;
            case 'small':
                setAmountData(smallData);
                break;
        
            default:
                break;
        }
    };

    render() {
        return (
            <div className="start">
                <div className="start__title">DATA TABLE</div>
                <div className="start__content">
                    <h2>Description</h2>
                    <p>
                        React application for displaying a table with data. Functional: <br/>
                        - Sorting by columns: when you click on the name of a column, the rows of the table are sorted in ascending order, when you click again, in descending order; <br/>
                        - Client-side pagination: data must be displayed per page, maximum 50 items per page; <br/>
                        - Filtering: the component provides a text field in which the user can enter text and table rows whose data does not contain a substring entered by the user are hidden. Re-filtering is carried out by clicking on the "Find" button; <br/>
                        - By clicking on a row in the table, the field values ​​are displayed in an additional block below the table; <br/>
                        - Data is loaded into the table from the server; <br/>
                        - Above the table there is an add button, by clicking on which the form for adding a row drops out; <br/>
                        - After filling in all inputs, the Add to table button is activated, which inserts the filled row at the beginning of the table.
                    </p>
                </div>
                <h2>Select dataset:</h2>
                <div className="start__select">
                    <button onClick={this.selectDataset}>large</button>
                    <button onClick={this.selectDataset}>small</button>
                </div>
            </div>
        );
    }
}