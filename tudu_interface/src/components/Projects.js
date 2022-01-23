const ProjectInfo = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{ project.title }</td>
            <td>{ project.link }</td>
            <td>{ JSON.stringify(project.users) }</td>
            <td>
                <button onClick={()=>deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
          <thead>
            <tr>
                <th>Title</th>
                <th>Link</th>
                <th>Users</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map( project =>
                <ProjectInfo
                project={project} key={project.id.toString()} deleteProject={deleteProject}
                />)}
          </tbody>
        </table>
    )
}

export default ProjectList;
