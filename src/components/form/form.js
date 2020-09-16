import React, { Component } from 'react';

import './form.scss';

export default class Form extends Component {
    state = {
        submit: false,
        height: 0,
        contact: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: {
                city: '',
                state: '',
                streetAddress: '',
                zip: ''
            },
            description: ''
        }
    }

    // --------------------LOGIC-------------------- //

    openClosePop = () => {
        const {formOpen} = this.props;
        const {height} = this.state;

        if (formOpen) {
            if (!height) {
                this.setState({height: 400});
            } else {
                this.setState({height: 0});
            }
        }
    };

    testingContactsForData = () => {
        const {contact} = this.state;

        let arr = [];
        for (let key in contact) {
            if (key !== 'address') {
                if (contact[key]) {
                    arr = [...arr, true];
                } else {
                    arr = [...arr, false];
                }
            } else {
                for (let x in contact[key]) {
                    if (contact[key][x]) {
                        arr = [...arr, true];
                    } else {
                        arr = [...arr, false];
                    }   
                }
            }
        }

        if (arr.filter(item => item).length === arr.length) {
            this.setState({submit: true});
        };
    }

    setContact = async ({key, addr, target}) => {
        if (key) {
            await this.setState({contact: {
                ...this.state.contact,
                [key]: target
            }})
        }
        if (addr) {
            await this.setState({contact: { 
                ...this.state.contact,
                address: {
                    ...this.state.contact.address,
                    [addr]: target
                }
            }})
        }
        
        this.testingContactsForData();
    };

    changeStateContact = ({target}) => {
        switch (target.name) {
            case 'id':
                if (+target.value || +target.value === 0) {
                    this.setContact({key: 'id', target: target.value});
                }
                break;
            case 'firstName':
                this.setContact({key: 'firstName', target: target.value});
                break;
            case 'lastName':
                this.setContact({key: 'lastName', target: target.value});
                break;
            case 'email':
                this.setContact({key: 'email', target: target.value});
                break;
            case 'phone':
                this.setContact({key: 'phone', target: target.value});
                break;
            case 'city':
                this.setContact({addr: 'city', target: target.value});
                break;
            case 'state':
                this.setContact({addr: 'state', target: target.value});
                break;
            case 'streetAddress':
                this.setContact({addr: 'streetAddress', target: target.value});
                break;
            case 'zip':
                if (+target.value || +target.value === 0) {
                    this.setContact({addr: 'zip', target: target.value});
                }
                break;
            case 'description':
                this.setContact({key: 'description', target: target.value});
                break;
        
            default:
                break;
        }
    };

    addNewContact = (e) =>{
        e.preventDefault();

        const {contact} = this.state;
        this.props.addNewContact(contact);

        this.setState({
            submit: false,
            height: 0,
            contact: {
                submit: false,
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: {
                    city: '',
                    state: '',
                    streetAddress: '',
                    zip: ''
                },
                description: ''
            }
        })
    };

    // --------------------RENDER-------------------- //

    render() {
        const {height, submit} = this.state;
        const {id, firstName, lastName, email, phone, description} = this.state.contact;
        const {city, state, streetAddress, zip} = this.state.contact.address;

        const classBtnSubmit = submit ? 'form__block-btn' : 'form__block-btn form__submit-none' ;

        return (<>
            <div className="table__block form__btn">
                <div onClick={this.openClosePop} className="form__btn-add">
                    ADD NEW ROW
                </div>
            </div>
            <div style={{height: `${height}px`}} className="table__block form">
                <form onSubmit={this.addNewContact} className="form__block">
                    <div className="form__block-column">
                        <div className="form__block-row">
                            <span>Id</span>
                            <input 
                                onChange={this.changeStateContact}
                                name="id" 
                                type="text" 
                                placeholder="1001" 
                                required
                                value={id + ''}
                            />

                            <span>FirstName</span>
                            <input 
                                onChange={this.changeStateContact} 
                                name="firstName" 
                                type="text" 
                                placeholder="Ivan" 
                                required
                                value={firstName}
                            />

                            <span>LastName</span>
                            <input 
                                onChange={this.changeStateContact} 
                                name="lastName" 
                                type="text" 
                                placeholder="Ivanov" 
                                required
                                value={lastName}
                            />

                            <span>Email</span>
                            <input 
                                onChange={this.changeStateContact} 
                                name="email" 
                                type="text" 
                                placeholder="IvanIvanov@unknown.ru" 
                                required
                                value={email}
                            />

                            <span>Phone</span>
                            <input 
                                onChange={this.changeStateContact} 
                                name="phone" 
                                type="phone" 
                                placeholder="(999)999-9999" 
                                required
                                value={phone}
                            />
                        </div>

                        <div className="form__block-row">
                            <span>City</span>
                            <input 
                                onChange={this.changeStateContact}
                                name="city" 
                                type="text" 
                                placeholder="Moscow" 
                                required
                                value={city}
                            />

                            <span>State</span>
                            <input 
                                onChange={this.changeStateContact} 
                                name="state" 
                                type="text" 
                                placeholder="MR" 
                                required
                                value={state}
                            />

                            <span>StreetAddress</span>
                            <input 
                                onChange={this.changeStateContact} 
                                name="streetAddress" 
                                type="text" 
                                placeholder="103132, Moscow" 
                                required
                                value={streetAddress}
                            />

                            <span>Zip</span>
                            <input 
                                onChange={this.changeStateContact} 
                                name="zip" 
                                type="text" 
                                placeholder="99999" 
                                required
                                value={zip}
                            />

                            <span>Description</span>
                            <input 
                                onChange={this.changeStateContact} 
                                name="description" 
                                type="text" 
                                required
                                value={description}
                            />
                        </div>
                    </div>
                    <div className="form__block-column">
                        <button className={classBtnSubmit}>Add</button>
                    </div>
                </form>
            </div>
        </>);
    }
}