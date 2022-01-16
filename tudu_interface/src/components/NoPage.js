import { useLocation } from 'react-router-dom';

const NoPage = () => {
    let location = useLocation();
    return (
        <>
        <h1>404</h1>
        <h2>There is no page at '{location.pathname}'</h2>
        </>
    );
}

export default NoPage;
