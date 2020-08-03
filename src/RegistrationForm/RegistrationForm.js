import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class RegistrationForm extends React.Component {

    state = {
        username: "",
        password: "",
        confirmPassword: "",
        usernameError: "",
        passwordError: "",
        confirmPasswordError: ""
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = () => {
        if(this.state.username === "") {
            this.setState({
                usernameError: "This field is required"
            })
        } else {
            this.setState({
                usernameError: ""
            })
        }
        if(this.state.password === "") {
            this.setState({
                passwordError: "This field is required"
            })
        } else {
            this.setState({
                passwordError: ""
            })
        }
        if(this.state.confirmPassword !== this.state.password) {
            this.setState({
                confirmPasswordError: "Password didn't match"
            })
        } else {
            this.setState({
                confirmPasswordError: ""
            })
        }
        if((this.state.username !== "") && (this.state.password !== "") && (this.state.confirmPassword === this.state.password)) {
            axios.post("https://restaurant-application-server.herokuapp.com/users", {
                user: {
                    username: this.state.username,
                    password: this.state.password,
                    role: "Admin"
                }
            }).then(res => {
                this.props.userCredential(this.state.username, this.state.password);
                this.setState({
                    username: "",
                    password: "",
                    confirmPassword: ""
                })
                alert("Registration Successful");
            })
        }
    }

    render() {

        return(
            <div id="registration-form">
                <h4>Register</h4>
                <div className="form-input">
                    Username: <input type="text" onChange={this.inputChangeHandler} value={this.state.username} name="username"/><br/>
                </div>
                <div className="error">
                    <small>{this.state.usernameError}</small>
                </div>
                <div className="form-input">
                    Password: <input type="password" onChange={this.inputChangeHandler} value={this.state.password} name="password"/><br/>
                </div>
                <div className="error">
                    <small>{this.state.passwordError}</small>
                </div>
                <div className="form-input">
                    Confirm Password: <input type="password" onChange={this.inputChangeHandler} value={this.state.confirmPassword} name="confirmPassword"/><br/>
                </div>
                <div className="error">
                    <small>{this.state.confirmPasswordError}</small>
                </div>
                <button onClick={this.register}>Register</button>
                <div>
                    <small>Registered already? <Link to="/login">Click here to LOGIN</Link></small>
                </div>
            </div>
        )

    }

}

export default RegistrationForm;