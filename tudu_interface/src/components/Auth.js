import React from 'react';


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'login': '',
            'password': ''
        }
    }

    handleChange(e) {
        this.setState({
                [e.target.name]: e.target.value
            })
    }

    handleSubmit(e) {
        this.props.get_token(this.state.login, this.state.password)
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input type="text" name="login" placeholder="login"
                value={this.state.login}
                onChange={(e) => this.handleChange(e)} />
              <input type="password" name="password" placeholder="password"
                value={this.state.password}
                onChange={(e) => this.handleChange(e)} />
              <input type="submit" value="Login" />
            </form>
        );
    }
}

export default LoginForm;
