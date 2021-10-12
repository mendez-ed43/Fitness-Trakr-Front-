import { Link, useHistory } from "react-router-dom";

const Navigation = ({}) => {
    const history = useHistory();

    // const logOut = () => {
    //     setUsername('');
    //     setToken('');
    //     history.push('/account/:method');
    // }

    return <>

    <nav>
        <div>
            <h1>Fitness Tracker</h1>
            <ul>
                <Link to = "/home">Home</Link>
                <Link to = "/routines">Routines</Link>
                <Link to = "/account">My Account</Link>
                {
                    token ? null : <Link to = "/account/login">Login</Link>
                }
                
                {
                    token ? null : <Link to = "/account/register">Register</Link>
                }
                
                {
                    token ? <button type = 'logout' onClick={logOut}>Logout</button> : null
                }
            </ul>
        </div>
    </nav>
</>
}
export default Navigation;