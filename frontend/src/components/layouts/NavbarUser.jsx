import React from 'react'
import { NavLink } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const NavbarUser = () => {

    const nav = useNavigate();
    const token = Cookie.get('token');
    const selectedCar = Cookie.get('selectedcar') && JSON.parse(Cookie.get('selectedcar'));

    const config = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

     const logoutHandler = () => {
        fetch('http://localhost:8000/api/logout', config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    Cookie.remove('token');
                    Cookie.remove('user');
                    Cookie.remove('selectedcar');
                    Cookie.remove('service');
                    nav('/login')
                } else {
                    res => res.json()
                }
            })
    } 

    const goToVehiclesPage = () => {
        nav('/vehicles')
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <button className="btn btn-sm btn-outline-danger me-5 my-2" to="/logout" onClick={logoutHandler}>Kilépés</button>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">Profilom</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Szolgáltatásaink
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/vehicles">Jáműveim</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/oilchange">Olajcsere</a></li>
                                    <li><a className="dropdown-item" href="/tirechange">Gumiszerviz</a></li>
                                    <li><a className="dropdown-item" href="/brakechange">Fékszerviz</a></li>
                                    <li><a className="dropdown-item" href="/airconditioner">Klímaszerviz</a></li>
                                    <li><a className="dropdown-item" href="/carwash">Autómosó</a></li>
                                </ul>
                            </li>
                            </ul>
                            {selectedCar && 
                                <button className='btn btn-warning mx-auto' onClick={goToVehiclesPage}>
                                    { selectedCar.plate_number+' '+selectedCar.brand+' '+selectedCar.type}
                                    </button>
                                }
                            {!selectedCar && <button className='btn btn-danger mx-auto' onClick={goToVehiclesPage}>Válassz járművet!</button>}
                        
                        <h2 className='gloock'>Car Lovers</h2>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default NavbarUser
