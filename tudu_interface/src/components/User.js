const UserInfo = ({user}) => {
    return (
        <tr>
            <td>{ user.username }</td>
            <td>{ user.firstname }</td>
            <td>{ user.lastname }</td>
            <td>{ user.email }</td>
        </tr>
    );
}

const UserList = ({users}) => {
    return (
        <table>
          <thead>
            <tr>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map( user =>
                <UserInfo
                user={user} key={user.id.toString()} 
                />)}
          </tbody>
        </table>
    )
}

export default UserList;
