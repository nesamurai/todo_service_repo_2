import React from 'react';


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'title': '',
            'link': '',
            'users': []
        }
    }

    handleChange(e) {
        this.setState({
                [e.target.name]: e.target.value
            })
    }

    handleUsersChange(e) {
        if (!e.target.selectedOptions) {
            return;
        }
        let users = []
        for (let i = 0; i < e.target.selectedOptions.length; i++) {
            users.push(parseInt(e.target.selectedOptions.item(i).value))
        }
        this.setState({
            'users': users
        })
    }

    handleSubmit(e) {
        this.props.createProject(this.state.title, this.state.link, this.state.users)
        e.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input type="text" name="title" placeholder="title"
                value={this.state.title}
                onChange={(e) => this.handleChange(e)} />
                <input type="text" name="link" placeholder="link"
                value={this.state.link}
                onChange={(e) => this.handleChange(e)} />
                <select multiple name="user"
                onChange={(e) => this.handleUsersChange(e)}>
                  {this.props.users.map((user) => <option key={user.id.toString()} value={user.id}>
              {user.username}</option>)}
                </select>
                <input type="submit" value="save" />
            </form>
        );
    }
}
export default ProjectForm;
