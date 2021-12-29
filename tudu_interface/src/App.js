import axios from 'axios';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import UserList from './components/User'
import ProjectList from './components/Projects'
import NoPage from "./components/NoPage";
import LoginForm from "./components/Auth";

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            'users': [],
            'projects': [],
            'token': ''
        };
    }

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {"username": login, "password": password})
        .then(response => {
            const token = response.data.token
            this.setState({
                    'token': token
                }, this.get_data)
        }).catch(error => console.log(error))
    }

    is_authenticated() {
        return this.state.token != ''
    }

    get_headers() {
        if (this.is_authenticated()) {
            return { 'Authorization': 'Token ' + this.state.token }
        }
        return {}
    }

    get_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
                .then(response => {
                    const users = response.data
                        this.setState({
                                'users': users
                            })
                }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
                .then(response => {
                    const projects = response.data
                        this.setState({
                                'projects': projects
                            })
                }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_data()
    }

    render() {
        return (
            <BrowserRouter>
              <nav>
                <ul>
                  <li><Link to="/users">Users</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  <li><Link to="/login">Sign In</Link></li>
                </ul>
              </nav>
              <Routes>
                <Route path="/users" element={<UserList users={this.state.users} />} />
                <Route path="/projects" element={<ProjectList projects={this.state.projects} />} />
                <Route path="/login" element={<LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
