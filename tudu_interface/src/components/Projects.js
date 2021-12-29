const ProjectInfo = ({project}) => {
    return (
        <tr>
            <td>{ project.title }</td>
            <td>{ project.link }</td>
            <td>{ JSON.stringify(project.users) }</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
          <thead>
            <tr>
                <th>Title</th>
                <th>Link</th>
                <th>Users</th>
            </tr>
          </thead>
          <tbody>
            {projects.map( project =>
                <ProjectInfo
                project={project} key={project.id.toString()}
                />)}
          </tbody>
        </table>
    )
}

export default ProjectList;
