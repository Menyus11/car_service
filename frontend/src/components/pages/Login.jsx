import React, { useEffect } from 'react'
import NavbarGuest from '../layouts/NavbarGuest'
import { useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [result, setResult] = useState('');

    const nav = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/login', config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    Cookie.set('token', res.token)
                    Cookie.set('user', JSON.stringify(res.user))

                    nav('/')
                } else {
                    setResult(res);
                }
            })
    }

    return (
        <div>
            <NavbarGuest />
            <div className="container">

                <form className='col-6 mx-auto' onSubmit={handleSubmit}>
                    <h1 className="h3 m-3 text-center">Bejelentkezés</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" onChange={handleChange} />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={handleChange} />
                        <label htmlFor="password">Jelszó</label>
                    </div>

                    <div>
                        <button className="btn btn-success my-4 form-control" type="submit">Sign in</button>
                    </div>

                    <div>{result.status === 'error' ? <div className="alert alert-danger text-center">{result.message}</div> : ''}</div>

                </form>

            </div>
        </div>
    )
}

export default Login
