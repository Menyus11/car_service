import React from 'react'
import NavbarGuest from '../layouts/NavbarGuest'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMsg from '../layouts/ErrorMsg'

const Register = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
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
        fetch('http://localhost:8000/api/register', config)
            .then(res => res.json())
            .then(res => {
                setResult(res);
                if (res.status === 'success') {
                  setTimeout(() => {
                  nav('/login')
                  }, 2000);
                }
              })
    }

    return (
        <div>
            <NavbarGuest />
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='col-6 mx-auto p-3 m-4 border rounded'>

                        <div className='text-center'>
                            <h1>Regisztráció</h1>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Név</label>
                            <input type="name" className="form-control" id="name" name='name' aria-describedby="nameHelp" onChange={handleChange} />
                            <div id="nameHelp" className="form-text">A név 3-25 karakerből állhat!</div>
                            {<ErrorMsg result={result} field="name" />}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email cím</label>
                            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleChange} />
                            <div id="emailHelp" className="form-text">Az email-cím valós, működő kell, hogy legyen!</div>
                            {<ErrorMsg result={result} field="email" />}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Jelszó</label>
                            <input type="password" className="form-control" id="password" name='password' aria-describedby="passwordHelp" onChange={handleChange} />
                            <div id="passwordHelp" className="form-text">A jelszó 8-25 karakter lehet!</div>
                            {<ErrorMsg result={result} field="password" />}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_confirmation" className="form-label">Jelszó ismét</label>
                            <input type="password" className="form-control" id="password_confirmation" name='password_confirmation'
                                aria-describedby="password_confirmationHelp" onChange={handleChange} />
                            <div id="password_confirmationHelp" className="form-text">Pontosan egyező jelszót írjon!</div>
                        </div>

                        <button type="submit" className="btn btn-outline-success form-control">Regisztráció</button>

                        {result && result.status === 'success' && <div className="alert alert-success text-center my-3" role="alert">{result.message}</div>}
                    </div>

                </form>
            </div>
        </div>

    )
}

export default Register
