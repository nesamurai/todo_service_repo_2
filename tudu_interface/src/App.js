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
            localStorage.setItem('token', token)
            this.setState({
                    'token': token
                }, () => this.get_data())
        }).catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
                'token': ''
        }, () => this.get_data())
    }

    is_authenticated() {
        return !!this.state.token
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    get_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
                .then(response => {
                    const users = response.data
                        this.setState({
                                'users': users
                            })
                }).catch(error => {
                    console.log(error)
                    this.setState({
                            'users': []
                        })
                    })

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
                .then(response => {
                    const projects = response.data
                        this.setState({
                                'projects': projects
                            })
                }).catch(error => {
                    console.log(error)
                    this.setState({
                            'projects': []
                        })
                    })
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
                'token': token
            }, () => this.get_data())
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
                .then(response => {
                        this.setState({
                                'projects': this.state.projects.filter((project) => project.id !== id)
                            })
                }).catch(error => { console.log(error) })
    }

    render() {
        return (
            <BrowserRouter>
              <nav>
                <ul>
                  <li><Link to="/users">Users</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  <li>
                    { this.is_authenticated() ? <button onClick={() => this.logout()}>
                        Sign Out
                    </button> : <Link to="/login">Sign In</Link> }
                  </li>
                </ul>
              </nav>
              <Routes>
                <Route path="/users" element={<UserList users={this.state.users} />} />
                <Route path="/projects" element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
                <Route path="/login" element={<LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
