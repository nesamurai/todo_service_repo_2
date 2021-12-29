import axios from 'axios';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import UserList from './components/User'
import ProjectList from './components/Projects'
import NoPage from "./components/NoPage";

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            'users': [],
            'projects': []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
                .then(response => {
                    const users = response.data
                        this.setState({
                                'users': users
                            })
                }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
                .then(response => {
                    const projects = response.data
                        this.setState({
                                'projects': projects
                            })
                }).catch(error => console.log(error))
    }

    render() {
        return (
            <BrowserRouter>
              <nav>
                <ul>
                  <li><Link to="/users">Users</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                </ul>
              </nav>
              <Routes>
                <Route path="/users" element={<UserList users={this.state.users} />} />
                <Route path="/projects" element={<ProjectList projects={this.state.projects} />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
