import React from "react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {

    state = {
        username: "",
        password: ""
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        if(this.state.username.trim() === "") {
            this.setState({
                usernameError: "This field is required"
            })
        } else {
            this.setState({
                usernameError: ""
            })
        }
        if(this.state.password.trim() === "") {
            this.setState({
                passwordError: "This field is required"
            })
        } else {
            this.setState({
                passwordError: ""
            })
        }
        if((this.state.username !== "") && (this.state.password !== "")) {
            this.props.userCredential(this.state.username, this.state.password);
        }
    }

    render() {

        return(
            <div id="login-form">
                <h4>Login</h4>
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
                <button onClick={this.login}>Login</button>
                <div>
                    <small>Not yet registered? <Link to="/register">Click here to REGISTER</Link></small>
                </div>
            </div>
        )

    }

}

export default LoginForm;