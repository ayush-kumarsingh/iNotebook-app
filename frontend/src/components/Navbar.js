import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { myAlert } from '../App';



export default function Navbar() {
    let navigate = useNavigate();
    const showalert = useContext(myAlert)
    const location = useLocation();
    
    function handleonlogout(){
        localStorage.removeItem('token');
        showalert('logged out successfully','success');
        navigate('/');
        console.log('logged out successfully');
    }
    return (

        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname == '/home') ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${(location.pathname == '/about') ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link className="btn btn-outline-light mx-2" to="/" >Login</Link>
                        <Link className="btn btn-outline-light mx-2" to="/signup">SignUp</Link>
                    </form> : <button className='btn btn-outline-light mx-2' onClick={handleonlogout}>LogOut</button>}
                </div>
            </div>
        </nav>

    )
}
