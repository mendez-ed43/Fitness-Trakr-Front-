import { Link, useHistory } from "react-router-dom";

const Navigation = ({token, setToken, loggedIn, setLoggedIn, setUsername}) => {
    const history = useHistory();

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
        setToken('');
        setLoggedIn(false)
        history.push('/login');
    }

    return <>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <h1 className='nav_title'>Fitness Tracker</h1>
            <ul id = 'links' class="nav nav-pills">
                <li class="nav-item">
                    <a class="nav-link" href="#" >< Link to = "/home" >Home | </Link></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"><Link to = "/routines">Routines | </Link></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"><Link to = "/activities">Activities |</Link></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"><Link to = "/account">My Account | </Link></a>
                </li>
                
                {
                    loggedIn ? 
                    <li class="nav-item">
                        <a class="nav-link" href="#"><Link to = "/user/routines">My Routines</Link></a>
                    </li> : null
                }
                {
                    loggedIn ? 
                    <button onClick = {(logOut)}>Logout</button> : 
                    <li class="nav-item">
                        <a class="nav-link" href="#"><Link to = '/login'>Login</Link></a>
                    </li>
                }
                
            </ul>
        </div>
    </nav>
</>
}
export default Navigation;