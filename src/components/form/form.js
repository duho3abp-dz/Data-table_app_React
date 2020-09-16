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
            if (key !== 'address' && key !== 'description') {
                if (contact[key]) {
                    arr = [...arr, true];
                } else {
                    arr = [...arr, false];
                }
            }
        }

        if (arr.filter(item => item).length === arr.length) {
            this.setState({submit: true});
        };
    }

    setContact = async (key, target) => {
        await this.setState({contact: {
            ...this.state.contact,
            [key]: key === 'id' ? +target : target
        }})
        this.testingContactsForData();
    };

    changeStateContact = ({target}) => {
        switch (target.name) {
            case 'id':
                this.setContact('id', target.value);
                break;
            case 'firstName':
                this.setContact('firstName', target.value);
                break;
            case 'lastName':
                this.setContact('lastName', target.value);
                break;
            case 'email':
                this.setContact('email', target.value);
                break;
            case 'phone':
                this.setContact('phone', target.value);
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
        const {id, firstName, lastName, email, phone} = this.state.contact;

        const classBtnSubmit = submit ? 'form__block-btn' : 'form__block-btn form__submit-none' ;

        return (<>
            <div className="table__block form__btn">
                <div onClick={this.openClosePop} className="form__btn-add">
                    ADD NEW ROW
                </div>
            </div>
            <div style={{height: `${height}px`}} className="table__block form">
                <form onSubmit={this.addNewContact} className="form__block">
                    <span>Id</span>
                    <input 
                        onChange={this.changeStateContact}
                        name="id" 
                        type="text" 
                        placeholder="1001" 
                        required
                        value={id}
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

                    <button className={classBtnSubmit}>Add</button>
                </form>
            </div>
        </>);
    }
}