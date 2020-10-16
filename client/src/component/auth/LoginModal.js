import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'

import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'


class LoginModal extends Component {
    state = {
        model: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // check for register errro 
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        // if authenticated close model
        // if (this.state.model) {
        //     if (isAuthenticated) {
        //         this.toggle()
        //     }
        // }
    }

    toggle = () => {
        // clear error 
        this.props.clearErrors();

        this.setState({
            model: !this.state.model
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();



        const { email, password } = this.state;

        this.props.login({ email, password });



        // this.toggle();
    }


    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>

                <Modal isOpen={this.state.model} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Log in </ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <form onSubmit={this.onSubmit}>


                            <label for="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                onChange={this.onChange}
                            />

                            <label for="password">password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder=""
                                onChange={this.onChange}
                            />


                            <Button color='dark'
                                style={{ marginTop: '2rem' }}
                                block
                            >
                                Login
                            </Button>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error


})

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(LoginModal)
